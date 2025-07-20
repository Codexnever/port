"use client"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Code, Sparkles, ArrowDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { NetworkParticlesBackground } from "@/components/network-particles-background"
import { RotatingQuotes } from "@/components/rotating-quotes"
import { RotatingGear } from "@/components/rotating-gear"

// Remove lazy loading for all except BlogSection
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
const BlogSection = dynamic(() => import("@/components/sections/blog-section").then(mod => mod.BlogSection), { ssr: false, loading: SectionLoader })
import { SoonSection } from "@/components/sections/soon-section"
import { JourneySection } from "@/components/sections/journey-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

function SectionLoader() {
  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        <p className="text-indigo-400 text-sm">Loading amazing content...</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section (inline, not lazy loaded) */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NetworkParticlesBackground />
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge
              className="mb-4 bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 border-indigo-700/50"
              variant="outline"
            >
              <Sparkles className="mr-1 h-3 w-3" /> Next-Gen Engineer
            </Badge>
          </motion.div>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight relative z-10">
                Chaitanya Kulthe
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              className="flex items-center justify-center"
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">
                System Builder
              </span>
              <RotatingGear />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <RotatingQuotes
              quotes={[
                "I don’t follow trends. I follow pain points.",
                "In a world of keywords, I build for meaning.",
                "Ranking Lab isn’t a project. It’s a semantic microscope.",
                "I don’t pitch products. I build the ones your infra wishes it had.",
                "Each log in my lab tells a story no analyst can see.",
                "I don’t optimize for pageviews. I optimize for *precision*.",
                "This isn’t a portfolio. It’s a prelude to what you’ll copy next.",
                "While others measure success in stars, I count drift in embeddings.",
              ]}
              interval={4000}
              className="text-xl text-gray-300"
            />
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 group">
              <a href="#projects">
                View My Work <Code className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/30 group"
            >
              <a href="#contact">
                Contact Me <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <a href="#about" className="text-indigo-400 hover:text-indigo-300">
              <ArrowDown className="h-8 w-8" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <div className="min-h-[60vh]">
        <AboutSection />
      </div>
      {/* Projects Section */}
      <div className="min-h-[60vh]">
        <ProjectsSection />
      </div>
      {/* Blog Section */}
      <div className="min-h-[60vh]">
        <BlogSection />
      </div>
      {/* Soon Section */}
      <div className="min-h-[60vh]">
        <SoonSection />
      </div>
      {/* Journey Section */}
      <div className="min-h-[60vh]">
        <JourneySection />
      </div>
      {/* Contact Section */}
      <div className="min-h-[60vh]">
        <ContactSection />
      </div>
      {/* Footer Section */}
      <div className="min-h-[20vh]">
        <FooterSection />
      </div>
    </main>
  )
}
