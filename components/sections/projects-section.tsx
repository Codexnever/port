"use client"
import { motion } from "framer-motion"
import { Suspense, lazy } from "react"
const AdvancedProjectCard = lazy(() =>
  import("@/components/advanced-project-card").then((mod) => ({ default: mod.AdvancedProjectCard })),
)

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span>Projects & Innovations</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of digital universes I've engineered—each one a testament to the art of problem-solving through
            code with a touch of creative rebellion.
          </p>
        </motion.div>
        <Suspense fallback={
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 rounded-xl bg-zinc-900/50 animate-pulse shimmer"></div>
            ))}
          </div>
        }>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <AdvancedProjectCard
              title="No-Code AI Workflow Builder"
              description="A powerful platform built with Next.js, Node.js, Appwrite, and OpenAI API that allows users to create AI-powered workflows with a drag-and-drop interface. Features an intuitive UI with React Flow and real-time workflow saving."
              image="./no-code.png"
              tags={["Next.js", "Node.js", "Appwrite", "OpenAI API", "React Flow"]}
              githubUrl="https://github.com/Codexnever/No-Code-AI-Workflow"
              liveUrl="https://no-code-ai-workflow.vercel.app/"
              funnyBug="It occasionally thinks it's sentient. I was working on that."
              coolFeature="Can predict what you want before you know you want it. Spooky."
            />
            <AdvancedProjectCard
              title="Email Sequence Builder"
              description="This intuitive tool allows you to create and schedule automated email sequences to connect with your audience and achieve your marketing goals"
              image="/email.png"
              tags={["Next.js", "TypeScript", "Nodemailer", "Agenda"]}
              githubUrl="https://github.com/Codexnever/Email-Sequence-Builder"
              liveUrl="https://email-sequence-builder.vercel.app/login"
              funnyBug="Forgets the recipient's name and defaults to addressing everyone as 'Hey Bestie!'"
              coolFeature="Schedules your emails to send at the perfect local time for each recipient, no matter where they are."
            />
            <AdvancedProjectCard
              title="Instahyre Clone – AI Job Matching"
              description="An Instahyre-inspired job portal using React, Node.js, and Appwrite, focusing on AI-driven job recommendations. Features secure authentication, real-time data management, and a smooth UI for recruiters and job seekers."
              image="/instahyre.png"
              tags={["React", "Node.js", "Appwrite", "AI Recommendations"]}
              githubUrl="https://github.com/Codexnever/instahyre-clone"
              funnyBug="Sometimes matches developers with astronaut jobs. Aim high, right?"
              coolFeature="The AI is so good it found me a job I didn't apply for."
            />
            <AdvancedProjectCard
              title="Exa Ranking Lab(Soon...)"
              description="Soon..."
              image="/exa-ranking-lab.png"
              tags={["Next.js", "Tailwind CSS", "Exa API", "Appwrite", "TypeScript", "NLP"]}
              githubUrl="#"
              funnyBug="Once thought 'AI girlfriend' and 'ranking algorithm' were the same thing. Close enough."
              coolFeature="Tracks how Exa evolves in real time—like a microscope for search engine intelligence."
            />
          </div>
        </Suspense>
      </div>
    </section>
  )
}
