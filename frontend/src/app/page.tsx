'use client'

// import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion"
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-center text-gray-900 max-w-3xl"
      >
        <h1> Own Your Content. Share Your Story.</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl mt-6 text-center text-gray-700 max-w-xl"
      >
        <p>A modern, developer-focused blog platform built with the MERN stack.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <Link href="/Auth">
          <Button
            variant="secondary"
            className="bg-[#1e1e1e] hover:bg-[#2a2a2a] px-6 py-3 text-lg rounded-xl text-white"
          >
            Get Started
          </Button>
        </Link>
      </motion.div>


      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="relative mt-16 w-full max-w-4xl h-[300px] rounded-xl shadow-2xl bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] overflow-hidden mb-10"
        >
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-xl border border-gray-700 bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-sm pointer-events-none" />

          {/* Floating Sparkle Icon */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-5 right-5 text-pink-400"
          >
            <Sparkles size={32} />
          </motion.div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-3xl font-bold text-white"
            >
              Interactive Hero Preview
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="text-lg text-gray-400 mt-3 max-w-xl font-bold"
            >
              Experience smooth transitions, stunning UI, and Framer-powered magic—all in one place.
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

    </main>
  );
}
