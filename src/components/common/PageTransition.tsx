'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  mode?: 'slide' | 'fade' | 'scale' | 'slideUp'
  duration?: number
}

// 页面过渡动画变体
const pageVariants: Record<string, Variants> = {
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 }
  },
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  }
}

export function PageTransition({
  children,
  className = '',
  mode = 'fade',
  duration = 0.3
}: PageTransitionProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants[mode]}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1], // 自定义贝塞尔曲线，更流畅的动画
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// 组件级过渡动画
interface ComponentTransitionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
}

export function ComponentTransition({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  once = true
}: ComponentTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  const directionVariants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 }
  }

  return (
    <motion.div
      initial={directionVariants[direction]}
      animate={isVisible ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={() => !once && setIsVisible(false)}
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 淡入淡出过渡
export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 缩放过渡
export function ScaleIn({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  scale = 0.9
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  scale?: number
}) {
  return (
    <motion.div
      initial={{ scale, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 滑入过渡
export function SlideIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'left'
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'left' | 'right' | 'up' | 'down'
}) {
  const slideVariants = {
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    up: { y: -50, opacity: 0 },
    down: { y: 50, opacity: 0 }
  }

  return (
    <motion.div
      initial={slideVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 交错动画容器
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 交错动画子项
export function StaggerItem({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: 'easeOut'
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 视差滚动效果
export function ParallaxSection({
  children,
  className = '',
  speed = 0.5
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}
      style={{
        transform: `translateY(calc(var(--scroll-progress) * ${speed * 100}px))`
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}