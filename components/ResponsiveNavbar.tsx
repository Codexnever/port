"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Terminal, Home, User, Briefcase, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Shared nav items with icons
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Projects", icon: Briefcase },
  { href: "#blog", label: "Blog", icon: FileText },
  { href: "#contact", label: "Contact", icon: Mail },
];  

export default function ResponsiveNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hash, setHash] = useState<string>("");
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0.1 }
    );
    document.querySelectorAll("section[id]").forEach((sec) => observer.observe(sec));
    return () => document.querySelectorAll("section[id]").forEach((sec) => observer.unobserve(sec));
  }, []);

  // Track hash for client-side navigation
  useEffect(() => {
    const updateHash = () => {
      if (typeof window !== "undefined") {
        setHash(window.location.hash);
      }
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  // Desktop navbar
  const TopNav = (
    <motion.header
      initial={false}
      animate={{
        width: isScrolled ? "60%" : "100%",
        backgroundColor: isScrolled ? "rgba(52, 68, 155, 0.09)" : "transparent",
        borderRadius: isScrolled ? "20px" : "0px",
        top: isScrolled ? 20 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 -translate-x-1/2 z-50 hidden md:block backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center text-xl font-mono font-bold text-white gap-2">
          <Terminal className="h-5 w-5 text-indigo-500" />
          <span className="text-indigo-500">&gt;</span>
          <span className="text-white">CK</span>
        </Link>
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm transition-colors hover:text-white",
                pathname === item.href ? "text-white" : "text-zinc-400"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="#contact">Get In Touch</Link>
        </Button>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-zinc-800 bg-zinc-950 p-0">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-1">
                <Terminal className="h-5 w-5 text-indigo-500" />
                <span className="text-indigo-500">&gt;</span>
                <span className="text-white">CK</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 px-6 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-lg transition-colors hover:text-white",
                    pathname === item.href ? "text-white" : "text-zinc-400"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );

  // Mobile bottom navbar with CSS centering
  const BottomNav = (
    <motion.div
      ref={bottomNavRef}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 inset-x-0 mx-auto z-50 w-[90%] max-w-md bg-black/90 backdrop-blur-md border border-indigo-900/30 rounded-2xl shadow-lg md:hidden"
    >
      <div className="flex justify-between items-center px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          let isActive = false;
          if (item.href === "/") {
            isActive = pathname === "/" && (!hash || hash === "#");
          } else if (item.href.startsWith("#")) {
            isActive = hash === item.href;
          } else {
            isActive = pathname === item.href;
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex flex-col items-center justify-center gap-1 w-full py-1",
                isActive
                  ? "text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]"
                  : "text-gray-400"
              )}
              onClick={() => {
                if (item.href.startsWith("#")) {
                  setTimeout(() => {
                    setActiveId(item.href.replace("#", ""));
                    setHash(item.href);
                  }, 10);
                }
              }}
            >
              <motion.div
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span className="text-[10px]">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <>
      {TopNav}
      {BottomNav}
    </>
  );
}
