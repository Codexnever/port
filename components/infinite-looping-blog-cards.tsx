"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageSquare,
  Calendar,
  ExternalLink,
  Code,
  Zap,
  FileText,
} from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  description: string
  url: string
  publishedDate: string
  readingTime: string
  reactions: number
  comments: number
  tags: string[]
  size: "small" | "medium" | "large"
  category: "Web Dev" | "AI" | "Programming" | "Career" | "Tech News"
}

// Memoized components for performance
const CategoryIcon = ({ category }: { category: BlogPost["category"] }) => {
  const iconMap = {
    AI: <Zap className="h-3 w-3 mr-1" />,
    "Web Dev": <Code className="h-3 w-3 mr-1" />,
    Programming: <FileText className="h-3 w-3 mr-1" />,
    Career: null,
    "Tech News": null,
  }
  return iconMap[category] || null
}

const BlogCard = ({ post, index, hoveredCard, onHover }: {
  post: BlogPost
  index: number
  hoveredCard: string | null
  onHover: (id: string | null) => void
}) => {
  const cardId = `${post.id}-${index}`
  const isHovered = hoveredCard === cardId

  const getCategoryColor = useCallback((category: BlogPost["category"]) => {
    const colorMap = {
      AI: "bg-purple-900/50 text-purple-300 border-purple-700/50",
      "Web Dev": "bg-blue-900/50 text-blue-300 border-blue-700/50",
      Career: "bg-green-900/50 text-green-300 border-green-700/50",
      Programming: "bg-rose-900/50 text-rose-300 border-rose-700/50",
      "Tech News": "bg-amber-900/50 text-amber-300 border-amber-700/50",
    }
    return colorMap[category] || "bg-indigo-900/50 text-indigo-300 border-indigo-700/50"
  }, [])

  const getCardDimensions = useCallback((size: BlogPost["size"]) => {
    const dimensionMap = {
      small: { width: "w-[250px]", height: "h-[180px]" },
      medium: { width: "w-[320px]", height: "h-[220px]" },
      large: { width: "w-[380px]", height: "h-[260px]" },
    }
    return dimensionMap[size]
  }, [])

  const { width, height } = getCardDimensions(post.size)
  const visibleTags = post.size === "small" ? 1 : 2

  return (
    <div
      className={`flex-shrink-0 ${width} ${height}`}
      onMouseEnter={() => onHover(cardId)}
      onMouseLeave={() => onHover(null)}
    >
      <Card
        className={`h-full border-zinc-800 bg-zinc-900/50 overflow-hidden relative group transition-all duration-200 ${
          isHovered
            ? "border-indigo-700/50 bg-zinc-900/80 shadow-lg shadow-indigo-900/20"
            : ""
        }`}
      >
        {/* Simplified hover effect */}
        {isHovered && (
          <div className="absolute inset-0 border border-indigo-500/50 rounded-xl pointer-events-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 rounded-xl" />
          </div>
        )}

        <CardContent className="p-5 flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{post.publishedDate}</span>
            </div>
            <Badge className={`text-xs ${getCategoryColor(post.category)} flex items-center`}>
              <CategoryIcon category={post.category} />
              {post.category}
            </Badge>
          </div>

          <h4 className={`font-bold text-white mb-2 line-clamp-2 transition-colors duration-200 ${
            isHovered ? "text-indigo-300" : ""
          } ${post.size === "large" ? "text-lg" : "text-base"}`}>
            {post.title}
          </h4>

          {post.size !== "small" && (
            <p className="text-zinc-400 text-sm line-clamp-2 mb-2">{post.description}</p>
          )}

          <div className="flex flex-wrap gap-1 mt-auto mb-2">
            {post.tags.slice(0, visibleTags).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-transparent border-zinc-700 text-zinc-400">
                {tag}
              </Badge>
            ))}
            {post.tags.length > visibleTags && (
              <Badge variant="outline" className="text-xs bg-transparent border-zinc-700 text-zinc-400">
                +{post.tags.length - visibleTags}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-pink-500" />
                <span>{post.reactions}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{post.comments}</span>
              </div>
            </div>

            <Link
              href={post.url}
              target="_blank"
              className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group-hover:underline"
            >
              <span>Read</span>
              <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function InfiniteLoopingBlogCards() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Intersection Observer for performance
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Memoized sample data
  const samplePosts = useMemo(() => [
    {
      id: "1",
      title: "🚀 GitHub Copilot's Latest Update: Your AI Pair Programmer Just Got Smarter!",
      description: "Github new update Agent Mode that helps to build crazy Saas",
      url: "https://dev.to/chaitanya_kulthe_178bdb74/github-copilots-latest-update-your-ai-pair-programmer-just-got-smarter-1f59",
      publishedDate: "Feb 7, 2024",
      readingTime: "8 min read",
      reactions: 4,
      comments: 1,
      tags: ["Github", "Agent", "AI", "GitHub Copilot"],
      size: "large" as const,
      category: "Programming" as const,
    },
    {
      id: "2",
      title: "China's Manus Agent by Monica: What You Actually Need to Know",
      description: "Silicon Valley isn't the only player in AI anymore. China just dropped Manus Agent",
      url: "https://dev.to/chaitanya_kulthe_178bdb74/chinas-manuas-agent-by-monica-what-you-actually-need-to-kno-76l",
      publishedDate: "Mar 9, 2024",
      readingTime: "6 min read",
      reactions: 4,
      comments: 1,
      tags: ["Agent", "Manus", "AI"],
      size: "medium" as const,
      category: "Tech News" as const,
    },
    {
      id: "3",
      title: "What is WebRTC and How Does It Work?",
      description: "You know about this WebRTC feature...",
      url: "https://dev.to/chaitanya_kulthe_178bdb74/what-is-webrtc-and-how-does-it-work-98c",
      publishedDate: "Oct 9, 2024",
      readingTime: "7 min read",
      reactions: 2,
      comments: 0,
      tags: ["WebRTC", "Programming", "Tech", "Web Development"],
      size: "small" as const,
      category: "Programming" as const,
    },
    {
      id: "4",
      title: "India's Unemployable Engineers: When Degrees Teach 1990s Tech in a AI World",
      description: "Reality of indian education system",
      url: "https://dev.to/chaitanya_kulthe_178bdb74/indias-unemployable-engineers-when-degrees-teach-1990s-tech-in-a-ai-world-6gm",
      publishedDate: "Apr 18, 2025",
      readingTime: "9 min read",
      reactions: 7,
      comments: 0,
      tags: ["Reality", "Tech News", "Indian Education", "Engineers"],
      size: "medium" as const,
      category: "Tech News" as const,
    },
  ], [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(samplePosts)
      setIsLoading(false)
    }, 400) // Faster loading

    return () => clearTimeout(timer)
  }, [samplePosts])

  const handleHover = useCallback((id: string | null) => {
    setHoveredCard(id)
  }, [])

  const duplicatedPosts = useMemo(() => [...posts, ...posts], [posts])

  if (isLoading) {
    return (
      <div className="flex gap-6 py-4 animate-pulse">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="w-[300px] h-[220px] flex-shrink-0 rounded-xl bg-zinc-900/50" />
        ))}
      </div>
    )
  }

  return (
    <div className="relative space-y-8">
      {/* Minimal background effects - only when visible and not on mobile */}
      {isVisible && !shouldReduceMotion && typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 4 }, (_, i) => ( // Reduced from 20 to 4
            <div
              key={i}
              className="absolute rounded-full bg-indigo-500/5 animate-pulse"
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + (i % 2) * 40}%`,
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                filter: "blur(30px)",
                animationDelay: `${i * 2}s`,
                animationDuration: "8s",
              }}
            />
          ))}
        </div>
      )}

      {/* Optimized blog cards */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        <div
          ref={containerRef}
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6"
            initial={{ translateX: 0 }}
            animate={{
              translateX: shouldReduceMotion || !isVisible || isPaused
                ? 0
                : [0, -2400],
            }}
            transition={{
              translateX: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60, // Faster animation
                ease: "linear",
              },
            }}
          >
            {duplicatedPosts.map((post, i) => (
              <BlogCard
                key={`${post.id}-${i}`}
                post={post}
                index={i}
                hoveredCard={hoveredCard}
                onHover={handleHover}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="text-center mt-8" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3 }}
      >
        <Link
          href="https://dev.to/chaitanya_kulthe_178bdb74"
          target="_blank"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-700/50 hover:bg-indigo-900/50 transition-all duration-300 group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            View All Articles
            <ExternalLink className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </span>
        </Link>
      </motion.div>
    </div>
  )
}
