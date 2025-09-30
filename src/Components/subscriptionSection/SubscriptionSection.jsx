import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SubscriptionSection = () => {
    const navigate = useNavigate();

    const handleSubscribe = (planType) => {
        navigate(`/subscription?plan=${planType}`);
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
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        },
        tap: {
            scale: 0.98
        }
    };

    const popularBadgeVariants = {
        hover: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 0.6,
                repeat: Infinity
            }
        }
    };

    const plans = [
        {
            id: 'individual',
            title: 'Premium Individual',
            price: '$9.99',
            period: 'month',
            popular: false,
            features: [
                '1 Premium account',
                'Cancel anytime',
                '1 hour/month of listening time from our audiobooks subscription catalog'
            ],
            buttonText: 'Try free for 1 month',
            note: 'Then $9.99/month'
        },
        {
            id: 'duo',
            title: 'Premium Duo',
            price: '$12.99',
            period: 'month',
            popular: true,
            features: [
                '2 Premium accounts',
                'Cancel anytime',
                '1 hour/month of listening time from our audiobooks subscription catalog (with manager only)'
            ],
            buttonText: 'Get Premium Duo',
            note: 'For users in the same address: $12.99/month'
        },
        {
            id: 'family',
            title: 'Premium Family',
            price: '$15.99',
            period: 'month',
            popular: false,
            features: [
                'Up to 6 Premium or Kids accounts',
                'Block explicit music',
                'Access to Spotify Kids',
                'Cancel anytime',
                '1 hour/month of listening time from our audiobooks subscription catalog (with manager only)'
            ],
            buttonText: 'Get Premium Family',
            note: 'Up to 6 users/month staying at the same address: $15.99/month'
        }
    ];

    // Intersection Observer hook for header
    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div className="bg-gradient-to-br from-gray-50 to-[#faf6f0] mt-20 py-16 px-4 sm:px-6 lg:px-8 text-white">
            {/* Header with animation */}
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6 text-black">
                    Choose Your Plan
                </h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                    Premium features for every type of listener. Cancel anytime.
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
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                        className="relative"
                    >
                        <motion.div
                            variants={cardHoverVariants}
                            className={`relative rounded-2xl transition-all duration-300 overflow-hidden ${plan.popular
                                ? 'bg-gradient-to-b from-purple-900 to-black border-2 border-purple-500 shadow-2xl shadow-purple-500/20'
                                : 'bg-gray-900 border border-gray-700 shadow-xl'
                                }`}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none" />

                            {/* Popular Badge */}
                            {plan.popular && (
                                <motion.div
                                    variants={popularBadgeVariants}
                                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                                >
                                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </span>
                                </motion.div>
                            )}

                            <div className="relative p-8 z-0">
                                {/* Plan Title */}
                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="text-2xl font-bold mb-4"
                                >
                                    {plan.title}
                                </motion.h3>

                                {/* Price */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="mb-6"
                                >
                                    <span className="text-4xl font-bold">
                                        {plan.price}
                                    </span>
                                    <span className="text-lg text-gray-400">/{plan.period}</span>
                                </motion.div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + (index * 0.1) + (featureIndex * 0.1) }}
                                            className="flex items-start"
                                        >
                                            <motion.svg
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                className="h-6 w-6 text-purple-500 mr-3 flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                            <span className="text-gray-300">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { type: "spring", stiffness: 400, damping: 10 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSubscribe(plan.id)}
                                    className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${plan.popular
                                        ? 'bg-white text-black hover:shadow-lg hover:shadow-white/20'
                                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer'
                                        }`}
                                >
                                    {/* Button shine effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <span className="relative z-10">{plan.buttonText}</span>
                                </motion.button>

                                {/* Note */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="mt-4 text-center text-sm text-gray-400"
                                >
                                    {plan.note}
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer Note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-16"
            >
                <p className="text-gray-600 text-sm">
                    All plans include access to our complete audiobook catalog. Cancel anytime.
                </p>
            </motion.div>
        </div>
    );
};

export default SubscriptionSection;