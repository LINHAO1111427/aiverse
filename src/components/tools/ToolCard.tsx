"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, ExternalLink } from "lucide-react"
import type { Tool } from "@/types"
import { formatCurrency } from "@/lib/utils"
import { CompareButton } from "./CompareButton"

interface ToolCardProps {
  tool: Tool
  variant?: "grid" | "list"
}

export function ToolCard({ tool, variant = "grid" }: ToolCardProps) {
  const isGrid = variant === "grid"

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden group ${
        isGrid ? "" : "flex"
      }`}
    >
      {/* Logo/Image section */}
      <div className={`${isGrid ? "p-6 pb-4" : "p-6 flex-shrink-0"}`}>
        <div className={`${isGrid ? "mb-4" : ""}`}>
          {tool.logoUrl ? (
            <div className={`relative ${isGrid ? "w-16 h-16" : "w-20 h-20"} bg-gray-100 rounded-lg overflow-hidden`}>
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div className={`${isGrid ? "w-16 h-16" : "w-20 h-20"} bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-2xl">
                {tool.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {isGrid && (
          <>
            <Link href={`/tools/${tool.slug}`}>
              <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition">
                {tool.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-2">{tool.companyName}</p>
          </>
        )}
      </div>

      {/* Content section */}
      <div className={`${isGrid ? "px-6 pb-6" : "flex-1 p-6"}`}>
        {!isGrid && (
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link href={`/tools/${tool.slug}`}>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
                  {tool.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500">{tool.companyName}</p>
            </div>
            <PricingBadge tool={tool} />
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.tagline}
        </p>

        {/* Features */}
        {tool.features && tool.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tool.features.slice(0, isGrid ? 3 : 4).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {tool.features.length > (isGrid ? 3 : 4) && (
                <span className="text-xs text-gray-500">
                  +{tool.features.length - (isGrid ? 3 : 4)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.5</span>
              <span className="text-sm text-gray-500">(234)</span>
            </div>
            
            {isGrid && <PricingBadge tool={tool} />}
          </div>
          
          <CompareButton tool={tool} />
        </div>
      </div>
    </div>
  )
}

function PricingBadge({ tool }: { tool: Tool }) {
  const getPricingLabel = () => {
    switch (tool.pricingType) {
      case "free":
        return { text: "Free", className: "bg-green-100 text-green-700" }
      case "freemium":
        return { 
          text: tool.startingPrice ? `From ${formatCurrency(tool.startingPrice)}/mo` : "Freemium",
          className: "bg-blue-100 text-blue-700" 
        }
      case "paid":
        return { 
          text: tool.startingPrice ? `${formatCurrency(tool.startingPrice)}/mo` : "Paid",
          className: "bg-purple-100 text-purple-700" 
        }
      case "custom":
        return { text: "Custom", className: "bg-gray-100 text-gray-700" }
      default:
        return { text: "Unknown", className: "bg-gray-100 text-gray-700" }
    }
  }

  const pricing = getPricingLabel()

  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${pricing.className}`}>
      {pricing.text}
    </span>
  )
}