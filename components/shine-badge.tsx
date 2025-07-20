"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ShineBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function ShineBadge({ children, className, variant = "secondary" }: ShineBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative inline-block overflow-hidden rounded-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Badge variant={variant} className={cn("relative z-10", className)}>
        {children}
      </Badge>
      {isHovered && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.29), transparent)",
            transform: "translateX(-100%)",
            animation: "shine 0.8s ease-in-out",
          }}
        />
      )}
    </div>
  )
}
