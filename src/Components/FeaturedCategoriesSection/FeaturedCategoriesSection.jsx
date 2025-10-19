import React from 'react';
import { Link } from 'react-router';

const FeaturedCategoriesSection = () => {
    const categories = [
        {
            id: 1,
            name: "Technology",
            description: "Latest tech news and innovations",
            articleCount: "1.2K",
            icon: "💻",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            name: "Business",
            description: "Market trends and financial insights",
            articleCount: "856",
            icon: "📈",
            color: "from-green-500 to-green-600"
        },
        {
            id: 3,
            name: "Lifestyle",
            description: "Health, wellness, and daily living",
            articleCount: "742",
            icon: "🌟",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 4,
            name: "Entertainment",
            description: "Movies, music, and celebrity news",
            articleCount: "923",
            icon: "🎬",
            color: "from-pink-500 to-pink-600"
        },
        {
            id: 5,
            name: "Sports",
            description: "Live scores and sports analysis",
            articleCount: "678",
            icon: "⚽",
            color: "from-orange-500 to-orange-600"
        },
        {
            id: 6,
            name: "Science",
            description: "Discoveries and research breakthroughs",
            articleCount: "534",
            icon: "🔬",
            color: "from-indigo-500 to-indigo-600"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden mt-16">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#c99e66]/10 to-[#c99e66]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-[#c99e66]/10 to-[#c99e66]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div
                        className="inline-block mb-4"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        <span className="text-[#c99e66] font-semibold text-sm uppercase tracking-wider bg-[#c99e66]/10 px-4 py-2 rounded-full">
                            Explore Topics
                        </span>
                    </div>
                    <h2
                        className="text-4xl font-bold text-gray-900 mb-6"
                        data-aos="fade-down"
                        data-aos-delay="200"
                    >
                        Featured Categories
                    </h2>
                    <p
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        data-aos="fade-down"
                        data-aos-delay="300"
                    >
                        Dive into our diverse range of topics and discover content that matters to you
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 100)}
                        >
                            {/* Hover background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-all duration-500"></div>

                            {/* Animated border effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#c99e66]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                                    >
                                        {category.icon}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-600 bg-gray-100/80 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-gray-200/80 transition-colors duration-300">
                                        {category.articleCount} articles
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                    {category.description}
                                </p>

                                <button className="inline-flex items-center text-[#c99e66] font-semibold hover:text-[#b58c58] transition-all duration-300 group-hover:translate-x-2">
                                    Explore Category
                                    <svg
                                        className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="text-center mt-16"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    <button className="group relative px-10 py-4 bg-transparent border-2 border-[#c99e66] text-[#c99e66] font-semibold rounded-xl hover:bg-[#c99e66] hover:text-white transition-all duration-300 overflow-hidden">
                        <Link to='/all-articles'>
                            <span className="relative z-10">View All Categories</span>
                        </Link>
                        <div className="absolute inset-0 bg-[#c99e66] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategoriesSection;