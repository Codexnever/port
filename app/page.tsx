"use client"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Code, Sparkles, ArrowDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"

// Lazy load heavy components
const NetworkParticlesBackground = dynamic(() => import("@/components/network-particles-background").then(mod => ({ default: mod.NetworkParticlesBackground })), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
})

const RotatingQuotes = dynamic(() => import("@/components/rotating-quotes").then(mod => ({ default: mod.RotatingQuotes })), { ssr: false })
const RotatingGear = dynamic(() => import("@/components/rotating-gear").then(mod => ({ default: mod.RotatingGear })), { ssr: false })

// Lazy load sections for better code splitting
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => ({ default: mod.AboutSection })), { 
  ssr: true,
  loading: SectionLoader 
})

const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => ({ default: mod.ProjectsSection })), { 
  ssr: true,
  loading: SectionLoader 
})

const BlogSection = dynamic(() => import("@/components/sections/blog-section").then(mod => ({ default: mod.default })), { 
  ssr: false, 
  loading: SectionLoader 
})

const SoonSection = dynamic(() => import("@/components/sections/soon-section").then(mod => ({ default: mod.SoonSection })), { 
  ssr: true,
  loading: SectionLoader 
})

const JourneySection = dynamic(() => import("@/components/sections/journey-section").then(mod => ({ default: mod.JourneySection })), { 
  ssr: true,
  loading: SectionLoader 
})

const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => ({ default: mod.ContactSection })), { 
  ssr: true,
  loading: SectionLoader 
})

const FooterSection = dynamic(() => import("@/components/sections/footer-section").then(mod => ({ default: mod.FooterSection })), { 
  ssr: true,
  loading: SectionLoader 
})

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

// Optimized hero content component
const HeroContent = () => (
  <div className="relative z-20 container mx-auto px-4 text-center space-y-8">
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <Badge
        className="mb-4 bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40 border-indigo-700/50"
        variant="outline"
      >
        <Sparkles className="mr-1 h-3 w-3" /> Next-Gen Engineer
      </Badge>
    </motion.div>

    <div className="space-y-4">
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
      >
        Chaitanya Kulthe
      </motion.h1>

      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
        }}
      >
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">
          System Builder
        </span>
        <Suspense fallback={<div className="w-12 h-12" />}>
          <RotatingGear />
        </Suspense>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <Suspense fallback={<div className="text-xl text-gray-300 h-8">Building systems that matter...</div>}>
        <RotatingQuotes
          quotes={[
            "I don't follow trends. I follow pain points.",
            "In a world of keywords, I build for meaning.",
            "Ranking Lab isn't a project. It's a semantic microscope.",
            "I don't pitch products. I build the ones your infra wishes it had.",
            "Each log in my lab tells a story no analyst can see.",
            "I don't optimize for pageviews. I optimize for *precision*.",
            "This isn't a portfolio. It's a prelude to what you'll copy next.",
            "While others measure success in stars, I count drift in embeddings.",
          ]}
          interval={4000}
          className="text-xl text-gray-300"
        />
      </Suspense>
    </motion.div>

    <motion.div
      className="flex flex-wrap justify-center gap-4 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
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
      className="absolute top-50 left-1/2 transform -translate-x-1/2 animate-bounce"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <a href="#about" className="text-indigo-400 hover:text-indigo-300">
        <ArrowDown className="h-8 w-8" />
      </a>
    </motion.div>
  </div>
)

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Optimized Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />}>
            <NetworkParticlesBackground />
          </Suspense>
        </div>
        <HeroContent />
      </section>

      {/* Sections with Intersection Observer */}
      <SectionWrapper id="about">
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper id="projects">
        <ProjectsSection />
      </SectionWrapper>

      <SectionWrapper id="blog">
        <BlogSection />
      </SectionWrapper>

      <SectionWrapper id="soon">
        <SoonSection />
      </SectionWrapper>

      <SectionWrapper id="journey">
        <JourneySection />
      </SectionWrapper>

      <SectionWrapper id="contact">
        <ContactSection />
      </SectionWrapper>

      <SectionWrapper id="footer" minHeight="min-h-[20vh]">
        <FooterSection />
      </SectionWrapper>
    </main>
  )
}

// Intersection Observer wrapper for performance
const SectionWrapper = ({ 
  children, 
  id, 
  minHeight = "min-h-[60vh]" 
}: { 
  children: React.ReactNode
  id: string
  minHeight?: string 
}) => {
  return (
    <div id={id} className={minHeight}>
      <Suspense fallback={<SectionLoader />}>
        {children}
      </Suspense>
    </div>
  )
}
