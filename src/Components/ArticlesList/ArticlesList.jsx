import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useArticles } from '../../hooks/useArticles';
import { usePublishers } from '../../hooks/usePublishers';
import { useTags } from '../../hooks/useTags';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ArticlesList = () => {
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest'); // Default sort by newest
    const [sortOrder, setSortOrder] = useState('desc'); // Default descending

    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const filters = {
        search: searchTerm,
        publisher: selectedPublisher,
        tags: selectedTags
    };

    const {
        data: articles = [],
        isLoading: articlesLoading,
        error: articlesError
    } = useArticles(filters);

    const {
        data: publishers = [],
        isLoading: publishersLoading
    } = usePublishers();

    const {
        data: tags = [],
        isLoading: tagsLoading
    } = useTags();

    // Sort articles based on selected criteria
    const sortedArticles = React.useMemo(() => {
        if (!articles.length) return [];

        const sorted = [...articles].sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'date':
                    aValue = new Date(a.publishedDate || a.createdAt);
                    bValue = new Date(b.publishedDate || b.createdAt);
                    break;
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'views':
                    aValue = a.views || 0;
                    bValue = b.views || 0;
                    break;
                case 'publisher':
                    aValue = a.publisher.toLowerCase();
                    bValue = b.publisher.toLowerCase();
                    break;
                default:
                    aValue = new Date(a.publishedDate || a.createdAt);
                    bValue = new Date(b.publishedDate || b.createdAt);
            }

            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return sorted;
    }, [articles, sortBy, sortOrder]);

    const handleTagToggle = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const clearFilters = () => {
        setSelectedPublisher('');
        setSelectedTags([]);
        setSearchTerm('');
        setSortBy('newest');
        setSortOrder('desc');
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            // Toggle sort order if same sort field is clicked
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort field with default descending order
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const isLoading = articlesLoading || publishersLoading || tagsLoading;
    const error = articlesError;

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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#faf6f0] py-8">
                <div className="container mx-auto px-4">
                    {/* Loading Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
                    </motion.div>

                    {/* Loading Filters */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i}>
                                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
                                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Loading Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <div className="h-48 bg-gray-300 animate-pulse"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                                        <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-[#faf6f0]"
            >
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Articles</h3>
                    <p className="text-gray-600 mb-4">Please try again later</p>
                    <p className="text-sm text-gray-500">{error.message}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#faf6f0] py-8">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Discover Articles
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our collection of curated articles from trusted publishers
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto mt-6 rounded-full"></div>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    variants={filterVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Search Input */}
                        <motion.div variants={filterVariants} className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                🔍 Search by Title
                            </label>
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition-all duration-300"
                            />
                        </motion.div>

                        {/* Publisher Filter */}
                        <motion.div variants={filterVariants}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                📰 Filter by Publisher
                            </label>
                            <select
                                value={selectedPublisher}
                                onChange={(e) => setSelectedPublisher(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition-all duration-300 cursor-pointer"
                                disabled={publishersLoading}
                            >
                                <option value="">All Publishers</option>
                                {publishers.map((publisher) => (
                                    <option key={publisher._id} value={publisher.name}>
                                        {publisher.name}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Sort Options */}
                        <motion.div variants={filterVariants}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                🔄 Sort Articles
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition-all duration-300 cursor-pointer"
                                >
                                    <option value="date">Date</option>
                                    <option value="title">Title</option>
                                    <option value="views">Views</option>
                                    <option value="publisher">Publisher</option>
                                </select>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="px-4 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white rounded-xl hover:from-[#b08d5a] hover:to-[#9c7c4e] transition-all duration-300 font-semibold cursor-pointer flex items-center justify-center min-w-[60px]"
                                    title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tags Filter and Clear Button Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Tags Filter */}
                        <motion.div variants={filterVariants}>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                🏷️ Filter by Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {tagsLoading ? (
                                    <div className="flex space-x-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                                        ))}
                                    </div>
                                ) : (
                                    tags.map((tag, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleTagToggle(tag)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${selectedTags.includes(tag)
                                                ? 'bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                                }`}
                                        >
                                            {tag}
                                        </motion.button>
                                    ))
                                )}
                            </div>
                        </motion.div>

                        {/* Clear Filters Button */}
                        <motion.div variants={filterVariants} className="flex items-end justify-end">
                            <button
                                onClick={clearFilters}
                                className="w-full lg:w-auto bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold cursor-pointer flex items-center justify-center"
                            >
                                🗑️ Clear All Filters
                            </button>
                        </motion.div>
                    </div>

                    {/* Current Sort Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span className="font-semibold">Current Sort:</span>
                            <span className="bg-white px-3 py-1 rounded-full border border-gray-300">
                                {sortBy === 'date' && '📅 Date'}
                                {sortBy === 'title' && '📝 Title'}
                                {sortBy === 'views' && '👁️ Views'}
                                {sortBy === 'publisher' && '📰 Publisher'}
                                <span className="ml-2 font-bold">
                                    ({sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'})
                                </span>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Articles Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <p className="text-gray-600 font-medium">
                        📊 Found <span className="text-[#c99e66] font-bold">{sortedArticles.length}</span> articles
                        {selectedPublisher && ` from ${selectedPublisher}`}
                        {selectedTags.length > 0 && ` with ${selectedTags.length} tags`}
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <AnimatePresence mode="wait">
                    {sortedArticles.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-16 bg-white rounded-2xl shadow-lg"
                        >
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Articles Found</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                We couldn't find any articles matching your criteria. Try adjusting your filters or search term.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white px-6 py-3 rounded-xl hover:from-[#b08d5a] hover:to-[#9c7c4e] transition-all duration-300 font-semibold"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {sortedArticles.map((article) => (
                                <motion.div
                                    key={article._id}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}
                                    className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group relative ${article.isPremium
                                        ? 'border-2 border-orange-400 bg-gradient-to-br from-amber-50/50 to-white'
                                        : 'border border-gray-100'
                                        }`}
                                >
                                    {/* Premium Badge */}
                                    {article.isPremium && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                                                ⭐ Premium
                                            </span>
                                        </div>
                                    )}

                                    {/* Article Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Article Content */}
                                    <div className="p-6">
                                        {/* Publisher */}
                                        <div className="mb-3">
                                            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {article.publisher}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight line-clamp-2 group-hover:text-[#c99e66] transition-colors duration-300">
                                            {article.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                            {article.description}
                                        </p>

                                        {/* Tags */}
                                        {article.tags && article.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="bg-[#f8f5f1] text-[#c99e66] text-xs px-2 py-1 rounded-full border border-[#c99e66]/30"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {article.tags.length > 3 && (
                                                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                                                        +{article.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    👁️ {article.views} views
                                                </span>
                                                {article.publishedDate && (
                                                    <span className="text-xs">
                                                        {new Date(article.publishedDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                to={`/article/${article._id}`}
                                                onClick={() => {
                                                    if (article.isPremium && !user?.premiumTaken) {
                                                        alert('🔒 Premium subscription required to read this article');
                                                        return;
                                                    }
                                                    queryClient.invalidateQueries({ queryKey: ['articles'] });
                                                }}
                                                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform ${article.isPremium && !user?.premiumTaken
                                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white hover:from-[#b08d5a] hover:to-[#9c7c4e] hover:shadow-lg cursor-pointer'
                                                    }`}
                                            >
                                                {article.isPremium && !user?.premiumTaken ? '🔒 Locked' : 'Read →'}
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ArticlesList;