'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchAllBlogs, deleteBlog} from '@/app/store/features/postSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/app/components/nav';
import Image from 'next/image';
import PostModal from '@/app/components/postModal';
import {toast} from 'react-toastify'

const categories = ['All', 'Technology', 'Lifestyle', 'Education', 'Business'];
const filters = ['Latest', 'Popular', 'Trending'];

const mockPosts = [
  {
    _id: 'mock1',
    title: 'The Future of React Server Components',
    image: '/images/CODE.jpg',
    author: 'Alice Johnson',
    category: 'Technology',
  },
  {
    _id: 'mock2',
    title: 'How to Stay Productive as a Developer',
    image: '/images/BOY.jpg',
    author: 'John Doe',
    category: 'Lifestyle',
  },
  {
    _id: 'mock3',
    title: 'The Rise of AI in the Education Sector',
    image: '/images/AI.jpg',
    author: 'Sophia Smith',
    category: 'Education',
  },
  {
    _id: 'mock4',
    title: 'Building a Startup from Scratch',
    image: '/images/START-UP.jpg',
    author: 'Michael Lee',
    category: 'Business',
  },
];

export default function PostsPage() {
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector((state) => state.blogs);
  const { user } = useAppSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('Latest');
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  // Combine mock and API posts
  const allPosts = [...mockPosts, ...blogs];

  // Filter posts based on search and category
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
   const handleDelete = async (e: React.MouseEvent, postId: string) => {
  e.stopPropagation(); // Prevent card click opening modal

  if (postId.startsWith('mock')) {
    alert("Mock posts can't be deleted.");
    return;
  }

  if (confirm('Are you sure you want to delete this post?')) {
    const result = await dispatch(deleteBlog(postId));

    if (deleteBlog.fulfilled.match(result)) {
      toast.success('Blog deleted successfully');
    } else {
      toast.error(result.payload as string);
    }
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 py-10"
        >
          <div className="mb-8 mt-20">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">
              Welcome, {user?.name || 'Guest'} 👋
            </h1>
            <p className="text-lg text-gray-700 font-bold">
              Explore insightful posts shared by the community.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 bg-gray-300 text-black"
            />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-gray-300 text-black px-5 py-2 rounded-md text-left"
            >
              {filters.map((filter) => (
                <option key={filter}>{filter}</option>
              ))}
            </select>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="bg-gray-500 text-white border-white"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Loading & Error States */}
          {loading && <p className="text-gray-900 font-semibold">Loading posts...</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* Post Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {filteredPosts.length > 0 ? (
    filteredPosts.map((post, index) => (
      <motion.div
        key={post._id || index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setSelectedPost(post)}
        className="cursor-pointer"
      >
        <Card className="bg-gray-300 text-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
          <div className="relative h-40 w-full">
            <Image
              src={post.image || '/images/default-post.jpg'}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <p className="text-sm text-indigo-600 font-medium">Category: {post.category}</p>
            <div className="flex items-center mt-4">
              <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.author?.name ? post.author.name[0] : 'A'}
              </div>
              <span className="ml-2 text-sm text-gray-700">
                By {post.author?.name || 'Unknown'}
              </span>
            </div>
            <button
                        onClick={(e) => handleDelete(e, post._id)}
                        className="top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-semibold mt-5"
                      >
                        Delete
                      </button>
          </div>
        </Card>
      </motion.div>
    ))
  ) : (
    <p className="text-white/80 col-span-full">No posts found matching your criteria.</p>
  )}
</div>

        </motion.div>

        {/* Post Modal */}
        <PostModal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} post={selectedPost} />
      </div>
    </>
  );
}
