'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/nav';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 pb-20 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center"
        >
          About Us
        </motion.h1>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-center text-lg text-gray-700 mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p>
            Our mission is to empower individuals and businesses by creating innovative digital solutions that drive impact, efficiency, and engagement. We strive to bridge technology and creativity for a better connected future.
          </p>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-4xl mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Our Journey</h2>
          <div className="space-y-6">
            {[
              { year: '2020', event: 'Founded with a vision for change' },
              { year: '2021', event: 'Launched our first product' },
              { year: '2022', event: 'Scaled to thousands of users' },
              { year: '2023', event: 'Expanded our team and services' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
                className="flex items-start gap-4 border-l-4 border-white/40 pl-4"
              >
                <span className="text-xl font-semibold text-yellow-300">{item.year}</span>
                <p className="text-gray-700">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <section className="w-full max-w-5xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Meet the Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jane Smith',
                role: 'Frontend Developer',
                image: '/images/shocked.jpg',
                twitter: 'https://twitter.com/janesmith'
              },
              {
                name: 'Michael Lee',
                role: 'UI/UX Designer',
                image: '/images/excited.jpg',
                twitter: 'https://twitter.com/michaellee'
              },
              {
                name: 'Sara Khan',
                role: 'Backend Engineer',
                image: '/images/smile.jpg',
                twitter: 'https://twitter.com/sarakhan'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-lg"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-white/30"
                />
                <h3 className="text-xl font-semibold mb-1 text-gray-700">{member.name}</h3>
                <p className="mb-2 text-gray-600">{member.role}</p>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-white transition"
                >
                  Twitter ↗
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-3xl bg-white/20 rounded-xl p-8 shadow-md text-white"
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Contact Us</h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Name</label>
              <input type="text" className="w-full p-2 rounded-md bg-transparent text-black border border-white/50" placeholder="Your name" />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input type="email" className="w-full p-2 rounded-md bg-transparent text-black border border-white/50" placeholder="Your email" />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Message</label>
              <textarea className="w-full p-2 rounded-md bg-transparent text-black border border-white/50" rows={5} placeholder="Your message"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-br from-indigo-600 to-purple-600 text-gray-700 font-semibold px-6 py-3 rounded-lg w-full"
            >
              Send Message
            </motion.button>
          </form>
        </motion.section>
      </main>
    </>
  );
}
