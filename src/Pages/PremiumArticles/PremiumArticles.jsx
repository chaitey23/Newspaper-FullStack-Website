import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], isLoading, error } = useQuery({
        queryKey: ['premium-articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/articles/premium');
            return res.data;
        }
    });

    // Gold color configuration
    const goldColor = '#c99e66';
    const goldGradient = 'linear-gradient(135deg, #c99e66, #b48a52)';


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardHoverVariants = {
        initial: {
            scale: 1,
            y: 0
        },
        hover: {
            scale: 1.02,
            y: -5,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const imageHoverVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const buttonHoverVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const loadingVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Loading Spinner Component
    const LoadingSpinner = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-50 flex items-center justify-center py-12"
        >
            <div className="text-center">
                <div className="relative">
                    {/* Main Spinner */}
                    <motion.div
                        variants={loadingVariants}
                        animate="animate"
                        className="w-16 h-16 border-4 border-amber-200 rounded-full mx-auto mb-4"
                        style={{ borderTopColor: goldColor }}
                    ></motion.div>

                    {/* Outer Pulse Effect */}
                    <motion.div
                        variants={pulseVariants}
                        animate="animate"
                        className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full mx-auto"
                        style={{ borderColor: goldColor }}
                    ></motion.div>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-semibold text-gray-700 mt-4"
                >
                    Loading Premium Articles
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-gray-500 mt-2"
                >
                    Please wait while we fetch exclusive content for you
                </motion.p>
            </div>
        </motion.div>
    );

    // Skeleton Loading Component
    const ArticleSkeleton = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {[...Array(6)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 }
                    }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 animate-pulse"
                >
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );

    if (isLoading) return <ArticleSkeleton />;

    if (error) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-50 flex items-center justify-center py-12"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${goldColor}20` }}
                >
                    <svg className="w-8 h-8" style={{ color: goldColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl font-semibold text-gray-800 mb-2"
                >
                    Failed to Load Articles
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 mb-4"
                >
                    We encountered an issue while loading premium articles.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 rounded-lg font-semibold text-white transition duration-200 hover:shadow-lg"
                    style={{ backgroundColor: goldColor }}
                >
                    Try Again
                </motion.button>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-8 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center items-center mb-4">
                        <motion.div
                            whileHover={{
                                scale: 1.1,
                                rotate: 5
                            }}
                            className="w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-lg"
                            style={{ background: goldGradient }}
                        >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold"
                            style={{ color: goldColor }}
                        >
                            Premium Articles
                        </motion.h1>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto"
                    >
                        Exclusive content from top publishers. Unlock insights and stay ahead with premium journalism.
                    </motion.p>
                </motion.div>

                {/* Articles Grid */}
                <AnimatePresence>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {articles.map((article, index) => (
                            <motion.div
                                key={article._id}
                                variants={itemVariants}
                                layout
                                initial="initial"
                                whileHover="hover"
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 group"
                            >
                                {/* Premium Badge */}
                                <motion.div
                                    variants={cardHoverVariants}
                                    className="relative overflow-hidden"
                                >
                                    <motion.div
                                        variants={imageHoverVariants}
                                        className="overflow-hidden"
                                    >
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.5 }}
                                        className="absolute top-4 right-4"
                                    >
                                        <span
                                            className="text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center"
                                            style={{ backgroundColor: goldColor }}
                                        >
                                            <motion.svg
                                                animate={{ rotate: [0, 10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-4 h-4 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </motion.svg>
                                            PREMIUM
                                        </span>
                                    </motion.div>
                                </motion.div>

                                <div className="p-6">
                                    <motion.h3
                                        whileHover={{ color: goldColor }}
                                        className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 transition duration-200"
                                    >
                                        {article.title}
                                    </motion.h3>
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                                            style={{ backgroundColor: `${goldColor}20` }}
                                        >
                                            <svg className="w-3 h-3" style={{ color: goldColor }} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        </motion.div>
                                        <span className="text-sm font-medium">{article.publisher}</span>
                                    </div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.7 }}
                                        className="text-gray-600 mb-4 line-clamp-3 leading-relaxed"
                                    >
                                        {article.description}
                                    </motion.p>
                                    <motion.div
                                        variants={buttonHoverVariants}
                                        whileHover="hover"
                                    >
                                        <Link
                                            to={`/article/${article._id}`}
                                            className="inline-flex items-center justify-center w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md"
                                            style={{ backgroundColor: goldColor }}
                                        >
                                            Read Full Article
                                            <motion.svg
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </motion.svg>
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                <AnimatePresence>
                    {articles.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-16"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    transition: { duration: 3, repeat: Infinity }
                                }}
                                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{ backgroundColor: `${goldColor}15` }}
                            >
                                <svg
                                    className="w-12 h-12"
                                    style={{ color: goldColor }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-semibold text-gray-700 mb-2"
                            >
                                No Premium Articles Available
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-500 max-w-md mx-auto"
                            >
                                Check back later for exclusive premium content from our top publishers and contributors.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PremiumArticles;