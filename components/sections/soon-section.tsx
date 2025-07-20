"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap } from "lucide-react"

export function SoonSection() {
  return (
    <section id="soon" className="py-24 relative overflow-hidden">
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
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span>The Future's Already In Motion</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The next wave isn't coming—it's already here, reshaping the digital landscape with every line of code.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Future project teasers */}
          <div className="rounded-xl border border-indigo-900/50 bg-zinc-900/80 backdrop-blur-sm overflow-hidden group relative h-full p-6 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center justify-center p-2 rounded-full bg-indigo-900/30">
                <Sparkles className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Edge Collab</h3>
              <p className="text-gray-400 mb-4">
                Edge collaboration platform that leverages Web Transport and CRDTs for real-time, distributed editing of documents and media, enabling seamless teamwork across the globe.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">Web Transport Protocol</Badge>
                <Badge className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">CRDTs</Badge>
                <Badge className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">Next.js</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-900/50 bg-zinc-900/80 backdrop-blur-sm overflow-hidden group relative h-full p-6 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center justify-center p-2 rounded-full bg-indigo-900/30">
                <Zap className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Auto Highlight Reel Generator
              </h3>
              <p className="text-gray-400 mb-4">
                An AI-powered tool that automatically generates highlight reels from long videos, using advanced video analysis and machine learning to identify key moments and create engaging summaries.
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">Next.js</Badge>
                <Badge className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">OpenAI API</Badge>
                <Badge className="bg-indigo-950/50 text-indigo-200 border-indigo-700/50">AWS S3</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-12 opacity-30 text-sm text-indigo-400 font-mono">
          <p>The AI is just the beginning. The revolution is next.</p>
        </div>
      </div>
    </section>
  )
}
