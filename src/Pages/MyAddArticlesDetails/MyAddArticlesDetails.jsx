import React, { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

const MyAddArticlesDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && id) {
            fetchArticleDetails();
        }
    }, [user, id]);

    const fetchArticleDetails = async () => {
        try {
            const response = await axiosSecure.get(`/my-article/${id}`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article details:', error);
            toast.error('Failed to load article details');
        } finally {
            setLoading(false);
        }
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            pending: {
                color: 'bg-amber-50 text-amber-800 border-amber-200',
                icon: '⏳',
                text: 'Under Review'
            },
            approved: {
                color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                icon: '✅',
                text: 'Published'
            },
            declined: {
                color: 'bg-red-50 text-red-800 border-red-200',
                icon: '❌',
                text: 'Declined'
            }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <div className={`inline-flex items-center px-4 py-2 rounded-full border ${config.color}`}>
                <span className="mr-2">{config.icon}</span>
                <span className="text-sm font-medium">{config.text}</span>
            </div>
        );
    };

    // Premium badge component
    const PremiumBadge = ({ isPremium }) => {
        return (
            <div className={`inline-flex items-center px-4 py-2 rounded-full border ${isPremium
                ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-800 border-purple-200'
                : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                <span className="mr-2">{isPremium ? '⭐' : '📄'}</span>
                <span className="text-sm font-medium">
                    {isPremium ? 'Premium Content' : 'Standard Article'}
                </span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c99e66] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading article details...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📄</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
                    <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or you don't have permission to view it.</p>
                    <Link
                        to="/my-articles"
                        className="inline-flex items-center px-6 py-3 bg-[#c99e66] text-white rounded-lg font-medium hover:bg-[#b88d55] transition-colors"
                    >
                        ← Back to My Articles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <Link
                        to="/my-articles"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium mb-6"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to My Articles
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Article Details</h1>
                            <p className="text-gray-600 mt-2">Manage and view your article information</p>
                        </div>
                        <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
                            <StatusBadge status={article.status} />
                            <PremiumBadge isPremium={article.isPremium} />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Article Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Article Image */}
                            <div className="relative h-80 bg-gray-100">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Article Header */}
                            <div className="p-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {article.title}
                                </h1>

                                <div className="flex items-center text-gray-600 mb-6">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                                        {article.publisher}
                                    </span>
                                    <span className="mx-3">•</span>
                                    <span>{article.views || 0} views</span>
                                    <span className="mx-3">•</span>
                                    <span>
                                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {article.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                {article.tags && article.tags.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {article.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Admin Feedback Section */}
                        {article.status === 'declined' && article.declineReason && (
                            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-red-800 mb-2">Admin Feedback</h3>
                                        <p className="text-red-700 leading-relaxed">{article.declineReason}</p>
                                        <div className="mt-4">
                                            <Link
                                                to={`/edit-article/${article._id}`}
                                                className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit Article
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Article Stats */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Status</span>
                                    <StatusBadge status={article.status} />
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Content Type</span>
                                    <PremiumBadge isPremium={article.isPremium} />
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Total Views</span>
                                    <span className="font-semibold text-gray-900">{article.views || 0}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Created</span>
                                    <span className="font-semibold text-gray-900">
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Last Updated</span>
                                    <span className="font-semibold text-gray-900">
                                        {new Date(article.updatedAt || article.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                {(article.status === 'pending' || article.status === 'declined') && (
                                    <Link
                                        to={`/edit-article/${article._id}`}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Article
                                    </Link>
                                )}

                                {article.status === 'approved' && (
                                    <Link
                                        to={`/articles/${article._id}`}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Public Page
                                    </Link>
                                )}

                                <Link
                                    to="/add-article"
                                    className="w-full flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Article
                                </Link>

                                <Link
                                    to="/my-articles"
                                    className="w-full flex items-center justify-center px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    All Articles
                                </Link>
                            </div>
                        </div>

                        {/* Status Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
                            <div className="text-sm text-gray-600 leading-relaxed">
                                {article.status === 'pending' && (
                                    <p>Your article is currently under review by our editorial team. This process usually takes 24-48 hours.</p>
                                )}
                                {article.status === 'approved' && (
                                    <p>Your article has been approved and is now live on our platform. Thank you for your contribution!</p>
                                )}
                                {article.status === 'declined' && (
                                    <p>Please review the admin feedback and make necessary changes to resubmit your article.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAddArticlesDetails;