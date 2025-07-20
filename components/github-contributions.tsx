"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Github } from "lucide-react"
import { motion } from "framer-motion"

interface GitHubContribution {
  date: string
  count: number
}

interface GitHubContributionsProps {
  username: string
}

export function GitHubContributions({ username }: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<GitHubContribution[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        // In a real app, you would use a server-side API route to fetch this data
        // For demo purposes, we'll simulate the data
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulated data
        const today = new Date()
        const simulatedData: GitHubContribution[] = []
        let total = 0

        for (let i = 0; i < 30; i++) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const count = Math.floor(Math.random() * 10)
          total += count
          simulatedData.push({
            date: date.toISOString().split("T")[0],
            count,
          })
        }

        setContributions(simulatedData.reverse())
        setTotalContributions(total)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch GitHub contributions")
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  if (error) {
    return (
      <Card className="bg-zinc-900/50 border-indigo-900/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-400">
            <Github className="h-5 w-5" />
            <p>Error loading GitHub contributions</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-zinc-900/50 border-indigo-900/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-indigo-400" />
              <h3 className="font-medium text-white font-mono">{username}'s GitHub Activity</h3>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <motion.span
                className="text-indigo-400 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                {totalContributions} contributions
              </motion.span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-30 gap-1 h-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <Skeleton key={i} className="h-full w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-30 gap-1 h-20">
              {contributions.map((day, index) => {
                const intensity = day.count === 0 ? 0 : Math.min(day.count / 5, 1)
                return (
                  <motion.div
                    key={day.date}
                    className="h-full w-full rounded-sm tooltip-trigger group"
                    style={{
                      backgroundColor: `rgba(99, 102, 241, ${intensity * 0.8})`,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.03 * index,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -mt-8 -ml-10 px-2 py-1 rounded bg-indigo-900 text-xs text-white whitespace-nowrap transition-opacity z-50">
                      {day.count} contributions on {new Date(day.date).toLocaleDateString()}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
