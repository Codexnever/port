"use client"

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react"
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

// --- Types ---
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

// --- Constants (outside component) ---
const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "🚀 GitHub Copilot’s Latest Update: Your AI Pair Programmer Just Got Smarter!",
    description: "GitHub’s new Agent Mode helps you build SaaS faster.",
    url: "https://dev.to/chaitanya_kulthe_178bdb74/github-copilots-latest-update-your-ai-pair-programmer-just-got-smarter-1f59",
    publishedDate: "Feb 7, 2024",
    readingTime: "8 min read",
    reactions: 4,
    comments: 1,
    tags: ["GitHub","Agent","AI","Copilot"],
    size: "large",
    category: "Programming",
  },
  {
    id: "2",
    title: "China’s Manus Agent by Monica: What You Actually Need to Know",
    description: "Silicon Valley isn’t the only player in AI anymore.",
    url: "https://dev.to/chaitanya_kulthe_178bdb74/chinas-manuas-agent-by-monica-what-you-actually-need-to-kno-76l",
    publishedDate: "Mar 9, 2024",
    readingTime: "6 min read",
    reactions: 4,
    comments: 1,
    tags: ["Agent","Manus","AI"],
    size: "medium",
    category: "Tech News",
  },
  {
    id: "3",
    title: "What is WebRTC and How Does It Work?",
    description: "An introduction to peer-to-peer video/audio in the browser.",
    url: "https://dev.to/chaitanya_kulthe_178bdb74/what-is-webrtc-and-how-does-it-work-98c",
    publishedDate: "Oct 9, 2024",
    readingTime: "7 min read",
    reactions: 2,
    comments: 0,
    tags: ["WebRTC","Web Dev","Programming"],
    size: "small",
    category: "Programming",
  },
  {
    id: "4",
    title: "India’s Unemployable Engineers: When Degrees Teach 1990s Tech in a AI World",
    description: "The reality of Indian engineering education.",
    url: "https://dev.to/chaitanya_kulthe_178bdb74/indias-unemployable-engineers-when-degrees-teach-1990s-tech-in-a-ai-world-6gm",
    publishedDate: "Apr 18, 2025",
    readingTime: "9 min read",
    reactions: 7,
    comments: 0,
    tags: ["Education","Tech News","India"],
    size: "medium",
    category: "Tech News",
  },
] as const

const CATEGORY_COLORS = {
  AI: "bg-purple-900/50 text-purple-300 border-purple-700/50",
  "Web Dev": "bg-blue-900/50 text-blue-300 border-blue-700/50",
  Career: "bg-green-900/50 text-green-300 border-green-700/50",
  Programming: "bg-rose-900/50 text-rose-300 border-rose-700/50",
  "Tech News": "bg-amber-900/50 text-amber-300 border-amber-700/50",
} as const

const CARD_DIMENSIONS = {
  small: { width: "w-[250px]", height: "h-[180px]" },
  medium:{ width: "w-[320px]", height: "h-[220px]" },
  large: { width: "w-[380px]", height: "h-[260px]" },
} as const

const ICON_MAP = {
  AI: <Zap className="h-3 w-3 mr-1"/>,
  "Web Dev": <Code className="h-3 w-3 mr-1"/>,
  Programming:<FileText className="h-3 w-3 mr-1"/>,
  Career: null,
  "Tech News": null,
} as const

// --- Memoized Icon ---
const CategoryIcon = memo(({ category }: { category: BlogPost["category"] }) => {
  return ICON_MAP[category]||null
})
CategoryIcon.displayName = "CategoryIcon"

// --- Single Card Component ---
const BlogCard = memo(({
  post, index, hoveredCard, onHover
}:{
  post: BlogPost
  index: number
  hoveredCard: string|null
  onHover: (id:string|null)=>void
}) => {
  const cardId = `${post.id}-${index}`
  const isHovered = hoveredCard===cardId

  const categoryColor = useMemo(
    () => CATEGORY_COLORS[post.category]||"",
    [post.category]
  )
  const { width, height } = useMemo(
    ()=>CARD_DIMENSIONS[post.size], [post.size]
  )
  const visibleTags = post.size==="small"?1:2

  const handleEnter = useCallback(()=>onHover(cardId),[cardId,onHover])
  const handleLeave = useCallback(()=>onHover(null),[onHover])
  const stopLink = useCallback((e:React.MouseEvent)=>e.stopPropagation(),[])

  return (
    <div
      className={`flex-shrink-0 ${width} ${height}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Card
        className={`h-full border-zinc-800 bg-zinc-900/50 relative group transition-all duration-200 ${
          isHovered?"border-indigo-700/50 bg-zinc-900/80 shadow-lg":""}`}
        style={{ willChange: isHovered?"transform":"auto" }}
      >
        {isHovered && (
          <div className="absolute inset-0 border border-indigo-500/50 rounded-xl pointer-events-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 rounded-xl opacity-80"/>
          </div>
        )}
        <CardContent className="p-5 flex flex-col h-full relative z-10">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3"/>
              {post.publishedDate}
            </span>
            <Badge className={`text-xs ${categoryColor} flex items-center`}>
              <CategoryIcon category={post.category}/>
              {post.category}
            </Badge>
          </div>
          <h4 className={`font-bold text-white mb-2 line-clamp-2 duration-200 ${
            isHovered?"text-indigo-300":""} ${post.size==="large"?"text-lg":"text-base"}`}>
            {post.title}
          </h4>
          {post.size!=="small" && (
            <p className="text-zinc-400 text-sm line-clamp-2 mb-2">
              {post.description}
            </p>
          )}
          <div className="flex flex-wrap gap-1 mt-auto mb-2">
            {post.tags.slice(0,visibleTags).map(t=>(
              <Badge key={t} variant="outline" className="text-xs bg-transparent border-zinc-700 text-zinc-400">
                {t}
              </Badge>
            ))}
            {post.tags.length>visibleTags && (
              <Badge variant="outline" className="text-xs bg-transparent border-zinc-700 text-zinc-400">
                +{post.tags.length-visibleTags}
              </Badge>
            )}
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <div className="flex gap-3">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-pink-500"/>
                {post.reactions}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3"/>
                {post.comments}
              </span>
            </div>
            <Link
              href={post.url}
              target="_blank"
              onClick={stopLink}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors group-hover:underline"
            >
              Read<ExternalLink className="h-3 w-3"/>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
BlogCard.displayName = "BlogCard"

// --- Main Section ---
export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [hoveredCard, setHoveredCard] = useState<string|null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // load sample posts
  useEffect(()=>{
    const t = setTimeout(() => {
      setPosts(SAMPLE_POSTS)
    }, 400)
    return ()=>clearTimeout(t)
  },[])

  // intersection observer
  useEffect(()=>{
    if(!container.current) return
    const obs = new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:0.1})
    obs.observe(container.current)
    return ()=>obs.disconnect()
  },[])

  const duplicated = useMemo(()=>[...posts,...posts],[posts])

  return (
    <div className="relative space-y-8">
      {/* minimal background blobs */}
      {visible && !prefersReduced && typeof window!=="undefined"&& window.innerWidth>=768 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({length:4}).map((_,i)=>(
            <div
              key={i}
              className="absolute rounded-full bg-indigo-500/5 animate-pulse"
              style={{
                left:`${20+i*20}%`,
                top:`${30+(i%2)*40}%`,
                width:`${80+i*30}px`,
                height:`${80+i*30}px`,
                filter:"blur(30px)",
                animationDelay:`${i*1.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* scrolling cards */}
      <div
        ref={container}
        onMouseEnter={()=>setIsPaused(true)}
        onMouseLeave={()=>setIsPaused(false)}
        className="relative overflow-hidden py-8"
      >
        {posts.length===0 ? (
          <div className="flex gap-6 py-4 animate-pulse">
            {Array.from({length:4}).map((_,i)=>(
              <div key={i} className="w-[300px] h-[220px] rounded-xl bg-zinc-900/50"/>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6"
            initial={{x:0}}
            animate={{
              x: prefersReduced||!visible||isPaused ? 0 : [0,-2400]
            }}
            transition={{
              x:{ repeat:Infinity, repeatType:"loop", duration:60, ease:"linear" }
            }}
            style={{ willChange:"transform" }}
          >
            {duplicated.map((p,i)=>(
              <BlogCard
                key={`${p.id}-${i}`}
                post={p}
                index={i}
                hoveredCard={hoveredCard}
                onHover={setHoveredCard}
              />
            ))}
          </motion.div>
        )}
      </div>

      <motion.div 
        className="text-center mt-8"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
      >
        <Link
          href="https://dev.to/chaitanya_kulthe_178bdb74"
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-700/50 hover:bg-indigo-900/50 transition"
        >
          View All Articles<ExternalLink className="h-4 w-4"/>
        </Link>
      </motion.div>
    </div>
  )
}
