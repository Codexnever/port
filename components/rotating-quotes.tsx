"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RotatingQuotesProps {
  quotes: string[]
  interval?: number
  className?: string
}

export function RotatingQuotes({ quotes, interval = 5000, className = "" }: RotatingQuotesProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Skip if there's only one quote
    if (quotes.length <= 1) return

    const intervalId = setInterval(() => {
      setIsVisible(false)

      // Wait for exit animation to complete before changing quote
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
        setIsVisible(true)
      }, 500)
    }, interval)

    return () => clearInterval(intervalId)
  }, [quotes, interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-300">{quotes[currentQuoteIndex]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
