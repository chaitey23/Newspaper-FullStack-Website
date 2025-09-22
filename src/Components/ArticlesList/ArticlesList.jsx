import React, { useContext, useState, } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useArticles } from '../../hooks/useArticles';
import { usePublishers } from '../../hooks/usePublishers';
import { useTags } from '../../hooks/useTags';
import { Link } from 'react-router';


const ArticlesList = () => {
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const { user } = useContext(AuthContext);

    // Build filters object
    const filters = {
        search: searchTerm,
        publisher: selectedPublisher,
        tags: selectedTags

    };

    // Use TanStack Query hooks
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
    };

    // Combined loading state
    const isLoading = articlesLoading || publishersLoading || tagsLoading;
    const error = articlesError;

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c99e66] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600">
                <p>Error loading articles. Please try again later.</p>
                <p className="text-sm mt-2">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Articles</h2>

            {/* Search and Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search by Title</label>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    {/* Publisher Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Publisher</label>
                        <select
                            value={selectedPublisher}
                            onChange={(e) => setSelectedPublisher(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            disabled={publishersLoading}
                        >
                            <option value="">All Publishers</option>
                            {publishers.map((publisher, index) => (
                                <option key={index} value={publisher}>{publisher}</option>
                            ))}
                        </select>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="flex items-end">
                        <button
                            onClick={clearFilters}
                            className="w-full bg-[#c99e66] text-white py-3 px-4 rounded-md hover:bg-[#c99e66] transition-colors cursor-pointer"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Tags Filter */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {tagsLoading ? (
                            <div className="flex space-x-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                ))}
                            </div>
                        ) : (
                            tags.map((tag, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag)
                                        ? 'bg-[#c99e66] text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            {articles.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">No articles found matching your criteria.</p>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                        <div
                            key={article._id}
                            className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative ${article.isPremium
                                ? 'border-2 border-orange-500 bg-gradient-to-br from-amber-50 to-white'
                                : 'border border-gray-200'
                                }`}
                        >
                            {/* Premium ribbon for premium articles */}
                            {article.isPremium && (
                                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                    <div className="absolute transform rotate-45 bg-orange-500 text-white text-xs py-1 w-24 top-4 -right-8 flex items-center justify-center">
                                        Premium
                                    </div>
                                </div>
                            )}

                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    {article.description.length > 100
                                        ? `${article.description.substring(0, 100)}...`
                                        : article.description
                                    }
                                </p>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {article.publisher}
                                    </span>
                                    {article.isPremium && (
                                        <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                                            </svg>
                                            Premium
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{article.views} views</span>

                                    <Link
                                        to={`/article/${article._id}`}
                                        className={`px-4 py-2 rounded text-white transition-colors ${article.isPremium && !user?.premiumTaken
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#c99e66] hover:bg-[#c99e66]'
                                            }`}
                                        onClick={(e) => {
                                            if (article.isPremium && !user?.premiumTaken) {
                                                e.preventDefault();
                                                alert('Premium subscription required to read this article');
                                            }
                                        }}
                                    >
                                        Read Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticlesList;
