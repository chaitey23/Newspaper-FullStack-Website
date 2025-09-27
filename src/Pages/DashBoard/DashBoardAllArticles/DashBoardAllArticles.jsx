// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaSpinner, FaExclamationTriangle, FaNewspaper, FaCheck, FaTimes, FaClock, FaCommentAlt } from 'react-icons/fa';
// import Swal from 'sweetalert2';

// const DashBoardAllArticles = () => {
//     const axiosSecure = useAxiosSecure();
//     const [page, setPage] = useState(1);
//     const [search, setSearch] = useState('');
//     const [status, setStatus] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedArticle, setSelectedArticle] = useState(null);
//     const [declineReason, setDeclineReason] = useState('');
//     const limit = 10;

//     const {
//         data: articlesData,
//         isLoading,
//         isError,
//         error,
//         refetch
//     } = useQuery({
//         queryKey: ['admin-articles', page, search, status],
//         queryFn: async () => {
//             const params = new URLSearchParams({
//                 page: page.toString(),
//                 limit: limit.toString(),
//                 ...(search && { search }),
//                 ...(status && { status })
//             });

//             const res = await axiosSecure.get(`/admin/articles?${params}`);
//             return res.data;
//         },
//         retry: 2,
//     });

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setPage(1);
//         refetch();
//     };

//     const handleApprove = async (articleId) => {
//         try {
//             const result = await Swal.fire({
//                 title: `Approve Article?`,
//                 text: `Do you want to approve this article?`,
//                 icon: 'question',
//                 showCancelButton: true,
//                 confirmButtonColor: '#10b981',
//                 cancelButtonColor: '#6b7280',
//                 confirmButtonText: `Yes, approve it!`,
//                 cancelButtonText: 'Cancel'
//             });

//             if (result.isConfirmed) {
//                 const res = await axiosSecure.patch(`/admin/articles/${articleId}/status`, {
//                     status: 'approved'
//                 });

//                 if (res.data.message.includes('updated')) {
//                     Swal.fire('Approved!', 'Article has been approved successfully!', 'success');
//                     refetch();
//                 }
//             }
//         } catch (error) {
//             Swal.fire('Error!', 'Failed to approve article', 'error');
//             console.log(error);
//         }
//     };

//     const handleRejectClick = (article) => {
//         setSelectedArticle(article);
//         setDeclineReason(article.declineReason || '');
//         setIsModalOpen(true);
//     };

//     const handleConfirmReject = async () => {
//         if (!declineReason.trim()) {
//             Swal.fire('Warning!', 'Please provide a reason for rejection', 'warning');
//             return;
//         }

//         try {
//             const res = await axiosSecure.patch(`/admin/articles/${selectedArticle._id}/status`, {
//                 status: 'rejected',
//                 declineReason: declineReason.trim()
//             });

//             if (res.data.message.includes('updated')) {
//                 Swal.fire('Rejected!', 'Article has been rejected with reason', 'success');
//                 setIsModalOpen(false);
//                 setSelectedArticle(null);
//                 setDeclineReason('');
//                 refetch();
//             }
//         } catch (error) {
//             Swal.fire('Error!', 'Failed to reject article', 'error');
//             console.log(error);
//         }
//     };

//     const handleDeleteArticle = async (articleId, title) => {
//         try {
//             const result = await Swal.fire({
//                 title: 'Delete Article?',
//                 text: `Are you sure you want to delete "${title}"?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#ef4444',
//                 cancelButtonColor: '#6b7280',
//                 confirmButtonText: 'Yes, delete it!',
//                 cancelButtonText: 'Cancel'
//             });

//             if (result.isConfirmed) {
//                 const res = await axiosSecure.delete(`/admin/articles/${articleId}`);

//                 if (res.data.message.includes('deleted')) {
//                     Swal.fire('Deleted!', 'Article has been deleted.', 'success');
//                     refetch();
//                 }
//             }
//         } catch (error) {
//             Swal.fire('Error!', 'Failed to delete article', 'error');
//             console.log(error);
//         }
//     };

//     // View decline reason
//     const handleViewReason = (article) => {
//         Swal.fire({
//             title: 'Decline Reason',
//             html: `
//                 <div class="text-left">
//                     <p class="text-gray-600 mb-2"><strong>Article:</strong> ${article.title}</p>
//                     <div class="bg-red-50 border border-red-200 rounded-lg p-4">
//                         <p class="text-red-800">${article.declineReason || 'No reason provided'}</p>
//                     </div>
//                 </div>
//             `,
//             icon: 'info',
//             confirmButtonColor: '#c99e66'
//         });
//     };

//     // Loading State
//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
//                         <FaSpinner className="text-3xl text-white animate-spin" />
//                     </div>
//                     <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Articles</h2>
//                     <p className="text-slate-500">Please wait while we fetch the data...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error State
//     if (isError) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
//                 <div className="text-center max-w-md mx-auto p-6">
//                     <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
//                         <FaExclamationTriangle className="text-3xl text-red-600" />
//                     </div>
//                     <h2 className="text-xl font-semibold text-slate-700 mb-2">Error Loading Articles</h2>
//                     <p className="text-slate-500 mb-4">
//                         {error?.message || "Failed to load articles. Please try again."}
//                     </p>
//                     <button
//                         onClick={() => refetch()}
//                         className="bg-gradient-to-r from-[#c99e66] to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const { articles, total, page: currentPage, totalPages } = articlesData || {};

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <div className="relative inline-block mb-5">
//                         <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50">
//                             <FaNewspaper className="text-2xl text-white" />
//                         </div>
//                         <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
//                             <span className="text-white text-xs font-bold">{total}</span>
//                         </div>
//                     </div>
//                     <h1 className="text-3xl font-semibold text-slate-800 mb-2">Manage Articles</h1>
//                     <p className="text-slate-600 max-w-md mx-auto">Review, approve, and manage all articles</p>
//                 </div>

//                 {/* Search and Filter Section */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {/* Search */}
//                         <div className="md:col-span-2">
//                             <form onSubmit={handleSearch} className="flex gap-2">
//                                 <div className="flex-1 relative">
//                                     <FaSearch className="absolute left-3 top-3 text-slate-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search articles by title..."
//                                         value={search}
//                                         onChange={(e) => setSearch(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent"
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="bg-gradient-to-r from-[#c99e66] to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
//                                 >
//                                     Search
//                                 </button>
//                             </form>
//                         </div>

//                         {/* Status Filter */}
//                         <div className="flex gap-2 items-center">
//                             <FaFilter className="text-slate-400" />
//                             <select
//                                 value={status}
//                                 onChange={(e) => {
//                                     setStatus(e.target.value);
//                                     setPage(1);
//                                 }}
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent"
//                             >
//                                 <option value="">All Status</option>
//                                 <option value="pending">Pending</option>
//                                 <option value="approved">Approved</option>
//                                 <option value="rejected">Rejected</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                     <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-500 text-sm font-medium">Total Articles</p>
//                                 <h3 className="text-2xl font-bold text-slate-800 mt-1">{total}</h3>
//                             </div>
//                             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <FaNewspaper className="text-blue-600 text-lg" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-500 text-sm font-medium">Pending</p>
//                                 <h3 className="text-2xl font-bold text-slate-800 mt-1">
//                                     {articles?.filter(a => a.status === 'pending').length || 0}
//                                 </h3>
//                             </div>
//                             <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//                                 <FaClock className="text-amber-600 text-lg" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-500 text-sm font-medium">Approved</p>
//                                 <h3 className="text-2xl font-bold text-slate-800 mt-1">
//                                     {articles?.filter(a => a.status === 'approved').length || 0}
//                                 </h3>
//                             </div>
//                             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                                 <FaCheck className="text-green-600 text-lg" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-500 text-sm font-medium">Rejected</p>
//                                 <h3 className="text-2xl font-bold text-slate-800 mt-1">
//                                     {articles?.filter(a => a.status === 'rejected').length || 0}
//                                 </h3>
//                             </div>
//                             <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                                 <FaTimes className="text-red-600 text-lg" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Articles Table */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//                     <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-lg flex items-center justify-center">
//                                     <FaNewspaper className="text-white text-sm" />
//                                 </div>
//                                 <div>
//                                     <h2 className="text-lg font-semibold text-slate-800">All Articles</h2>
//                                     <p className="text-slate-500 text-sm">
//                                         Showing {articles?.length || 0} of {total} articles
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="text-sm text-slate-500">
//                                 Page {currentPage} of {totalPages}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="border-b border-slate-200 bg-slate-50/80">
//                                     <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Title</th>
//                                     <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Author</th>
//                                     <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Status</th>
//                                     <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Date</th>
//                                     <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Views</th>
//                                     <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {articles?.map((article) => (
//                                     <tr key={article._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
//                                         <td className="py-4 px-6">
//                                             <div className="max-w-xs">
//                                                 <p className="text-slate-800 font-medium text-sm truncate" title={article.title}>
//                                                     {article.title}
//                                                 </p>
//                                                 <p className="text-slate-400 text-xs truncate">{article.publisher}</p>
//                                             </div>
//                                         </td>
//                                         <td className="py-4 px-6">
//                                             <p className="text-slate-700 text-sm">{article.author}</p>
//                                         </td>
//                                         <td className="py-4 px-6">
//                                             <div className="flex items-center gap-2">
//                                                 <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${article.status === 'approved' ? 'bg-green-100 text-green-800' :
//                                                     article.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                                                         'bg-amber-100 text-amber-800'
//                                                     }`}>
//                                                     {article.status === 'approved' ? <FaCheck /> :
//                                                         article.status === 'rejected' ? <FaTimes /> : <FaClock />}
//                                                     {article.status}
//                                                 </span>
//                                                 {article.status === 'rejected' && article.declineReason && (
//                                                     <button
//                                                         onClick={() => handleViewReason(article)}
//                                                         className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
//                                                         title="View decline reason"
//                                                     >
//                                                         <FaCommentAlt className="text-xs" />
//                                                         Reason
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </td>
//                                         <td className="py-4 px-6">
//                                             <p className="text-slate-600 text-sm">
//                                                 {new Date(article.createdAt).toLocaleDateString()}
//                                             </p>
//                                         </td>
//                                         <td className="py-4 px-6">
//                                             <div className="flex items-center gap-1 text-slate-600 text-sm">
//                                                 <FaEye className="text-slate-400" />
//                                                 {article.views || 0}
//                                             </div>
//                                         </td>
//                                         <td className="py-4 px-6">
//                                             <div className="flex items-center gap-2">
//                                                 <button
//                                                     onClick={() => handleApprove(article._id)}
//                                                     disabled={article.status === 'approved'}
//                                                     className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
//                                                 >
//                                                     <FaCheck /> Approve
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleRejectClick(article)}
//                                                     disabled={article.status === 'rejected'}
//                                                     className="flex items-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
//                                                 >
//                                                     <FaTimes /> Reject
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDeleteArticle(article._id, article.title)}
//                                                     className="flex items-center gap-1 bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
//                                                 >
//                                                     <FaTrash /> Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Empty State */}
//                     {(!articles || articles.length === 0) && (
//                         <div className="text-center py-12">
//                             <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
//                                 <FaNewspaper className="text-2xl text-slate-400" />
//                             </div>
//                             <h3 className="text-base font-medium text-slate-700 mb-1">No articles found</h3>
//                             <p className="text-slate-500 text-sm">
//                                 {search || status ? 'Try changing your search or filter criteria' : 'No articles have been submitted yet'}
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Rejection Modal */}
//                 {isModalOpen && (
//                     <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
//                         <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//                             <div className="p-6 border-b border-slate-200">
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="text-lg font-semibold text-slate-800">Reject Article</h3>
//                                     <button
//                                         onClick={() => setIsModalOpen(false)}
//                                         className="text-slate-400 hover:text-slate-600 transition-colors"
//                                     >
//                                         <FaTimes className="text-lg" />
//                                     </button>
//                                 </div>
//                                 <p className="text-slate-600 text-sm mt-1">
//                                     Article: <span className="font-medium">{selectedArticle?.title}</span>
//                                 </p>
//                             </div>

//                             <div className="p-6">
//                                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                                     Reason for Rejection *
//                                 </label>
//                                 <textarea
//                                     value={declineReason}
//                                     onChange={(e) => setDeclineReason(e.target.value)}
//                                     placeholder="Provide a clear reason why this article is being rejected..."
//                                     className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
//                                     required
//                                 />
//                                 <p className="text-slate-500 text-xs mt-1">
//                                     This reason will be visible to the article author.
//                                 </p>
//                             </div>

//                             <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
//                                 <button
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleConfirmReject}
//                                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
//                                 >
//                                     Confirm Rejection
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DashBoardAllArticles;
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSearch, FaFilter, FaEye, FaTrash, FaSpinner, FaExclamationTriangle, FaNewspaper, FaCheck, FaTimes, FaClock, FaCommentAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DashBoardAllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [declineReason, setDeclineReason] = useState('');
    const limit = 10;

    const {
        data: articlesData,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['admin-articles', page, search, status],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search }),
                ...(status && { status })
            });

            const res = await axiosSecure.get(`/admin/articles?${params}`);
            return res.data;
        },
        retry: 2,
    });

    // Image view function
    const handleViewImage = (article) => {
        Swal.fire({
            title: article.title,
            html: `
                <div class="text-center">
                    <img src="${article.image}" alt="${article.title}" class="max-w-full h-auto rounded-lg mx-auto" style="max-height: 400px;" />
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: 'auto'
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        refetch();
    };

    const handleApprove = async (articleId) => {
        try {
            const result = await Swal.fire({
                title: `Approve Article?`,
                text: `Do you want to approve this article?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10b981',
                cancelButtonColor: '#6b7280',
                confirmButtonText: `Yes, approve it!`,
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/admin/articles/${articleId}/status`, {
                    status: 'approved'
                });

                if (res.data.message.includes('updated')) {
                    Swal.fire('Approved!', 'Article has been approved successfully!', 'success');
                    refetch();
                }
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to approve article', 'error');
            console.log(error);
        }
    };

    const handleRejectClick = (article) => {
        setSelectedArticle(article);
        setDeclineReason(article.declineReason || '');
        setIsModalOpen(true);
    };

    const handleConfirmReject = async () => {
        if (!declineReason.trim()) {
            Swal.fire('Warning!', 'Please provide a reason for rejection', 'warning');
            return;
        }

        try {
            const res = await axiosSecure.patch(`/admin/articles/${selectedArticle._id}/status`, {
                status: 'rejected',
                declineReason: declineReason.trim()
            });

            if (res.data.message.includes('updated')) {
                Swal.fire('Rejected!', 'Article has been rejected with reason', 'success');
                setIsModalOpen(false);
                setSelectedArticle(null);
                setDeclineReason('');
                refetch();
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to reject article', 'error');
            console.log(error);
        }
    };

    const handleDeleteArticle = async (articleId, title) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Article?',
                text: `Are you sure you want to delete "${title}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/admin/articles/${articleId}`);

                if (res.data.message.includes('deleted')) {
                    Swal.fire('Deleted!', 'Article has been deleted.', 'success');
                    refetch();
                }
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to delete article', 'error');
            console.log(error);
        }
    };

    // View decline reason
    const handleViewReason = (article) => {
        Swal.fire({
            title: 'Decline Reason',
            html: `
                <div class="text-left">
                    <p class="text-gray-600 mb-2"><strong>Article:</strong> ${article.title}</p>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p class="text-red-800">${article.declineReason || 'No reason provided'}</p>
                    </div>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#c99e66'
        });
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <FaSpinner className="text-3xl text-white animate-spin" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Articles</h2>
                    <p className="text-slate-500">Please wait while we fetch the data...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
                        <FaExclamationTriangle className="text-3xl text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Error Loading Articles</h2>
                    <p className="text-slate-500 mb-4">
                        {error?.message || "Failed to load articles. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-gradient-to-r from-[#c99e66] to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const { articles, total, page: currentPage, totalPages } = articlesData || {};

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="relative inline-block mb-5">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50">
                            <FaNewspaper className="text-2xl text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{total}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-800 mb-2">Manage Articles</h1>
                    <p className="text-slate-600 max-w-md mx-auto">Review, approve, and manage all articles</p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <div className="flex-1 relative">
                                    <FaSearch className="absolute left-3 top-3 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search articles by title..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#c99e66] to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2 items-center">
                            <FaFilter className="text-slate-400" />
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-lg flex items-center justify-center">
                                    <FaNewspaper className="text-white text-sm" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">All Articles</h2>
                                    <p className="text-slate-500 text-sm">
                                        Showing {articles?.length || 0} of {total} articles
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-slate-500">
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/80">
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Image</th>
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Title</th>
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Author</th>
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Status</th>
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Date</th>
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Views</th>
                                    <th className="py-4 px-6 text-left text-slate-600 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles?.map((article) => (
                                    <tr key={article._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        {/* Image Column */}
                                        <td className="py-4 px-6">
                                            {article.image && (
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-12 h-12 object-cover rounded-lg border border-slate-200 cursor-pointer"
                                                    onClick={() => handleViewImage(article)}
                                                />
                                            )}
                                        </td>

                                        <td className="py-4 px-6">
                                            <div className="max-w-xs">
                                                <p className="text-slate-800 font-medium text-sm truncate" title={article.title}>
                                                    {article.title}
                                                </p>
                                                <p className="text-slate-400 text-xs truncate">{article.publisher}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-slate-700 text-sm">{article.author}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${article.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    article.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-amber-100 text-amber-800'
                                                    }`}>
                                                    {article.status === 'approved' ? <FaCheck /> :
                                                        article.status === 'rejected' ? <FaTimes /> : <FaClock />}
                                                    {article.status}
                                                </span>
                                                {article.status === 'rejected' && article.declineReason && (
                                                    <button
                                                        onClick={() => handleViewReason(article)}
                                                        className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
                                                        title="View decline reason"
                                                    >
                                                        <FaCommentAlt className="text-xs" />
                                                        Reason
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-slate-600 text-sm">
                                                {new Date(article.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                                                <FaEye className="text-slate-400" />
                                                {article.views || 0}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleApprove(article._id)}
                                                    disabled={article.status === 'approved'}
                                                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                                >
                                                    <FaCheck /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleRejectClick(article)}
                                                    disabled={article.status === 'rejected'}
                                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                                >
                                                    <FaTimes /> Reject
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteArticle(article._id, article.title)}
                                                    className="flex items-center gap-1 bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {(!articles || articles.length === 0) && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                                <FaNewspaper className="text-2xl text-slate-400" />
                            </div>
                            <h3 className="text-base font-medium text-slate-700 mb-1">No articles found</h3>
                            <p className="text-slate-500 text-sm">
                                {search || status ? 'Try changing your search or filter criteria' : 'No articles have been submitted yet'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Rejection Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-slate-800">Reject Article</h3>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <FaTimes className="text-lg" />
                                    </button>
                                </div>
                                <p className="text-slate-600 text-sm mt-1">
                                    Article: <span className="font-medium">{selectedArticle?.title}</span>
                                </p>
                            </div>

                            <div className="p-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Reason for Rejection *
                                </label>
                                <textarea
                                    value={declineReason}
                                    onChange={(e) => setDeclineReason(e.target.value)}
                                    placeholder="Provide a clear reason why this article is being rejected..."
                                    className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                    required
                                />
                                <p className="text-slate-500 text-xs mt-1">
                                    This reason will be visible to the article author.
                                </p>
                            </div>

                            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmReject}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Confirm Rejection
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashBoardAllArticles;