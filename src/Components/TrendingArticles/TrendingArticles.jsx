// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Link } from 'react-router-dom';

// const TrendingArticles = () => {
//     const [articles, setArticles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTrendingArticles = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/articles/trending`);
//                 // Ensure we get exactly 6 articles for the slider
//                 const trendingArticles = response.data.slice(0, 6);
//                 setArticles(trendingArticles);
//             } catch (error) {
//                 console.error('Error fetching trending articles:', error);
//                 setError('Failed to load trending articles');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTrendingArticles();
//     }, []);

//     if (loading) {
//         return (
//             <section className="py-16 bg-white">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center mb-12">
//                         <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Trending Now</h2>
//                         <div className="w-20 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto"></div>
//                     </div>

//                     {/* Loading Slider */}
//                     <Swiper
//                         spaceBetween={30}
//                         slidesPerView={3}
//                         className="trending-slider"
//                     >
//                         {[...Array(3)].map((_, i) => (
//                             <SwiperSlide key={i}>
//                                 <div className="animate-pulse">
//                                     <div className="bg-gray-300 h-60 rounded-lg mb-4"></div>
//                                     <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
//                                     <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
//                                     <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
//                                     <div className="h-4 bg-gray-300 rounded w-2/3"></div>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             </section>
//         );
//     }

//     if (error) {
//         return (
//             <section className="py-16 bg-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <p className="text-red-500 text-lg">{error}</p>
//                 </div>
//             </section>
//         );
//     }

//     if (articles.length === 0) {
//         return (
//             <section className="py-16 bg-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <p className="text-gray-500 text-lg">No trending articles available</p>
//                 </div>
//             </section>
//         );
//     }

//     // Different attractive colors for each trending rank
//     const getTrendingBadgeColor = (index) => {
//         const colors = [
//             'bg-gradient-to-r from-red-500 to-orange-500', // 1st - Red/Orange
//             'bg-gradient-to-r from-purple-500 to-pink-500', // 2nd - Purple/Pink
//             'bg-gradient-to-r from-blue-500 to-cyan-500', // 3rd - Blue/Cyan
//             'bg-gradient-to-r from-green-500 to-emerald-500', // 4th - Green/Emerald
//             'bg-gradient-to-r from-indigo-500 to-purple-500', // 5th - Indigo/Purple
//             'bg-gradient-to-r from-rose-500 to-red-500', // 6th - Rose/Red
//         ];
//         return colors[index] || 'bg-gradient-to-r from-[#c99e66] to-[#b08d5a]';
//     };

//     // Different colors for view count badges
//     const getViewCountColor = (views) => {
//         if (views > 1000) return 'bg-gradient-to-r from-red-500 to-pink-600'; // Hot article
//         if (views > 500) return 'bg-gradient-to-r from-orange-500 to-red-500'; // Very popular
//         if (views > 100) return 'bg-gradient-to-r from-blue-500 to-purple-600'; // Popular
//         return 'bg-gradient-to-r from-gray-600 to-gray-700'; // Normal
//     };

//     return (
//         <section className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//                 {/* Section Header */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Trending Now</h2>
//                     <div className="w-20 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto"></div>
//                     <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//                         Discover the most viewed and popular articles in our community
//                     </p>
//                 </div>

//                 {/* Swiper Slider - 3 Slides at a time */}
//                 <div className="relative px-12">
//                     <Swiper
//                         modules={[Navigation, Autoplay, Pagination]}
//                         spaceBetween={30}
//                         slidesPerView={1}
//                         breakpoints={{
//                             640: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 20,
//                             },
//                             1024: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 30,
//                             },
//                         }}
//                         navigation={{
//                             nextEl: '.trending-next',
//                             prevEl: '.trending-prev',
//                         }}
//                         pagination={{
//                             clickable: true,
//                             el: '.trending-pagination',
//                             bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-100 !w-3 !h-3 !mx-1',
//                             bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#c99e66]',
//                         }}
//                         autoplay={{
//                             delay: 4000,
//                             disableOnInteraction: false,
//                         }}
//                         loop={true}
//                         className="trending-slider pb-12"
//                     >
//                         {articles.map((article, index) => (
//                             <SwiperSlide key={article._id}>
//                                 <article className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-100">
//                                     {/* Article Image */}
//                                     <div className="relative overflow-hidden rounded-t-lg flex-shrink-0">
//                                         <img
//                                             src={article.image || '/api/placeholder/400/250'}
//                                             alt={article.title}
//                                             className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
//                                             onError={(e) => {
//                                                 e.target.src = '/api/placeholder/400/250';
//                                             }}
//                                         />
//                                         {/* Trending Badge with Rank - Different colors for each position */}
//                                         <div className="absolute top-4 left-4">
//                                             <span className={`${getTrendingBadgeColor(index)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg`}>
//                                                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                                     <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
//                                                 </svg>
//                                                 #{index + 1} Trending
//                                             </span>
//                                         </div>

//                                         {/* View Count Overlay - Color based on view count */}
//                                         <div className={`absolute bottom-4 right-4 ${getViewCountColor(article.views || 0)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm bg-opacity-90`}>
//                                             <div className="flex items-center space-x-1">
//                                                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                                                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                                                 </svg>
//                                                 <span>{article.views || 0} views</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Article Content */}
//                                     <div className="p-6 flex-1 flex flex-col">
//                                         {/* Category */}
//                                         {article.category && (
//                                             <div className="mb-3">
//                                                 <span className="inline-block bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
//                                                     {article.category}
//                                                 </span>
//                                             </div>
//                                         )}

//                                         {/* Title */}
//                                         <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#c99e66] transition-colors duration-300 line-clamp-2 flex-1">
//                                             {article.title}
//                                         </h3>

//                                         {/* Description */}
//                                         <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
//                                             {article.description}
//                                         </p>

//                                         {/* Meta Information */}
//                                         <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto">
//                                             <div className="flex items-center">
//                                                 <span className="font-medium text-gray-700">{article.publisher}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <span className="flex items-center text-xs">
//                                                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                                                     </svg>
//                                                     {new Date(article.createdAt || Date.now()).toLocaleDateString()}
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         {/* Read More Link */}
//                                         <div className="mt-4">
//                                             <Link
//                                                 to={`/article/${article._id}`}
//                                                 className="inline-flex items-center text-[#c99e66] font-semibold text-sm hover:text-[#b08d5a] transition-colors duration-300 group-hover:underline"
//                                             >
//                                                 Read More
//                                                 <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </article>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>

//                     {/* Custom Navigation Buttons */}
//                     <button className="trending-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-xl flex items-center justify-center hover:bg-[#c99e66] transition-all duration-200 border border-gray-200 hover:border-[#c99e66] group">
//                         <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                     </button>

//                     <button className="trending-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-xl flex items-center justify-center hover:bg-[#c99e66] transition-all duration-200 border border-gray-200 hover:border-[#c99e66] group">
//                         <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                     </button>

//                     {/* Pagination Dots */}
//                     <div className="trending-pagination !relative !mt-8 flex justify-center space-x-2"></div>
//                 </div>

//                 {/* View All Button */}
//                 <div className="text-center mt-12">
//                     <Link
//                         to="/all-articles"
//                         className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white font-semibold rounded-lg hover:from-[#b08d5a] hover:to-[#9c7c4e] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
//                     >
//                         View All Trending Articles
//                         <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg>
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TrendingArticles;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const TrendingArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingArticles = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error before new request
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/articles/trending`);
                // Ensure we get exactly 6 articles for the slider
                const trendingArticles = response.data.slice(0, 6);
                setArticles(trendingArticles);
            } catch (error) {
                console.error('Error fetching trending articles:', error);
                setError('Failed to load trending articles');
                setArticles([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingArticles();
    }, []);

    // Always show loading spinner when loading
    if (loading) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Trending Now</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto"></div>
                    </div>

                    {/* Loading Slider */}
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="trending-slider"
                    >
                        {[...Array(3)].map((_, i) => (
                            <SwiperSlide key={i}>
                                <div className="animate-pulse">
                                    <div className="bg-gray-300 h-60 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
                                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        );
    }

    // Even if there's error or no articles, show the empty state with same design
    if (error || articles.length === 0) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    {/* Section Header - Always show */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Trending Now</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto"></div>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Discover the most viewed and popular articles in our community
                        </p>
                    </div>

                    {/* Empty State with same slider structure */}
                    <div className="relative px-12">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                            navigation={{
                                nextEl: '.trending-next',
                                prevEl: '.trending-prev',
                            }}
                            pagination={{
                                clickable: true,
                                el: '.trending-pagination',
                                bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-100 !w-3 !h-3 !mx-1',
                                bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#c99e66]',
                            }}
                            className="trending-slider pb-12"
                        >
                            {[...Array(3)].map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className="group cursor-pointer bg-white rounded-lg shadow-md border border-gray-100 h-full flex flex-col opacity-50">
                                        {/* Empty Article Image */}
                                        <div className="relative overflow-hidden rounded-t-lg flex-shrink-0">
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Empty Article Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Empty Category */}
                                            <div className="mb-3">
                                                <span className="inline-block bg-gray-300 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                                    Category
                                                </span>
                                            </div>

                                            {/* Empty Title */}
                                            <div className="h-6 bg-gray-300 rounded mb-3"></div>
                                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

                                            {/* Empty Description */}
                                            <div className="space-y-2 mb-4">
                                                <div className="h-4 bg-gray-300 rounded"></div>
                                                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                                            </div>

                                            {/* Empty Meta Information */}
                                            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4 mt-auto">
                                                <div className="h-4 bg-gray-300 rounded w-20"></div>
                                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                                            </div>

                                            {/* Empty Read More Link */}
                                            <div className="mt-4">
                                                <span className="inline-flex items-center text-gray-400 font-semibold text-sm">
                                                    No articles available
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons (disabled) */}
                        <button className="trending-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 rounded-full w-12 h-12 shadow-xl flex items-center justify-center border border-gray-200 cursor-not-allowed" disabled>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button className="trending-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 rounded-full w-12 h-12 shadow-xl flex items-center justify-center border border-gray-200 cursor-not-allowed" disabled>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Pagination Dots */}
                        <div className="trending-pagination !relative !mt-8 flex justify-center space-x-2"></div>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link
                            to="/all-articles"
                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white font-semibold rounded-lg hover:from-[#b08d5a] hover:to-[#9c7c4e] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                            View All Articles
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // Different attractive colors for each trending rank
    const getTrendingBadgeColor = (index) => {
        const colors = [
            'bg-gradient-to-r from-red-500 to-orange-500', // 1st - Red/Orange
            'bg-gradient-to-r from-purple-500 to-pink-500', // 2nd - Purple/Pink
            'bg-gradient-to-r from-blue-500 to-cyan-500', // 3rd - Blue/Cyan
            'bg-gradient-to-r from-green-500 to-emerald-500', // 4th - Green/Emerald
            'bg-gradient-to-r from-indigo-500 to-purple-500', // 5th - Indigo/Purple
            'bg-gradient-to-r from-rose-500 to-red-500', // 6th - Rose/Red
        ];
        return colors[index] || 'bg-gradient-to-r from-[#c99e66] to-[#b08d5a]';
    };

    // Different colors for view count badges
    const getViewCountColor = (views) => {
        if (views > 1000) return 'bg-gradient-to-r from-red-500 to-pink-600'; // Hot article
        if (views > 500) return 'bg-gradient-to-r from-orange-500 to-red-500'; // Very popular
        if (views > 100) return 'bg-gradient-to-r from-blue-500 to-purple-600'; // Popular
        return 'bg-gradient-to-r from-gray-600 to-gray-700'; // Normal
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Trending Now</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Discover the most viewed and popular articles in our community
                    </p>
                </div>

                {/* Swiper Slider - 3 Slides at a time */}
                <div className="relative px-12">
                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        navigation={{
                            nextEl: '.trending-next',
                            prevEl: '.trending-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.trending-pagination',
                            bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-100 !w-3 !h-3 !mx-1',
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#c99e66]',
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="trending-slider pb-12"
                    >
                        {articles.map((article, index) => (
                            <SwiperSlide key={article._id}>
                                <article className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-100">
                                    {/* Article Image */}
                                    <div className="relative overflow-hidden rounded-t-lg flex-shrink-0">
                                        <img
                                            src={article.image || '/api/placeholder/400/250'}
                                            alt={article.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/400/250';
                                            }}
                                        />
                                        {/* Trending Badge with Rank - Different colors for each position */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`${getTrendingBadgeColor(index)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg`}>
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
                                                </svg>
                                                #{index + 1} Trending
                                            </span>
                                        </div>

                                        {/* View Count Overlay - Color based on view count */}
                                        <div className={`absolute bottom-4 right-4 ${getViewCountColor(article.views || 0)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm bg-opacity-90`}>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>{article.views || 0} views</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Category */}
                                        {article.category && (
                                            <div className="mb-3">
                                                <span className="inline-block bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                                    {article.category}
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#c99e66] transition-colors duration-300 line-clamp-2 flex-1">
                                            {article.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                                            {article.description}
                                        </p>

                                        {/* Meta Information */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700">{article.publisher}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="flex items-center text-xs">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    {new Date(article.createdAt || Date.now()).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Read More Link */}
                                        <div className="mt-4">
                                            <Link
                                                to={`/article/${article._id}`}
                                                className="inline-flex items-center text-[#c99e66] font-semibold text-sm hover:text-[#b08d5a] transition-colors duration-300 group-hover:underline"
                                            >
                                                Read More
                                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="trending-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-xl flex items-center justify-center hover:bg-[#c99e66] transition-all duration-200 border border-gray-200 hover:border-[#c99e66] group">
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button className="trending-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-xl flex items-center justify-center hover:bg-[#c99e66] transition-all duration-200 border border-gray-200 hover:border-[#c99e66] group">
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Pagination Dots */}
                    <div className="trending-pagination !relative !mt-8 flex justify-center space-x-2"></div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/all-articles"
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white font-semibold rounded-lg hover:from-[#b08d5a] hover:to-[#9c7c4e] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        View All Trending Articles
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TrendingArticles;