// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { Link } from 'react-router-dom';

// const PremiumArticles = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: articles = [], isLoading, error } = useQuery({
//         queryKey: ['premium-articles'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/articles/premium');
//             return res.data;
//         }
//     });

//     // Loading Spinner Component
//     const LoadingSpinner = () => (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
//             <div className="text-center">
//                 <div className="relative">
//                     {/* Main Spinner */}
//                     <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin mx-auto mb-4 border-t-blue-600"></div>

//                     {/* Outer Pulse Effect */}
//                     <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-blue-100 mx-auto"></div>
//                 </div>
//                 <p className="text-lg font-semibold text-gray-700 mt-4">Loading Premium Articles</p>
//                 <p className="text-sm text-gray-500 mt-2">Please wait while we fetch exclusive content for you</p>
//             </div>
//         </div>
//     );

//     // Skeleton Loading Component
//     const ArticleSkeleton = () => (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 animate-pulse">
//                     <div className="w-full h-48 bg-gray-300"></div>
//                     <div className="p-4">
//                         <div className="h-6 bg-gray-300 rounded mb-3"></div>
//                         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                         <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
//                         <div className="h-10 bg-gray-300 rounded"></div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );

//     if (isLoading) return <ArticleSkeleton />;

//     if (error) return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
//             <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                     </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Articles</h3>
//                 <p className="text-gray-600 mb-4">We encountered an issue while loading premium articles.</p>
//                 <button
//                     onClick={() => window.location.reload()}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//                 >
//                     Try Again
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="text-center mb-12">
//                     <div className="flex justify-center items-center mb-4">
//                         <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
//                             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                         <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                             Premium Articles
//                         </h1>
//                     </div>
//                     <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//                         Exclusive content from top publishers. Unlock insights and stay ahead with premium journalism.
//                     </p>
//                 </div>

//                 {/* Articles Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {articles.map(article => (
//                         <div
//                             key={article._id}
//                             className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
//                         >
//                             {/* Premium Badge */}
//                             <div className="relative">
//                                 <img
//                                     src={article.image}
//                                     alt={article.title}
//                                     className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
//                                 />
//                                 <div className="absolute top-4 right-4">
//                                     <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                                         <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                         </svg>
//                                         PREMIUM
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="p-6">
//                                 <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition duration-200">
//                                     {article.title}
//                                 </h3>
//                                 <div className="flex items-center text-gray-600 mb-3">
//                                     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                         <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                                     </svg>
//                                     <span className="text-sm font-medium">{article.publisher}</span>
//                                 </div>
//                                 <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
//                                     {article.description}
//                                 </p>
//                                 <Link
//                                     to={`/article/${article._id}`}
//                                     className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
//                                 >
//                                     Read Full Article
//                                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                     </svg>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Empty State */}
//                 {articles.length === 0 && (
//                     <div className="text-center py-16">
//                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Premium Articles Available</h3>
//                         <p className="text-gray-500 max-w-md mx-auto">
//                             Check back later for exclusive premium content from our top publishers and contributors.
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PremiumArticles;

import React from 'react';

const PremiumArticles = () => {
    return (
        <div>

        </div>
    );
};

export default PremiumArticles;