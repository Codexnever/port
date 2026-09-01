import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-chaitanyas-projects-cb5494a0.vercel.app"),
  title: "Chaitanya Kulthe | Search & Retrieval Engineer",
  description:
    "Search and retrieval engineer building evaluation, ranking observability, and search quality tools with Exa, Weaviate, and Cohere.",
  keywords: [
    "Chaitanya Kulthe",
    "Search Engineer",
    "Retrieval Engineer",
    "AI Developer",
    "Exa Ranking Lab",
    "Rerank Debugger",
    "Weaviate",
    "Search Evaluation",
  ],
  authors: [{ name: "Chaitanya Kulthe" }],
  creator: "Chaitanya Kulthe",
  openGraph: {
    title: "Chaitanya Kulthe | Search & Retrieval Engineer",
    description: "Building tools that make retrieval quality visible, measurable, and easier to debug.",
    url: "/",
    siteName: "Chaitanya Kulthe",
    images: [{ url: "/og-cover-v2.jpg", width: 1200, height: 630, alt: "Chaitanya Kulthe portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya Kulthe | Search & Retrieval Engineer",
    description: "Building tools that make retrieval quality visible, measurable, and easier to debug.",
    images: ["/og-cover-v2.jpg"],
    creator: "@ChaitanyaK57",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}
