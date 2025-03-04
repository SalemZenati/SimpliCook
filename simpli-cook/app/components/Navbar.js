"use client";

import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
  variable: "--font-poppins", // CSS variable for Poppins
});

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Recipe Library", href: "/RecipeLibrary" },
    { name: "Recipe Blog", href: "/RecipeBlog" },
    { name: "Support", href: "/SupportPage" },
    { name: "About Us", href: "#" },
  ];

  const userDropdownItems = [
    { name: "Settings", icon: <FaCog />, href: "#" },
    { name: "Logout", icon: <FaSignOutAlt />, href: "#" },
  ];

  return (
    <nav
      className={`${
        poppins.variable
      } font-sans fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/90"
      }`}
    >
      <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className = "flex items-center">
            <Link
            href="/"
              className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-transform transform hover:scale-105" 
              >
              SimpliCook
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "300px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recipes..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-600"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-orange-600"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
              aria-label="Search"
            >
              <FaSearch className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
                aria-label="User profile"
              >
                <FaUser className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {userDropdownItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
              aria-label="Search"
            >
              <FaSearch className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-600"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              {userDropdownItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
