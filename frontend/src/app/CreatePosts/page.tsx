'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/nav';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { createBlog } from '@/app/store/features/postSlice';
import { toast } from 'react-toastify';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tech');
  const [image, setImage] = useState<File | null>(null);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) return toast.error('Title and content are required.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      const resultAction = await dispatch(createBlog(formData));
      console.log(resultAction)


      if (createBlog.fulfilled.match(resultAction)) {
        toast.success('Post created successfully!');
        console.log('posted')
        router.push(`/Posts`);
      } else {
        toast.error((resultAction.payload as string) || 'Failed to create post.');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 pb-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl text-gray-900 font-bold mb-2"
        >
          Create a New Post
        </motion.h1>

        <p className="text-sm text-white mb-6">
          Posting as{' '}
          <span className="font-semibold text-yellow-200">
            {user?.name || 'Guest'}
          </span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/20 rounded-lg p-8 shadow-md space-y-6"
        >
          <div>
            <Label htmlFor="title" className="text-gray-700 font-semibold mb-1 block">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-black"
            />
          </div>

          <div>
            <Label htmlFor="body" className="text-gray-700 font-semibold mb-1 block">
              Content
            </Label>
            <Textarea
              id="body"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="text-black"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-700 font-semibold mb-1 block">
              Category
            </Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-md bg-transparent text-black border border-white/50"
            >
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Design">Design</option>
              <option value="Career">Career</option>
            </select>
          </div>

          <div>
            <Label htmlFor="image" className="text-gray-700 font-semibold mb-1 block">
              Cover Image
            </Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="bg-transparent"
            />
            {image && (
              <p className="text-sm mt-2 text-white">Selected: {image.name}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-br from-indigo-600 to-purple-600 text-gray-700 font-semibold px-6 py-3 rounded-lg w-full"
          >
            Publish Post
          </motion.button>
        </form>
      </main>
    </>
  );
}
