import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handleAccordionToggle = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">About Us</h2>
                    <p className="mb-4">We are committed to providing the best services.</p>
                    <div className="flex space-x-4">
                        <FaFacebook className="w-6 h-6 hover:text-gray-400 transition" />
                        <FaTwitter className="w-6 h-6 hover:text-gray-400 transition" />
                        <FaInstagram className="w-6 h-6 hover:text-gray-400 transition" />
                    </div>
                </div>

                <nav className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400 transition">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400 transition">About</a></li>
                        <li><a href="#" className="hover:text-gray-400 transition">Services</a></li>
                        <li><a href="#" className="hover:text-gray-400 transition">Contact</a></li>
                    </ul>
                </nav>

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Resources</h2>
                    <button onClick={handleAccordionToggle} className="text-left focus:outline-none">
                        <div className="flex justify-between items-center">
                            <span className="hover:text-gray-400 transition">More Info</span>
                            <span>{isAccordionOpen ? '-' : '+'}</span>
                        </div>
                    </button>
                    {isAccordionOpen && (
                        <div className="mt-4 space-y-2">
                            <p className="hover:text-gray-400 transition">FAQ</p>
                            <p className="hover:text-gray-400 transition">Privacy Policy</p>
                            <p className="hover:text-gray-400 transition">Terms of Service</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <form className="flex flex-col space-y-4">
                        <input type="text" placeholder="Your Name" className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        <input type="email" placeholder="Your Email" className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        <button type="submit" className="p-2 rounded bg-blue-500 hover:bg-blue-700 transition text-white font-bold">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="text-center mt-8 text-gray-400">
                &copy; 2025 SimpliCook. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
