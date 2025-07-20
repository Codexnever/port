"use client"

import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/social-icons"
import Link from "next/link"
import { motion } from "framer-motion"

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const socialVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <motion.div custom={1} variants={socialVariants} initial="hidden" animate="visible">
        <Link
          href="https://github.com/Codexnever"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 transition-colors hover:text-white"
          aria-label="GitHub"
        >
          <GitHubIcon className="h-6 w-6" />
        </Link>
      </motion.div>

      <motion.div custom={2} variants={socialVariants} initial="hidden" animate="visible">
        <Link
          href="https://x.com/ChaitanyaK48841"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 transition-colors hover:text-white"
          aria-label="Twitter"
        >
          <TwitterIcon className="h-6 w-6" />
        </Link>
      </motion.div>

      <motion.div custom={3} variants={socialVariants} initial="hidden" animate="visible">
        <Link
          href="https://www.linkedin.com/in/chaitanya-kulthe/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 transition-colors hover:text-white"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="h-6 w-6" />
        </Link>
      </motion.div>
    </div>
  )
}
