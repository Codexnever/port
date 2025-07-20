import { ParallaxCard } from "@/components/parallax-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-24">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">My Projects</h1>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <ParallaxCard className="group h-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900">
              <div className="flex h-full flex-col">
                <h3 className="text-2xl font-bold">No-Code AI Workflow Builder</h3>
                <p className="mt-2 text-zinc-400">
                  Built using Next.js, Node.js, Appwrite, and OpenAI API, allowing users to create AI-powered workflows
                  with a drag-and-drop interface. Designed a smooth, intuitive UI with React Flow and integrated
                  real-time workflow saving. Currently enhancing AI execution and user experience to make it
                  developer-friendly and scalable.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Appwrite</Badge>
                  <Badge variant="outline">OpenAI API</Badge>
                  <Badge variant="outline">React Flow</Badge>
                </div>
                <div className="mt-auto flex gap-4 pt-6">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </ParallaxCard>

            <ParallaxCard className="group h-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900">
              <div className="flex h-full flex-col">
                <h3 className="text-2xl font-bold">Instahyre Clone – AI-Powered Job Matching Platform</h3>
                <p className="mt-2 text-zinc-400">
                  Developed an Instahyre-inspired job portal using React, Node.js, and Appwrite, focusing on AI-driven
                  job recommendations. Built secure authentication, real-time data management, and a smooth UI for
                  recruiters and job seekers. Showcased full-stack expertise with scalable architecture and optimized
                  performance.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Appwrite</Badge>
                  <Badge variant="outline">AI Recommendations</Badge>
                </div>
                <div className="mt-auto flex gap-4 pt-6">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </ParallaxCard>
          </div>

          <div className="mt-16 text-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
