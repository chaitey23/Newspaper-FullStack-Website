import React, { useState, useEffect, useContext } from 'react';

import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            fetchMyArticles();
        }
    }, [user]);

    const fetchMyArticles = async () => {
        try {
            const response = await axiosSecure.get('/my-articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
            toast.error('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800', text: 'Approved' },
            declined: { color: 'bg-red-100 text-red-800', text: 'Declined' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' } // <-- add this

        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    // Premium badge component
    const PremiumBadge = ({ isPremium }) => {
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isPremium
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
                }`}>
                {isPremium ? 'Yes' : 'No'}
            </span>
        );
    };

    // View decline reason
    const handleViewReason = (article) => {
        setSelectedArticle(article);
        setShowDeclineModal(true);
    };

    // Delete article
    const handleDelete = async (articleId) => {
        const result = await Swal.fire({
            title: 'Confirm Deletion',
            text: "Are you sure you want to delete this article? This action cannot be reversed.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#c99e66',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Delete Article',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            setDeleteLoading(articleId);
            try {
                await axiosSecure.delete(`/article/${articleId}`);
                Swal.fire(
                    'Deleted Successfully!',
                    'The article has been removed from your account.',
                    'success'
                );
                setArticles(prev => prev.filter(article => article._id !== articleId));
            } catch (error) {
                console.error('Error deleting article:', error);
                Swal.fire(
                    'Deletion Error',
                    error.response?.data?.message || 'Failed to delete the article. Please try again later.',
                    'error'
                );
            } finally {
                setDeleteLoading(null);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
                            <p className="text-gray-600 mt-2">Manage and track your submitted articles</p>
                        </div>
                        <Link
                            to="/add-article"
                            className="bg-[#c99e66] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b58d55] transition-colors shadow-sm"
                        >
                            + Add New Article
                        </Link>
                    </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {articles.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating your first article.</p>
                            <div className="mt-4">
                                <Link
                                    to="/add-article"
                                    className="inline-flex items-center bg-[#c99e66] text-white px-4 py-2 rounded-md font-medium hover:bg-[#b58d55] transition-colors"
                                >
                                    Create Article
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-[#c99e66]">
                                            SL No
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-[#c99e66]">
                                            Article Title
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-[#c99e66]">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-[#c99e66]">
                                            Premium
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-[#c99e66]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {articles.map((article, index) => (
                                        <tr key={article._id} className="hover:bg-gray-50 transition-colors">
                                            {/* Serial Number */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                {index + 1}
                                            </td>

                                            {/* Article Title */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        <img className="h-12 w-12 rounded-lg object-cover border-2 border-gray-200" src={article.image} alt={article.title} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-gray-900 max-w-xs truncate">
                                                            {article.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500 flex items-center mt-1">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {new Date(article.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <StatusBadge status={article.status} />
                                                    {(article.status === 'declined' || article.status === 'rejected') && article.declineReason && (
                                                        <button
                                                            onClick={() => handleViewReason(article)}
                                                            className="text-[#c99e66] hover:text-[#b58d55] text-sm font-medium underline cursor-pointer"
                                                        >
                                                            View Reason
                                                        </button>
                                                    )}

                                                </div>
                                            </td>

                                            {/* Premium */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <PremiumBadge isPremium={article.isPremium} />
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-3">
                                                    {/* Details Button */}
                                                    <Link
                                                        to={`/my-article/${article._id}`}
                                                        className="text-[#c99e66] hover:text-[#b58d55] font-semibold px-3 py-1 rounded border border-[#c99e66] hover:bg-[#faf7f2] transition-colors"
                                                    >
                                                        Details
                                                    </Link>

                                                    {/* Update Button - Only for pending/declined articles */}
                                                    {(article.status === 'pending' || article.status === 'declined') && (
                                                        <Link
                                                            to={`/edit-article/${article._id}`}
                                                            className="text-green-600 hover:text-green-800 font-semibold px-3 py-1 rounded border border-green-600 hover:bg-green-50 transition-colors"
                                                        >
                                                            Update
                                                        </Link>
                                                    )}

                                                    {/* Delete Button - Only for pending/declined articles */}
                                                    {(article.status === 'pending' || article.status === 'declined') && (
                                                        <button
                                                            onClick={() => handleDelete(article._id)}
                                                            disabled={deleteLoading === article._id}
                                                            className="text-red-600 hover:text-red-800 font-semibold px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                        >
                                                            {deleteLoading === article._id ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    )}

                                                    {/* Message for approved articles */}
                                                    {article.status === 'approved' && (
                                                        <span className="text-gray-500 text-xs italic">
                                                            Read only
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats Summary */}
                {articles.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
                        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-[#c99e66]">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-semibold text-gray-600 truncate">Total Articles</dt>
                                <dd className="mt-1 text-3xl font-bold text-[#c99e66]">{articles.length}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-semibold text-gray-600 truncate">Approved</dt>
                                <dd className="mt-1 text-3xl font-bold text-green-600">
                                    {articles.filter(a => a.status === 'approved').length}
                                </dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-semibold text-gray-600 truncate">Pending</dt>
                                <dd className="mt-1 text-3xl font-bold text-yellow-600">
                                    {articles.filter(a => a.status === 'pending').length}
                                </dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-semibold text-gray-600 truncate">Declined</dt>
                                <dd className="mt-1 text-3xl font-bold text-red-600">
                                    {articles.filter(a => a.status === 'rejected').length}
                                </dd>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Decline Reason Modal */}
            {showDeclineModal && selectedArticle && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Decline Reason</h3>
                            <button
                                onClick={() => setShowDeclineModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-3 font-medium">Article: <span className="text-[#c99e66]">{selectedArticle.title}</span></p>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-800 text-sm leading-relaxed">{selectedArticle.declineReason}</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowDeclineModal(false)}
                                className="bg-[#c99e66] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b58d55] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyArticles;