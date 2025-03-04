"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Header = () => (
  <header className="relative pt-20 h-64 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white dark:from-green-700 dark:via-green-600 dark:to-green-500">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
      <p className="text-lg">Find answers to common questions or contact us for assistance.</p>
    </div>
  </header>
);

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I save a recipe?",
      answer: "You can save a recipe by clicking the 'Save Recipe' button below the generated recipe.",
    },
    {
      question: "Can I access my saved recipes later?",
      answer: "Yes! Your saved recipes are stored locally and can be accessed anytime in the 'Saved Recipes' section.",
    },
    {
      question: "How do I generate an AI-powered recipe?",
      answer: "Enter your ingredients, select preferences, and click 'Generate Recipe' to receive a unique AI-created dish!",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via email at support@simplicook.com or call us at (123) 456-7890.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-green-600 dark:text-green-400"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openFAQ === index && <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactSection = () => (
  <div className="bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
    <p className="text-lg text-gray-700 dark:text-gray-300">Need further assistance? Reach out to us!</p>
    <div className="mt-4 space-y-2">
      <p className="flex items-center">
        <FaEnvelope className="text-green-500 dark:text-green-400 mr-2" />
        <a href="mailto:support@simplicook.com" className="hover:underline">
          support@simplicook.com
        </a>
      </p>
      <p className="flex items-center">
        <FaPhone className="text-green-500 dark:text-green-400 mr-2" />
        (123) 456-7890
      </p>
    </div>
  </div>
);

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
