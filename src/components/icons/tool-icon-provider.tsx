'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ToolIcon, DefaultToolIcon } from './tool-icons'

interface ToolIconProviderProps {
  logoUrl?: string | null
  name: string
  category?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallbackClassName?: string
  showFallback?: boolean
}

const sizeMap = {
  sm: { container: 'w-8 h-8', image: 32, icon: 'sm' as const },
  md: { container: 'w-10 h-10', image: 40, icon: 'md' as const },
  lg: { container: 'w-12 h-12', image: 48, icon: 'lg' as const },
  xl: { container: 'w-16 h-16', image: 64, icon: 'xl' as const }
}

export function ToolIconProvider({
  logoUrl,
  name,
  category,
  size = 'md',
  className,
  fallbackClassName,
  showFallback = true
}: ToolIconProviderProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Start with false to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false)
  const sizeConfig = sizeMap[size]

  useEffect(() => {
    setIsMounted(true)
    setImageError(false)
    setIsLoading(!!logoUrl)
  }, [logoUrl])

  // If no logo URL or image failed to load, show icon
  if (!logoUrl || imageError) {
    if (!showFallback) return null
    
    return (
      <div 
        className={cn(
          sizeConfig.container,
          'relative flex items-center justify-center rounded-lg overflow-hidden',
          'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
          className
        )}
      >
        <ToolIcon 
          name={name} 
          category={category} 
          size={sizeConfig.icon}
          className={cn('text-gray-600 dark:text-gray-400', fallbackClassName)}
        />
      </div>
    )
  }

  // Show image with loading state (only show loading state after mount)
  const showLoading = isMounted && isLoading
  return (
    <div 
      className={cn(
        sizeConfig.container,
        'relative flex items-center justify-center rounded-lg overflow-hidden',
        showLoading && 'bg-gray-100 dark:bg-gray-800 animate-pulse',
        className
      )}
    >
      <Image
        src={logoUrl}
        alt={name}
        width={sizeConfig.image}
        height={sizeConfig.image}
        className="object-contain p-1"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

// Tool avatar component for smaller, circular icons
interface ToolAvatarProps extends ToolIconProviderProps {
  showInitial?: boolean
}

export function ToolAvatar({
  logoUrl,
  name,
  category,
  size = 'md',
  className,
  fallbackClassName,
  showFallback = true,
  showInitial = true
}: ToolAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const sizeConfig = sizeMap[size]

  // If no logo URL or image failed to load
  if (!logoUrl || imageError) {
    if (!showFallback) return null
    
    // Show initial letter if preferred
    if (showInitial && !category) {
      const initial = name.charAt(0).toUpperCase()
      const colorHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const hue = colorHash % 360
      
      return (
        <div 
          className={cn(
            sizeConfig.container,
            'relative flex items-center justify-center rounded-full font-bold text-white',
            className
          )}
          style={{
            background: `linear-gradient(135deg, hsl(${hue}, 60%, 50%), hsl(${hue + 30}, 60%, 60%))`
          }}
        >
          <span className={cn(
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base',
            size === 'xl' && 'text-lg'
          )}>
            {initial}
          </span>
        </div>
      )
    }
    
    // Show icon
    return (
      <div 
        className={cn(
          sizeConfig.container,
          'relative flex items-center justify-center rounded-full overflow-hidden',
          'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
          className
        )}
      >
        <ToolIcon 
          name={name} 
          category={category} 
          size={sizeConfig.icon}
          className={cn('text-gray-600 dark:text-gray-400', fallbackClassName)}
        />
      </div>
    )
  }

  // Show image
  return (
    <div 
      className={cn(
        sizeConfig.container,
        'relative flex items-center justify-center rounded-full overflow-hidden bg-white dark:bg-gray-900',
        className
      )}
    >
      <Image
        src={logoUrl}
        alt={name}
        width={sizeConfig.image}
        height={sizeConfig.image}
        className="object-contain p-1"
        onError={() => setImageError(true)}
      />
    </div>
  )
}

// Icon grid for displaying multiple tool icons
interface ToolIconGridProps {
  tools: Array<{
    id: number | string
    name: string
    logoUrl?: string | null
    category?: string
  }>
  maxDisplay?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showMore?: boolean
}

export function ToolIconGrid({
  tools,
  maxDisplay = 5,
  size = 'sm',
  className,
  showMore = true
}: ToolIconGridProps) {
  const displayTools = tools.slice(0, maxDisplay)
  const remainingCount = tools.length - maxDisplay
  const overlapClass = size === 'sm' ? '-ml-2' : size === 'md' ? '-ml-3' : '-ml-4'

  return (
    <div className={cn('flex items-center', className)}>
      {displayTools.map((tool, index) => (
        <div
          key={tool.id}
          className={cn(
            'relative',
            index > 0 && overlapClass,
            'ring-2 ring-white dark:ring-gray-900 rounded-full'
          )}
          style={{ zIndex: displayTools.length - index }}
        >
          <ToolAvatar
            logoUrl={tool.logoUrl}
            name={tool.name}
            category={tool.category}
            size={size}
          />
        </div>
      ))}
      {showMore && remainingCount > 0 && (
        <div
          className={cn(
            sizeMap[size].container,
            'relative flex items-center justify-center rounded-full',
            'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
            'font-medium',
            overlapClass,
            'ring-2 ring-white dark:ring-gray-900'
          )}
        >
          <span className={cn(
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base'
          )}>
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
}