import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import { motion } from 'framer-motion';

const LatestArticles = () => {
    const { data: articles = [], isLoading } = useArticles();

    if (isLoading) {
        return (
            <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-[#faf6f0] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#c99e66]/5 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-96"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Filter only free articles and sort by date
    const freeArticles = articles.filter(article => !article.isPremium);
    const latestFreeArticles = freeArticles
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-[#faf6f0] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#c99e66]/5 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c99e66]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#c99e66]/10 rounded-full blur-3xl"></div>

            {/* Floating Icons */}
            <div className="absolute top-1/4 left-10 text-6xl opacity-5">📰</div>
            <div className="absolute bottom-1/4 right-16 text-4xl opacity-5">✨</div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Unique Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-6 h-0.5 bg-[#c99e66]"></div>
                        <span className="text-[#c99e66] font-semibold text-sm uppercase tracking-wider">
                            Fresh Content
                        </span>
                        <div className="w-6 h-0.5 bg-[#c99e66]"></div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Latest <span className="text-[#c99e66] relative">
                            Free Reads
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#c99e66] to-transparent"></div>
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover the newest stories from our community.
                        <span className="text-[#c99e66] font-semibold"> Fresh content added daily.</span>
                    </p>
                </motion.div>

                {latestFreeArticles.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-8xl mb-6 opacity-20">📭</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No Free Articles Available</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            We're working on new free content. Check back soon or explore our premium collection.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {latestFreeArticles.map((article, index) => (
                            <motion.div
                                key={article._id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -12,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                className="group relative"
                            >
                                {/* Main Card */}
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full flex flex-col">

                                    {/* Image Container with Unique Overlay */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Floating Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                                🆕 FREE
                                            </span>
                                            {/* ✅ Digifyy It Ltd Badge - Show for their articles */}
                                            {article.publisher === "Digifyy It Ltd" && (
                                                <span className="bg-[#c99e66] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                                    Digifyy It Ltd
                                                </span>
                                            )}
                                            {/* ✅ Show "JUST PUBLISHED" only for the very first article */}
                                            {index === 0 && article.publisher !== "Digifyy It Ltd" && (
                                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                                    JUST PUBLISHED
                                                </span>
                                            )}
                                        </div>

                                        {/* Time Indicator */}
                                        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Publisher with Icon - Highlight Digifyy It Ltd */}
                                        <div className={`flex items-center gap-2 mb-4 ${article.publisher === "Digifyy It Ltd" ? 'text-[#c99e66] font-bold' : 'text-gray-600'}`}>
                                            <div className={`w-2 h-2 rounded-full ${article.publisher === "Digifyy It Ltd" ? 'bg-[#c99e66]' : 'bg-gray-400'}`}></div>
                                            <span className="text-sm font-semibold uppercase tracking-wide">
                                                {article.publisher}
                                            </span>
                                            {article.publisher === "Digifyy It Ltd" && (
                                                <span className="text-[10px] bg-[#c99e66]/10 text-[#c99e66] px-2 py-0.5 rounded-full">
                                                    Official
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-[#c99e66] transition-colors duration-300">
                                            {article.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-1">
                                            {article.description}
                                        </p>

                                        {/* Interactive Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            {/* Read Time Estimate */}
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                <span>3 min read</span>
                                            </div>

                                            {/* Animated Read More */}
                                            <Link
                                                to={`/article/${article._id}`}
                                                className="inline-flex items-center gap-2 text-[#c99e66] font-semibold text-sm hover:text-[#b58d5a] transition-all duration-300 group-hover:gap-3"
                                            >
                                                Read Story
                                                <svg
                                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#c99e66]/20 transition-all duration-500 pointer-events-none"></div>
                                </div>

                                {/* Floating Shadow Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c99e66]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform group-hover:scale-105"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Unique CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-[#c99e66]/5 to-[#b08d5a]/5 rounded-2xl p-8 border border-[#c99e66]/10">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Hungry for more stories?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Explore our complete collection of free articles and discover your next favorite read.
                        </p>
                        <Link
                            to="/all-articles"
                            className="group relative inline-flex items-center gap-3 bg-[#c99e66] text-white px-8 py-4 rounded-xl hover:bg-[#b58d5a] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold overflow-hidden"
                        >
                            <span className="relative z-10">Browse All Articles</span>
                            <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LatestArticles;