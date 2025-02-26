"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
  FaSearch,
  FaHeart,
  FaClock,
  FaShare,
  FaPrint,
  FaRobot,
  FaTrash,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Header = () => (
  <header className="relative mt-12 h-64 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white dark:from-green-700 dark:via-green-600 dark:to-green-500">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        SimpliCook Recipe Blog
      </h1>
      <div className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full py-3 px-4 pr-12 rounded-lg bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  </header>
);


const RecipeBlog = () => {

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Navbar/>
        <Header />
        <Footer/>
      </div>
  );
};

export default RecipeBlog;
