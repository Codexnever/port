"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function JourneySection() {
  return (

    <section id="journey" className="relative bg-zinc-900/50 py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Professional Journey
        </motion.h2>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <motion.div
              className="relative border-l border-indigo-700 pl-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
              <h3 className="text-xl font-semibold">Backend Developer</h3>
              <p className="text-indigo-400">Zuvi8 Creatives • Aug 2023 - Aug 2024</p>
              <div className="mt-4 space-y-2 text-zinc-400">
                <p>
                  Managed both frontend and backend development, integrating advanced technologies for seamless user
                  experiences and system performance.
                </p>
                <p>
                  Designed and built responsive, dynamic web applications and software interfaces using React.js,
                  Next.js, and TypeScript. Implemented form validation and data handling using Zod library.
                </p>
                <p>
                  Implemented load balancers to ensure high availability and distribution of incoming traffic across
                  multiple servers.
                </p>
                <p>Managed backend operations.</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-indigo-700/50 text-indigo-300">
                  React.js
                </Badge>
                <Badge variant="outline" className="border-indigo-700/50 text-indigo-300">
                  Next.js
                </Badge>
                <Badge variant="outline" className="border-indigo-700/50 text-indigo-300">
                  TypeScript
                </Badge>
                <Badge variant="outline" className="border-indigo-700/50 text-indigo-300">
                  Node.js
                </Badge>
                <Badge variant="outline" className="border-indigo-700/50 text-indigo-300">
                  Load Balancing
                </Badge>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-2xl font-semibold">Certifications</h3>
            <div className="space-y-6">
              <div className="relative border-l border-indigo-700 pl-8">
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
                <h4 className="text-lg font-semibold">Software Engineer Intern</h4>
                <p className="text-indigo-400">By Hacker Rank</p>
              </div>
              <div className="relative border-l border-indigo-700 pl-8">
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
                <h4 className="text-lg font-semibold">Problem Solving</h4>
                <p className="text-indigo-400">By Hacker Rank</p>
              </div>
              <div className="relative border-l border-indigo-700 pl-8">
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
                <h4 className="text-lg font-semibold">Backend Developer</h4>
                <p className="text-indigo-400">By Apoorva Institute</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-2xl font-semibold">Education</h3>
            <div className="relative border-l border-indigo-700 pl-8">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
              <h4 className="text-xl font-semibold">Diploma in E&tc</h4>
              <p className="text-indigo-400">Maharashtra State Board of Technical Education, Mumbai</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
