'use client'

// 性能监控工具类
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private measurements: Map<string, number> = new Map()
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 开始性能测量
  startMeasurement(name: string): void {
    if (typeof window === 'undefined') return
    
    const startTime = performance.now()
    this.measurements.set(name, startTime)
    
    // 使用Performance API标记
    if (performance.mark) {
      performance.mark(`${name}-start`)
    }
  }

  // 结束性能测量
  endMeasurement(name: string): number | null {
    if (typeof window === 'undefined') return null
    
    const startTime = this.measurements.get(name)
    if (!startTime) {
      console.warn(`No start measurement found for: ${name}`)
      return null
    }

    const endTime = performance.now()
    const duration = endTime - startTime
    
    // 使用Performance API标记和测量
    if (performance.mark && performance.measure) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
    }

    this.measurements.delete(name)
    
    // 记录性能数据
    this.logPerformance(name, duration)
    
    return duration
  }

  // 记录性能数据
  private logPerformance(name: string, duration: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Performance [${name}]: ${duration.toFixed(2)}ms`)
    }

    // 发送到分析服务（生产环境）
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // 可以发送到 Google Analytics, Mixpanel 等
      this.sendToAnalytics(name, duration)
    }
  }

  // 发送性能数据到分析服务
  private sendToAnalytics(name: string, duration: number): void {
    try {
      // 示例：发送到 Google Analytics
      if ('gtag' in window) {
        (window as any).gtag('event', 'timing_complete', {
          name: name,
          value: Math.round(duration),
          event_category: 'Performance',
        })
      }

      // 示例：发送到自定义分析端点
      if (duration > 1000) { // 只报告超过1秒的性能问题
        fetch('/api/analytics/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: name,
            duration: duration,
            url: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
          }),
        }).catch(error => {
          console.warn('Failed to send performance data:', error)
        })
      }
    } catch (error) {
      console.warn('Failed to send analytics:', error)
    }
  }

  // 监控Core Web Vitals
  observeCoreWebVitals(): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return

    // 监控LCP (Largest Contentful Paint)
    this.observeMetric('largest-contentful-paint', (entry: any) => {
      console.log('LCP:', entry.startTime)
      this.sendWebVital('LCP', entry.startTime)
    })

    // 监控FID (First Input Delay)
    this.observeMetric('first-input', (entry: any) => {
      const fid = entry.processingStart - entry.startTime
      console.log('FID:', fid)
      this.sendWebVital('FID', fid)
    })

    // 监控CLS (Cumulative Layout Shift)
    let clsValue = 0
    this.observeMetric('layout-shift', (entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })

    // 页面隐藏时报告CLS
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        console.log('CLS:', clsValue)
        this.sendWebVital('CLS', clsValue)
      }
    })
  }

  // 通用指标观察器
  private observeMetric(type: string, callback: (entry: any) => void): void {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback)
      })
      
      observer.observe({ entryTypes: [type] })
      this.observers.push(observer)
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error)
    }
  }

  // 发送Web Vitals数据
  private sendWebVital(name: string, value: number): void {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        non_interaction: true,
      })
    }
  }

  // 清理观察器
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.measurements.clear()
  }
}

// 性能测量装饰器
export function measurePerformance(name: string) {
  return function <T extends (...args: any[]) => any>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value!

    descriptor.value = (function (this: any, ...args: any[]) {
      const monitor = PerformanceMonitor.getInstance()
      const measurementName = `${name || `${target.constructor.name}.${propertyKey}`}`
      
      monitor.startMeasurement(measurementName)
      
      try {
        const result = originalMethod.apply(this, args)
        
        // 处理Promise
        if (result && typeof result.then === 'function') {
          return result.finally(() => {
            monitor.endMeasurement(measurementName)
          })
        }
        
        monitor.endMeasurement(measurementName)
        return result
      } catch (error) {
        monitor.endMeasurement(measurementName)
        throw error
      }
    } as any) as T
  }
}

// React组件性能监控Hook
export function usePerformanceMonitor(componentName: string) {
  const monitor = PerformanceMonitor.getInstance()

  return {
    startMeasurement: (name: string) => {
      monitor.startMeasurement(`${componentName}.${name}`)
    },
    endMeasurement: (name: string) => {
      return monitor.endMeasurement(`${componentName}.${name}`)
    },
  }
}

// 图片懒加载优化
export class ImageOptimizer {
  private static observer: IntersectionObserver | null = null
  private static images: Set<HTMLImageElement> = new Set()

  static init(): void {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return

    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              this.loadImage(img)
              this.observer!.unobserve(img)
              this.images.delete(img)
            }
          })
        },
        {
          rootMargin: '50px', // 在图片进入视口前50px开始加载
          threshold: 0.1,
        }
      )
    }
  }

  static observe(img: HTMLImageElement): void {
    if (!this.observer) this.init()
    
    if (this.observer && !this.images.has(img)) {
      this.observer.observe(img)
      this.images.add(img)
    }
  }

  static unobserve(img: HTMLImageElement): void {
    if (this.observer && this.images.has(img)) {
      this.observer.unobserve(img)
      this.images.delete(img)
    }
  }

  private static loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src
    if (src) {
      img.src = src
      img.removeAttribute('data-src')
      
      // 加载完成后移除loading类
      img.onload = () => {
        img.classList.remove('loading')
        img.classList.add('loaded')
      }
      
      img.onerror = () => {
        img.classList.remove('loading')
        img.classList.add('error')
      }
    }
  }

  static cleanup(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    this.images.clear()
  }
}

// 内存使用监控
export class MemoryMonitor {
  static logMemoryUsage(label: string = 'Memory Usage'): void {
    if (typeof window === 'undefined' || !('memory' in performance)) return

    const memory = (performance as any).memory
    const used = memory.usedJSHeapSize
    const total = memory.totalJSHeapSize
    const limit = memory.jsHeapSizeLimit

    console.log(`📊 ${label}:`, {
      used: `${Math.round(used / 1048576)} MB`,
      total: `${Math.round(total / 1048576)} MB`,
      limit: `${Math.round(limit / 1048576)} MB`,
      usage: `${Math.round((used / limit) * 100)}%`,
    })
  }

  static monitorMemoryLeaks(): void {
    if (typeof window === 'undefined') return

    let previousUsage = 0
    
    setInterval(() => {
      if ('memory' in performance) {
        const currentUsage = (performance as any).memory.usedJSHeapSize
        const diff = currentUsage - previousUsage
        
        if (diff > 5 * 1048576) { // 如果内存增长超过5MB
          console.warn('🚨 Potential memory leak detected:', {
            increase: `${Math.round(diff / 1048576)} MB`,
            current: `${Math.round(currentUsage / 1048576)} MB`,
          })
        }
        
        previousUsage = currentUsage
      }
    }, 30000) // 每30秒检查一次
  }
}

// 全局性能监控初始化
export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return

  const monitor = PerformanceMonitor.getInstance()
  
  // 监控Core Web Vitals
  monitor.observeCoreWebVitals()
  
  // 初始化图片优化器
  ImageOptimizer.init()
  
  // 开发环境下启用内存监控
  if (process.env.NODE_ENV === 'development') {
    MemoryMonitor.monitorMemoryLeaks()
  }
  
  // 页面卸载时清理
  window.addEventListener('beforeunload', () => {
    monitor.cleanup()
    ImageOptimizer.cleanup()
  })
}