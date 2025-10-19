import React from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white opacity-90"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#f8f8f8_25%,transparent_25%),linear-gradient(-45deg,#f8f8f8_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f8f8f8_75%),linear-gradient(-45deg,transparent_75%,#f8f8f8_75%)] bg-[size:20px_20px] opacity-30"></div>

            {/* Main Content */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Text Content */}
                    <div className="text-gray-800 z-10">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#c99e66] text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide mb-6">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Premium Journalism
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
                            Truth in{' '}
                            <span className="font-serif italic text-[#c99e66] block">Every Story</span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl font-light">
                            Delivering uncompromising journalism with integrity and depth.
                            Where every headline tells a story worth reading.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Link to="/all-articles">
                                <button className="bg-[#c99e66] hover:bg-[#b58d5a] text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide text-sm cursor-pointer">
                                    Explore Latest Edition
                                </button>
                            </Link>
                            <Link to='/subscription'>
                                <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide text-sm">
                                    Subscribe Today
                                </button>
                            </Link>


                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#c99e66] rounded-full"></div>
                                <span>Since 1985</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#c99e66] rounded-full"></div>
                                <span>Independent Media</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#c99e66] rounded-full"></div>
                                <span>Award Winning</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Content */}
                    <div className="relative">
                        {/* Main Featured Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                alt="Newspaper Feature"
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <div className="text-white">
                                    <span className="text-[#c99e66] text-sm font-medium">FEATURED STORY</span>
                                    <h3 className="text-xl font-semibold mt-1">The Future of Digital Media in Modern Society</h3>
                                    <p className="text-gray-300 text-sm mt-2">Exploring how technology shapes today's journalism landscape</p>
                                </div>
                            </div>
                        </div>

                        {/* Small Secondary Images */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="relative rounded-lg overflow-hidden shadow-lg h-32">
                                <img
                                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                    alt="Business News"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <span className="absolute bottom-2 left-3 text-white text-xs font-medium">Business</span>
                            </div>
                            <div className="relative rounded-lg overflow-hidden shadow-lg h-32">
                                <img
                                    src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                                    alt="Technology"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <span className="absolute bottom-2 left-3 text-white text-xs font-medium">Technology</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                    <div className="flex flex-col items-center text-gray-400">
                        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
                        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 border-2 border-[#c99e66] opacity-10 rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-12 h-12 border border-[#c99e66] opacity-10 rounded-full"></div>
        </section>
    );
};

export default HeroSection;