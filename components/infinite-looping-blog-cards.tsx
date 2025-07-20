"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion"
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

export function InfiniteLoopingBlogCards() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  useEffect(() => {
    const samplePosts: BlogPost[] = [
      {
        id: "1",
        title: "🚀 GitHub Copilot’s Latest Update: Your AI Pair Programmer Just Got Smarter!",
        description: "Github new update Agent Mode that helps to build crazy Saas",
        url: "https://dev.to/chaitanya_kulthe_178bdb74/github-copilots-latest-update-your-ai-pair-programmer-just-got-smarter-1f59",
        publishedDate: "Feb 7, 2024",
        readingTime: "8 min read",
        reactions: 4,
        comments: 1,
        tags: ["Github", "Agent", "AI", "GitHub Copilot"],
        size: "large",
        category: "Programming",
      },
      {
        id: "2",
        title: "China’s Manus Agent by Monica: What You Actually Need to Know",
        description: "Silicon Valley isn’t the only player in AI anymore. China just dropped Manus Agent",
        url: "https://dev.to/chaitanya_kulthe_178bdb74/chinas-manuas-agent-by-monica-what-you-actually-need-to-kno-76l",
        publishedDate: "Mar 9 , 2024",
        readingTime: "6 min read",
        reactions: 4,
        comments: 1,
        tags: ["Agent", "Manus", "AI"],
        size: "medium",
        category: "Tech News",
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
        size: "small",
        category: "Programming",
      },
      {
        id: "4",
        title: "India’s Unemployable Engineers: When Degrees Teach 1990s Tech in a AI World",
        description: "Reality of indian education system",
        url: "https://dev.to/chaitanya_kulthe_178bdb74/indias-unemployable-engineers-when-degrees-teach-1990s-tech-in-a-ai-world-6gm",
        publishedDate: "Apr 18, 2025",
        readingTime: "9 min read",
        reactions: 7,
        comments: 0,
        tags: ["Reality", "Tech News", "Indian Education", "Engineers"],
        size: "medium",
        category: "Tech News",
      },
    ]

    setTimeout(() => {
      setPosts(samplePosts)
      setIsLoading(false)
    }, 800)
  }, [])

  const getCategoryColor = (category: BlogPost["category"]) => {
    const map = {
      AI: "bg-purple-900/50 text-purple-300 border-purple-700/50",
      "Web Dev": "bg-blue-900/50 text-blue-300 border-blue-700/50",
      Career: "bg-green-900/50 text-green-300 border-green-700/50",
      Programming: "bg-rose-900/50 text-rose-300 border-rose-700/50",
      "Tech News": "bg-amber-900/50 text-amber-300 border-amber-700/50",
    }
    return map[category] || "bg-indigo-900/50 text-indigo-300 border-indigo-700/50"
  }

  const getCategoryIcon = (category: BlogPost["category"]) => {
    switch (category) {
      case "AI":
        return <Zap className="h-3 w-3 mr-1" />;
      case "Web Dev":
        return <Code className="h-3 w-3 mr-1" />;
      case "Programming":
        return <FileText className="h-3 w-3 mr-1" />;
      case "Career":
        return null;
      case "Tech News":
        return null;
      default:
        return null;
    }
  }

  const getCardWidth = (size: BlogPost["size"]) =>
    size === "small" ? "w-[250px]" : size === "medium" ? "w-[320px]" : "w-[380px]"

  const getCardHeight = (size: BlogPost["size"]) =>
    size === "small" ? "h-[180px]" : size === "medium" ? "h-[220px]" : "h-[260px]"

  const allPosts = [...posts, ...posts] // Only 2x to reduce load

  const handleHover = useCallback((id: string | null) => {
    setHoveredCard(id)
  }, [])

  return (
    <div className="relative space-y-8">
      {/* Blobs - disabled on mobile */}
      {!isMobile && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-500/10"
              initial={{
                x: `${Math.random() * 100 - 50}%`,
                y: `${Math.random() * 100 - 50}%`,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                x: [`${Math.random() * 100 - 50}%`, `${Math.random() * 100 - 50}%`],
                y: [`${Math.random() * 100 - 50}%`, `${Math.random() * 100 - 50}%`],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                filter: "blur(40px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Blog cards */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        <div
          ref={containerRef}
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {isLoading ? (
            <div className="flex gap-6 py-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[300px] h-[220px] flex-shrink-0 rounded-xl bg-zinc-900/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              className="flex gap-6"
              initial={{ translateX: 0 }}
              animate={{
                translateX: shouldReduceMotion
                  ? 0
                  : isPaused
                  ? 0
                  : [0, isMobile ? -1200 : -2400],
              }}
              transition={{
                translateX: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: isMobile ? 60 : 80,
                  ease: "linear",
                },
              }}
            >
              {allPosts.map((post, i) => (
                <div
                  key={`${post.id}-${i}`}
                  className={`flex-shrink-0 ${getCardWidth(post.size)} ${getCardHeight(post.size)}`}
                  onMouseEnter={() => handleHover(post.id + i)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <Card
                    className={`h-full border-zinc-800 bg-zinc-900/50 overflow-hidden relative group ${
                      hoveredCard === post.id + i
                        ? "border-indigo-700/50 bg-zinc-900/80 shadow-lg shadow-indigo-900/20 will-change-transform"
                        : ""
                    }`}
                  >
                    {/* Shiny hover effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 border border-indigo-500/50 rounded-xl"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 rounded-xl shine-effect"></div>
                    </div>

                    <CardContent className="p-5 flex flex-col h-full relative z-10">
                      <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.publishedDate}</span>
                        </div>
                        <Badge className={`text-xs ${getCategoryColor(post.category)} flex items-center`}>
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </Badge>
                      </div>

                      <h4 className={`font-bold text-white mb-2 line-clamp-2 transition-colors ${
                        hoveredCard === post.id + i ? "text-indigo-300" : ""
                      } ${post.size === "large" ? "text-lg" : "text-base"}`}>
                        {post.title}
                      </h4>

                      {post.size !== "small" && (
                        <p className="text-zinc-400 text-sm line-clamp-2 mb-2">{post.description}</p>
                      )}

                      <div className="flex flex-wrap gap-1 mt-auto mb-2">
                        {post.tags.slice(0, post.size === "small" ? 1 : 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs bg-transparent border-zinc-700 text-zinc-400">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > (post.size === "small" ? 1 : 2) && (
                          <Badge variant="outline" className="text-xs bg-transparent border-zinc-700 text-zinc-400">
                            +{post.tags.length - (post.size === "small" ? 1 : 2)}
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
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Link
          href="https://dev.to/chaitanya_kulthe_178bdb74"
          target="_blank"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-700/50 hover:bg-indigo-900/50 transition-all duration-300 group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            View All Articles
            <ExternalLink className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-900/0 via-indigo-900/70 to-indigo-900/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </Link>
      </motion.div>
    </div>
  )
}
