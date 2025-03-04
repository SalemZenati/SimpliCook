"use client";

import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaChevronRight,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Header = () => (
  <header className="relative pt-20 h-64 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white dark:from-green-700 dark:via-green-600 dark:to-green-500">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">SimpliCook Blog</h1>
      <p className="text-lg">Read the latest tips, recipes, and cooking inspiration.</p>
    </div>
  </header>
);

const BlogPost = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-xl">{post.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
        <FaCalendarAlt className="mr-2" /> {post.date} | <FaUser className="ml-2 mr-2" /> {post.author}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{post.excerpt}</p>
      <a href={post.link} className="text-green-600 hover:underline flex items-center mt-3">
        Read More <FaChevronRight className="ml-1" />
      </a>
    </div>
  </div>
);

const RecipeBlog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([
    {
      title: "10 Easy Recipes for Busy Weeknights",
      image: "https://source.unsplash.com/random/800x600/?cooking,food",
      date: "February 20, 2025",
      author: "John Doe",
      excerpt: "Discover quick and delicious meal ideas perfect for busy schedules.",
      link: "#",
    },
    {
      title: "The Secrets to Perfect Pasta Every Time",
      image: "https://source.unsplash.com/800x600/?pasta,dish",
      date: "February 18, 2025",
      author: "Jane Smith",
      excerpt: "Learn the tips and tricks that will take your pasta dishes to the next level.",
      link: "#",
    },
    {
      title: "How to Bake Like a Pro: Essential Tips",
      image: "https://source.unsplash.com/800x600/?baking,dessert",
      date: "February 15, 2025",
      author: "Emily Johnson",
      excerpt: "Master the art of baking with these expert techniques and insights.",
      link: "#",
    },
    {
      title: "Healthy Eating: What You Need to Know",
      image: "https://source.unsplash.com/800x600/?healthy,food",
      date: "February 12, 2025",
      author: "Sarah Williams",
      excerpt: "A guide to maintaining a balanced diet with simple healthy recipes.",
      link: "#",
    },
    {
      title: "5 Must-Try Vegan Recipes",
      image: "https://source.unsplash.com/800x600/?vegan,vegetables",
      date: "February 10, 2025",
      author: "Michael Brown",
      excerpt: "Explore these delicious and easy vegan recipes that everyone will love.",
      link: "#",
    },
    {
      title: "Top Kitchen Hacks for Cooking Faster",
      image: "https://source.unsplash.com/800x600/?kitchen,cooking",
      date: "February 8, 2025",
      author: "Laura Martinez",
      excerpt: "Learn kitchen hacks that will save you time while cooking meals.",
      link: "#",
    },
  ]);

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar />
      <Header />
      
      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <FaSearch className="text-gray-500 dark:text-gray-300 text-xl" />
            <input
              type="text"
              placeholder="Search blog posts..."
              className="bg-transparent w-full ml-2 outline-none text-gray-800 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="ml-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogPost key={index} post={post} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RecipeBlog;
