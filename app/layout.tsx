import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Outfit } from "next/font/google"
import "./globals.css"
import DayNightBackground from "@/components/DayNightBackground"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
import { ThemeProvider } from "@/components/theme-provider"
import ResponsiveNavbar from "@/components/ResponsiveNavbar"

export const metadata: Metadata = {
  title: "Chaitanya Kulthe | Full Stack & AI Developer",
  description:
    "Building future-ready web apps with React, Node.js, and AI. Explore my work on AI tools, Exa Ranking Lab, and no-code automation platforms.",
    keywords: [
    "Chaitanya Kulthe",
    "Full Stack Developer",
    "JavaScript Developer",
    "React Developer",
    "Node.js Developer",
    "AI Developer",
    "Exa Ranking Lab",
    "No-Code AI",
    "Software Portfolio",
  ],
  authors: [{ name: "Chaitanya Kulthe", url: "https://codexnever.appwrite.network/" }],
  creator: "Chaitanya Kulthe",
  metadataBase: new URL("https://codexnever.appwrite.network/"),
  openGraph: {
    title: "Chaitanya Kulthe | Full Stack & AI Developer",
    description:
      "A self-taught dev building powerful tools with JavaScript, AI, and semantic search. Dive into real-world projects like Exa Ranking Lab and no-code AI workflows.",
    url: "https://codexnever.appwrite.network//",
    siteName: "Chaitanya Kulthe Portfolio",
    images: [
      {
        url: "https://codexnever.appwrite.network/og-cover-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Chaitanya Kulthe – Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya Kulthe | Next-Gen Engineer",
    description:
      "Explore AI-powered apps, developer tools, and next-gen search analytics built with love, logic, and JavaScript.",
    images: ["https://codexnever.appwrite.network/og-cover-v2.jpg"],//Must full url 
    creator: "@ChaitanyaK48841", 
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <body className={`${jetbrainsMono.variable} ${outfit.variable} font-sans bg-black text-white`}>
        <DayNightBackground />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ResponsiveNavbar />
          {children}
        </ThemeProvider>  
      </body>
    </html>
  )
}
