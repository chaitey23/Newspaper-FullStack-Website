// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router';

// const fetchPublishers = async () => {
//     const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/publishers`);
//     return res.data;
// };

// const PublisherSection = () => {
//     const navigate = useNavigate();
//     const { data: publishers, isLoading, isError } = useQuery({
//         queryKey: ['publishers'],
//         queryFn: fetchPublishers
//     });

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.5
//             }
//         }
//     };

//     if (isLoading) return (
//         <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c99e66]"></div>
//         </div>
//     );

//     if (isError) return (
//         <div className="text-center py-12 text-red-600">
//             <p>Failed to load publishers. Please try again later.</p>
//         </div>
//     );

//     return (
//         <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-[#faf6f0]">
//             <div className="container mx-auto px-4">
//                 {/* Section Header */}
//                 <motion.div
//                     className="text-center mb-8 md:mb-12"
//                     initial={{ opacity: 0, y: -20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
//                         Trusted News Publishers
//                     </h2>
//                     <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
//                         We collaborate with the most reputable news organizations worldwide
//                         to bring you diverse and reliable content
//                     </p>
//                 </motion.div>

//                 {/* Publishers Grid */}
//                 <motion.div
//                     className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8"
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                 >
//                     {publishers.map((publisher) => (
//                         <motion.div
//                             key={publisher._id}
//                             variants={itemVariants}
//                             whileHover={{
//                                 scale: 1.03,
//                                 transition: { duration: 0.2 }
//                             }}
//                             className="group"
//                         >
//                             <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-4 lg:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center justify-center">
//                                 {/* Publisher Logo */}
//                                 <div className="mb-2 md:mb-4 p-2 md:p-3 bg-white rounded-md md:rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
//                                     <img
//                                         src={publisher.logo}
//                                         alt={publisher.name}
//                                         className="w-12 h-12 md:w-16 md:h-16 object-contain"
//                                         onError={(e) => {
//                                             e.target.src = 'https://via.placeholder.com/64x64?text=Logo';
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Publisher Name */}
//                                 <h3 className="text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-[#c99e66] transition-colors duration-300">
//                                     {publisher.name}
//                                 </h3>

//                                 {/* Mobile Touch Indicator */}
//                                 <div className="mt-2 md:mt-3 w-6 md:w-8 h-0.5 md:h-1 bg-[#c99e66] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>

//                 {/* Stats Section */}
//                 <motion.div
//                     className="mt-8 md:mt-12 text-center"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-gray-600">
//                         <div className="text-center">
//                             <div className="text-xl md:text-2xl font-bold text-[#c99e66]">{publishers?.length || 0}+</div>
//                             <div className="text-xs md:text-sm">Trusted Partners</div>
//                         </div>
//                         <div className="hidden md:block h-8 w-px bg-gray-300"></div>
//                         <div className="text-center">
//                             <div className="text-xl md:text-2xl font-bold text-[#c99e66]">24/7</div>
//                             <div className="text-xs md:text-sm">News Coverage</div>
//                         </div>
//                         <div className="hidden md:block h-8 w-px bg-gray-300"></div>
//                         <div className="text-center">
//                             <div className="text-xl md:text-2xl font-bold text-[#c99e66]">100%</div>
//                             <div className="text-xs md:text-sm">Verified Sources</div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default PublisherSection;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const fetchPublishers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/publishers`);
    return res.data;
};

const PublisherSection = () => {
    const navigate = useNavigate();
    const { data: publishers, isLoading, isError } = useQuery({
        queryKey: ['publishers'],
        queryFn: fetchPublishers
    });

    // ✅ Click handler function
    const handlePublisherClick = (publisherName) => {
        navigate(`/publisher/${encodeURIComponent(publisherName)}`);
    };

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
                duration: 0.5
            }
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c99e66]"></div>
        </div>
    );

    if (isError) return (
        <div className="text-center py-12 text-red-600">
            <p>Failed to load publishers. Please try again later.</p>
        </div>
    );

    return (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-[#faf6f0]">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                        Trusted News Publishers
                    </h2>
                    <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        We collaborate with the most reputable news organizations worldwide
                        to bring you diverse and reliable content
                    </p>
                </motion.div>

                {/* Publishers Grid - Updated with click functionality */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {publishers.map((publisher) => (
                        <motion.div
                            key={publisher._id}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group cursor-pointer" // ✅ Added cursor pointer
                            onClick={() => handlePublisherClick(publisher.name)} // ✅ Added click handler
                        >
                            <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-4 lg:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center justify-center">
                                {/* Publisher Logo */}
                                <div className="mb-2 md:mb-4 p-2 md:p-3 bg-white rounded-md md:rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <img
                                        src={publisher.logo}
                                        alt={publisher.name}
                                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/64x64?text=Logo';
                                        }}
                                    />
                                </div>

                                {/* Publisher Name */}
                                <h3 className="text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-[#c99e66] transition-colors duration-300">
                                    {publisher.name}
                                </h3>

                                {/* Mobile Touch Indicator */}
                                <div className="mt-2 md:mt-3 w-6 md:w-8 h-0.5 md:h-1 bg-[#c99e66] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Click Hint for Mobile */}
                                <div className="mt-1 md:mt-2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Click to view articles
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="mt-8 md:mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-gray-600">
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-[#c99e66]">{publishers?.length || 0}+</div>
                            <div className="text-xs md:text-sm">Trusted Partners</div>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-gray-300"></div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-[#c99e66]">24/7</div>
                            <div className="text-xs md:text-sm">News Coverage</div>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-gray-300"></div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-[#c99e66]">100%</div>
                            <div className="text-xs md:text-sm">Verified Sources</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PublisherSection;