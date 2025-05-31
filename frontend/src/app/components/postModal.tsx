'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    title: string;
    content: string;
    author: { name: string};
    category: string;
    image: string;
  } | null;
}

export default function PostModal({ isOpen, onClose, post }: PostModalProps) {
  if (!isOpen || !post) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-300 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-60 w-full">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={post.title}
              fill
              objectFit="cover"
              className="rounded-t-xl"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/60 rounded-full p-1 text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 text-gray-900">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-1">Category: {post.category}</p>
            <p className="text-sm text-gray-500 mb-4">By {post.author.name}</p>
            <p className="text-base leading-relaxed">
              This is a mock post detail. You can later replace this with content fetched from the backend.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
              Pellentesque habitant morbi tristique senectus et netus.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
