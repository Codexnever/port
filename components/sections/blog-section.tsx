"use client"
import { motion } from "framer-motion"
import { Newspaper } from "lucide-react"
import { Suspense, lazy } from "react"

const InfiniteLoopingBlogCards = lazy(() =>
  import("@/components/infinite-looping-blog-cards").then((mod) => ({ default: mod.InfiniteLoopingBlogCards })),
)

export function BlogSection() {
  return (

    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-2 rounded-full bg-indigo-900/30 mb-4"
          >
            <Newspaper className="h-6 w-6 text-indigo-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span>My Blog Articles</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I share my knowledge and thoughts about Software Development, AI, and Technology through Blogs
          </p>
        </motion.div>
        <Suspense fallback={
          <div className="space-y-8">
            <div className="relative overflow-hidden py-8">
              <div className="flex gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[300px] h-[220px] flex-shrink-0 rounded-xl bg-zinc-900/50 animate-pulse shimmer"
                  />
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden py-8">
              <div className="flex gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[300px] h-[220px] flex-shrink-0 rounded-xl bg-zinc-900/50 animate-pulse shimmer"
                  />
                ))}
              </div>
            </div>
          </div>
        }>
          <InfiniteLoopingBlogCards />
        </Suspense>
      </div>
    </section>
  )
}
