"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, ExternalLink, Bug, Zap } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  funnyBug?: string
  coolFeature?: string
}

export function AdvancedProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  funnyBug = "It works on my machine ¯\\_(ツ)_/¯",
  coolFeature = "It actually works. Sometimes.",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 })

  // Mouse position within card
  const relativeX = useMotionValue(0.5)
  const relativeY = useMotionValue(0.5)

  // Smooth spring physics for mouse movement
  const smoothX = useSpring(relativeX, { damping: 50, stiffness: 400 })
  const smoothY = useSpring(relativeY, { damping: 50, stiffness: 400 })

  // Transform values for parallax effect
  const rotateX = useTransform(smoothY, [0, 1], [5, -5])
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5])
  const translateX = useTransform(smoothX, [0, 1], [-10, 10])
  const translateY = useTransform(smoothY, [0, 1], [-10, 10])
  const glowX = useTransform(smoothX, [0, 1], [0, 100])
  const glowY = useTransform(smoothY, [0, 1], [0, 100])

  useEffect(() => {
    if (!cardRef.current) return

    const updateCardDimensions = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setCardDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        })
      }
    }

    updateCardDimensions()
    window.addEventListener("resize", updateCardDimensions)
    window.addEventListener("scroll", updateCardDimensions)

    return () => {
      window.removeEventListener("resize", updateCardDimensions)
      window.removeEventListener("scroll", updateCardDimensions)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = cardDimensions

    const x = (clientX - left) / width
    const y = (clientY - top) / height

    setMousePosition({ x: clientX - left, y: clientY - top })
    relativeX.set(x)
    relativeY.set(y)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(99, 102, 241, 0.3), transparent 50%)`
            : "none",
        }}
      />

{/* This is Background beam  when we hover that background Card DOT */}   
   {isHovered && (
        <motion.div
          className="absolute w-40 h-40 pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle, rgba(171, 81, 245, 0.39), transparent 70%)",
            left: mousePosition.x - 80,
            top: mousePosition.y - 80,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <motion.div
        className="relative z-20"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <Card className="overflow-hidden border-zinc-800 bg-zinc-900/80 backdrop-blur-sm h-full">
              <div className="relative aspect-[4/3] sm:aspect-[4/3] md:aspect-[5/2] w-full overflow-hidden">
            <motion.div
              style={{
                x: translateX,
                y: translateY,
              }}
            >
              <Image
                src={image || "/placeholder.svg?height=300&width=500"}
                alt={title}
                fill
                className="object-cover w-full h-full rounded-lg mb-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                priority={false}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>

          <div className="p-6 space-y-4">
            <motion.h3 className="text-xl font-bold text-white" style={{ translateZ: 50 }}>
              {title}
            </motion.h3>

            <motion.p className="text-zinc-400 text-sm" style={{ translateZ: 30 }}>
              {description}
            </motion.p>

            <motion.div className="flex flex-wrap gap-2" style={{ translateZ: 40 }}>
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">
                  {tag}
                </Badge>
              ))}
            </motion.div>

            {/* Funny bugs and features section */}
            <motion.div
              className="pt-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ translateZ: 45 }}
            >
              <div className="flex items-center gap-2 text-xs text-red-400">
                <Bug className="h-3 w-3" />
                <span>{funnyBug}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400">
                <Zap className="h-3 w-3" />
                <span>{coolFeature}</span>
              </div>
            </motion.div>

            <motion.div className="flex gap-3 pt-2" style={{ translateZ: 50 }}>
              {githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-zinc-800/50 text-zinc-200 border-zinc-700/50 hover:bg-zinc-700/50"
                  asChild
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              {liveUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-indigo-950/50 text-indigo-200 border-indigo-700/50 hover:bg-indigo-900/50"
                  asChild
                >
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
