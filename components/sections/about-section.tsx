"use client"
import { TracingBeam } from "@/components/tracing-beam"
import { motion } from "framer-motion"
import { Terminal, Zap, Mail, Phone, MapPin } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import { ShineBadge } from "@/components/shine-badge"
import { Suspense, lazy } from "react"

const GitHubContributions = lazy(() =>
  import("@/components/github-contributions").then((mod) => ({ default: mod.GitHubContributions })),
)

export function AboutSection() {

  return (
    <section id="about" className="relative bg-zinc-900/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <TracingBeam>
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold flex items-center">
                      <Terminal className="mr-2 h-5 w-5 text-indigo-400" />
                      The Engineer's Manifesto
                    </h3>
                    <p className="text-zinc-400">
                      I'm not just a coder—I build digital stuff that actually works. I take messy problems and
                          turn them into clean code, mixing careful planning with creative thinking to stay ahead of the
                          curve.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-zinc-400">
                    My style? I like to keep things looking simple on the outside but pack them with cool features
                    under the hood. As my debugging mantra goes,
                      <span className="italic text-indigo-300">
                        {" "}
                        "If it works on the first try, you've probably missed something."
                      </span>
                    </p>
                    <p className="text-zinc-400">
                          My open source journey has taught me that coding together makes everything better. When my
                          first PR was merged into a major project, I realized that building software isn't just about
                          fixing bugs—it's about being part of something bigger than just my own code.
                        </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-zinc-400">
                      With hands-on experience in both frontend and backend at Zuvi8 Creatives, I understand the full
                      development process. I build apps that not only work well but also create lasting impressions
                      through great user experiences.
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center gap-6 pt-4"
                >
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Phone className="h-4 w-4 text-indigo-400" />
                    <span>7385118736</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="h-4 w-4 text-indigo-400" />
                    <span>chaitanyakulthe777@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin className="h-4 w-4 text-indigo-400" />
                    <span>Pune</span>
                  </div>
                </motion.div>
                <SocialLinks className="pt-4" />
              </div>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-indigo-400" />
                    Technical Arsenal
                  </h3>
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="mb-2 font-medium text-indigo-400">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React.js",
                          "Next.js",
                          "TypeScript",
                          "Zod",
                          "Context API",
                          "Custom Hooks",
                          "Tailwind CSS",
                          "Framer Motion",
                        ].map((skill) => (
                          <ShineBadge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-200">
                            {skill}
                          </ShineBadge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-indigo-400">Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Node.js",
                          "Express.js",
                          "RESTful APIs",
                          "OpenAI",
                          "Serverless Backend",
                          "RabbitMQ",
                          "Backend Communications Protocol",
                        ].map((skill) => (
                          <ShineBadge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-200">
                            {skill}
                          </ShineBadge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-indigo-400">Database</h4>
                      <div className="flex flex-wrap gap-2">
                        {["MySQL", "MongoDB", "Redis"].map((skill) => (
                          <ShineBadge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-200">
                            {skill}
                          </ShineBadge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-indigo-400">DevOps & Cloud</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Docker", "CI/CD Pipelines", "GitHub Actions"].map((skill) => (
                          <ShineBadge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-200">
                            {skill}
                          </ShineBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="pt-4"
                >
                  <Suspense fallback={<div className="h-24" />}>
                    <GitHubContributions username="Codexnever" />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  )
}
