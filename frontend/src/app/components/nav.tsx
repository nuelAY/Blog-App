'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
  // Remove auth token from localStorage or cookies
  localStorage.removeItem('token'); // Adjust if using a different key or cookie
  setIsOpen(false);
  window.location.href = '/'; // Redirect to homepage or login
};


  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl px-6 py-3 flex items-center justify-between"
    >
      <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/images/Logo.jpg" alt="Logo" width={60} height={60} className="rounded-full" />
            <h1 className="text-xl font-bold text-gray-900 cursor-pointer">BLOG</h1>
          </div>
        </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {/* <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
          Home
        </Link> */}
        <Link href="/Posts" className="text-gray-700 hover:text-indigo-600 font-medium">
          Posts
        </Link>
        <Link href="/CreatePosts" className="text-gray-700 hover:text-indigo-600 font-medium">
          Create Post
        </Link>
         <Link href="/About" className="text-gray-700 hover:text-indigo-600 font-medium">
              About
            </Link>
      <button
  onClick={handleLogout}
  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white font-medium px-4 py-1.5 rounded-lg transition-colors duration-200"
>
  Logout
</button>
      </div>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl shadow-md px-6 py-4 flex flex-col gap-4 md:hidden"
          >
            {/* <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium">
              Home
            </Link> */}
            <Link href="/Posts" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium">
              Posts
            </Link>
            <Link href="/CreatePosts" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium">
              Create Post
            </Link>
            <Link href="/About" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium">
              About
            </Link>
            <button
  onClick={handleLogout}
  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white font-medium px-4 py-1.5 rounded-lg transition-colors duration-200"
>
  Logout
</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
