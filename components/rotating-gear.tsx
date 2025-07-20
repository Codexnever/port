"use client"

import { Settings } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

type Spark = {
  id: number
  x: number
  y: number
  size: number
  angle: number
}

export function RotatingGear() {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; size: number; angle: number }>>([])
  const nextId = useRef(0)

  useEffect(() => {
    // Create bursts of sparks at intervals
    const interval = setInterval(() => {
      createSparkBurst()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const createSparkBurst = () => {
    // Create a burst of 5-12 sparks
    const newSparks: Spark[] = []
    const sparkCount = Math.floor(Math.random() * 50) + 5

    for (let i = 0; i < sparkCount; i++) {
      // Create sparks in a cone shape (like welding sparks)
      // Angle between -30 and 30 degrees (in radians)
      const angle = (Math.random() * 60 - 30) * (Math.PI / 180)

      // Random distance
      const distance = 10 + Math.random() * 30

      // Calculate position
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      // Random size for variety
      const size = Math.random() * 3 + 1

      newSparks.push({
        id: nextId.current++,
        x,
        y,
        size,
        angle,
      })
    }

    setSparks((prev) => [...prev, ...newSparks])

    // Remove sparks after animation completes
    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => !newSparks.includes(spark)))
    }, 700)
  }

  return (
    <div className="relative inline-block ml-3">
      {/* Rotating gear */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="text-indigo-400"
      >
        <Settings className="h-8 w-8 md:h-10 md:w-10" />
      </motion.div>

      {/* Spark effects */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: spark.x,
            y: spark.y,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.2,
            ease: "easeOut",
          }}
          className="absolute top-1/2 left-1/2 z-10 rounded-full"
          style={{
            width: spark.size,
            height: spark.size,
            backgroundColor: Math.random() > 0.3 ? "#FFA500" : "#FFFFFF",
            boxShadow: `0 0 ${spark.size * 2}px ${spark.size}px rgba(255, 69, 0, 0.8)`,
            transform: `rotate(${spark.angle}rad)`,
          }}
        />
      ))}
    </div>
  )
}
