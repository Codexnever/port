"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface GitHubContribution {
  date: string
  count: number
  color: string
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
        setError(null)

        const response = await fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch contributions')
        }

        const data = await response.json()

        // Flatten the weeks array to get all contribution days
        const allContributions: GitHubContribution[] = []
        
        data.contributionCalendar.weeks.forEach((week: any) => {
          week.contributionDays.forEach((day: any) => {
            allContributions.push({
              date: day.date,
              count: day.contributionCount,
              color: day.color
            })
          })
        })

        // Get the last 30 days for display
        const last30Days = allContributions.slice(-30)
        
        setContributions(last30Days)
        setTotalContributions(data.contributionCalendar.totalContributions)
        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching contributions:', err)
        setError(err.message || "Failed to fetch GitHub contributions")
        setLoading(false)
      }
    }

    if (username) {
      fetchContributions()
    }
  }, [username])

  const getContributionColor = (count: number) => {
    if (count === 0) return 'rgba(39, 39, 42, 0.8)' // zinc-800
    if (count <= 2) return 'rgba(99, 102, 241, 0.3)' // indigo-500 low
    if (count <= 5) return 'rgba(99, 102, 241, 0.5)' // indigo-500 medium
    if (count <= 10) return 'rgba(99, 102, 241, 0.7)' // indigo-500 high
    return 'rgba(99, 102, 241, 1)' // indigo-500 very high
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (error) {
    return (
      <Card className="bg-zinc-900/50 border-indigo-900/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-400">
            <Github className="h-5 w-5" />
            <p>Error: {error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 underline"
          >
            Try again
          </button>
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
              <h3 className="font-medium text-white font-mono">
                {username}'s GitHub Activity
              </h3>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-24 bg-zinc-800" />
            ) : (
              <motion.span
                className="text-indigo-400 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                {totalContributions} contributions this year
              </motion.span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-30 gap-1 h-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <Skeleton key={i} className="h-full w-full bg-zinc-800" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-30 gap-1 h-20 mb-4">
                {contributions.map((day, index) => (
                  <motion.div
                    key={day.date}
                    className="h-full w-full rounded-sm cursor-pointer group relative"
                    style={{
                      backgroundColor: getContributionColor(day.count),
                      border: '1px solid rgba(99, 102, 241, 0.2)'
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
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-zinc-800 border border-indigo-900/50 text-xs text-white whitespace-nowrap transition-opacity z-50 pointer-events-none">
                      <div className="font-medium">
                        {day.count} contribution{day.count !== 1 ? 's' : ''}
                      </div>
                      <div className="text-zinc-400">
                        {formatDate(day.date)}
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Last 30 days</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  {[0, 1, 3, 6, 10].map((count) => (
                    <div
                      key={count}
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: getContributionColor(count) }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
