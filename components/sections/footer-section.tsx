"use client"
export function FooterSection() {
  return (
    <footer className="bg-black border-t border-indigo-900/30 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Chaitanya Kulthe. All rights reserved.
        </p>
        <p className="text-indigo-400 mt-2 text-xs sm:text-sm font-mono opacity-70">
          Not just code. A pattern of thought.
        </p>
      </div>
    </footer>
  )
}
