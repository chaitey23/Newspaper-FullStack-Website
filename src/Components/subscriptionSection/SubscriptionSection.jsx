import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import UsePageTitle from '../../hooks/UsePageTitle/UsePageTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SubscriptionSection = () => {
    UsePageTitle("Subscription Plans");
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch plans from MongoDB using TanStack Query
    const {
        data: plans = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ['homepage-plans'],
        queryFn: async () => {
            const response = await axiosSecure.get('/plans');
            return response.data;
        }
    });

    const handleSubscribe = (planValue) => {
        navigate(`/subscription`, { state: { plan: planValue } });
    };

    // Format price for display
    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };

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

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    };

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-[#faf6f0] py-16 px-4 sm:px-6 lg:px-8 mt-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#c99e66] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading subscription plans...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-[#faf6f0] py-16 px-4 sm:px-6 lg:px-8 mt-16">
                <div className="text-center">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load plans</h2>
                    <p className="text-gray-600 mb-4">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-[#faf6f0] py-16 px-4 sm:px-6 lg:px-8 mt-16">
            {/* Header */}
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6 text-gray-900">
                    Choose Your Subscription
                </h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                    Unlock premium journalism and read without limits. Cancel anytime.
                </motion.p>
            </motion.div>

            {/* Plans Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 max-w-7xl mx-auto"
            >
                {plans.map((plan,) => (
                    <motion.div
                        key={plan._id}
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="relative"
                    >
                        <div className={`relative rounded-2xl transition-all duration-300  h-full flex flex-col ${plan.popular
                            ? 'bg-gradient-to-b from-[#c99e66] to-[#b08d5a] border-2 border-[#c99e66] shadow-2xl shadow-[#c99e66]/20'
                            : 'bg-white border border-gray-200 shadow-xl'
                            }`}>

                            {/* Popular Badge */}
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${plan.popular
                                        ? 'bg-amber-200 text-[#8b6b3d]'
                                        : plan.value === '1 minute'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-amber-600 text-white'
                                        }`}>
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="p-8 flex-1 flex flex-col">
                                {/* Plan Title */}
                                <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {plan.label}
                                </h3>

                                {/* Price */}
                                <div className={`mb-6 ${plan.popular ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    <span className="text-4xl font-bold">
                                        {formatPrice(plan.price)}
                                    </span>
                                    {plan.originalPrice && (
                                        <span className={`text-lg line-through ml-2 ${plan.popular ? 'text-amber-200' : 'text-gray-400'
                                            }`}>
                                            {formatPrice(plan.originalPrice)}
                                        </span>
                                    )}
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <svg
                                                className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-[#c99e66]'
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className={
                                                plan.popular ? 'text-white/90' : 'text-gray-600'
                                            }>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSubscribe(plan.value)}
                                    className={`w-full py-4 px-6 rounded-full 
                                        cursor-pointer
                                        font-semibold transition-all duration-300 ${plan.popular
                                            ? 'bg-white text-[#c99e66] hover:shadow-lg hover:shadow-white/20'
                                            : 'bg-[#c99e66] text-white hover:bg-[#b08d5a] hover:shadow-lg hover:shadow-[#c99e66]/20 cursor-pointer'
                                        }`}
                                >
                                    Get Started
                                </motion.button>

                                {/* Duration */}
                                <p className={`mt-4 text-center text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'
                                    }`}>
                                    {plan.value} • One-time payment
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer Note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-16"
            >
                <p className="text-gray-600 text-sm">
                    All plans include access to premium articles. Cancel anytime.
                </p>
            </motion.div>
        </div>
    );
};

export default SubscriptionSection;