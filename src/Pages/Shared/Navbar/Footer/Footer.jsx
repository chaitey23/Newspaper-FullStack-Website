import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="text-2xl font-bold text-white mb-6 block">
                            read<span className='text-[#c99e66]'>&</span>digest
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your trusted source for the latest news, insights, and stories from around the world. Delivering truth with integrity.
                        </p>
                        <div className="flex space-x-5">
                            <a href="https://www.facebook.com/chaetey001"
                                target='_blank'
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="#"
                                className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-[#c99e66]">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Home</Link>
                            </li>
                            <li>
                                <Link to="/all-articles" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">All Articles</Link>
                            </li>
                            <li>
                                <Link to="/subscription" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Subscription Plans</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-[#c99e66]">News Categories</h3>
                        <ul className="space-y-3">
                            <li><Link to="/category/politics" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Politics</Link></li>
                            <li><Link to="/category/technology" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Technology</Link></li>
                            <li><Link to="/category/business" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Business</Link></li>
                            <li><Link to="/category/health" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Health</Link></li>
                            <li><Link to="/category/entertainment" className="text-gray-400 hover:text-[#c99e66] transition-colors duration-300 block py-1">Entertainment</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-[#c99e66]">Newsletter</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">Subscribe to our newsletter for daily news updates</p>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition-colors duration-300"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-[#c99e66] text-white rounded hover:bg-[#b58c58] transition-colors duration-300 transform hover:scale-105"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} Read & Digest. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-500 hover:text-[#c99e66] text-sm transition-colors duration-300">Privacy Policy</a>
                            <a href="#" className="text-gray-500 hover:text-[#c99e66] text-sm transition-colors duration-300">Terms of Service</a>
                            <a href="#" className="text-gray-500 hover:text-[#c99e66] text-sm transition-colors duration-300">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;