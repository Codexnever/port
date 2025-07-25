"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  backgroundClassName?: string
}

export function ParallaxCard({ children, className, backgroundClassName }: ParallaxCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation based on mouse position relative to card center
    const rotateYValue = ((mouseX - cardCenterX) / (rect.width / 2)) * 5
    const rotateXValue = ((cardCenterY - mouseY) / (rect.height / 2)) * 5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl transition-all duration-200", className)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
<div
  className={cn(
    "absolute inset-0 z-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 " +
    "opacity-0 transition-opacity duration-300 group-hover:opacity-100 " +
    "mix-blend-multiply pointer-events-none",
    backgroundClassName
  )}
/>
<div className="relative z-10">
  {children}
</div>
    </motion.div>
  )
}
