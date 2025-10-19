import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import UsePageTitle from '../../hooks/UsePageTitle/UsePageTitle';

const SubscriptionSection = () => {
    UsePageTitle("SubscriptionSection")
    const navigate = useNavigate();

    const handleSubscribe = (planType) => {
        navigate(`/subscription?plan=${planType}`);
    };

    // Animation variants (same as before)
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

    // ✅ CORRECTED PLANS FOR NEWSPAPER WEBSITE
    const plans = [
        {
            id: 'basic',
            title: 'Basic Reader',
            price: '$4.99',
            period: 'month',
            popular: false,
            features: [
                'Access to all free articles',
                'Limited premium articles (5/month)',
                'Basic search functionality',
                'Email newsletter subscription',
                'Ad-supported experience'
            ],
            buttonText: 'Start Reading',
            note: 'Perfect for casual readers'
        },
        {
            id: 'premium',
            title: 'Premium Subscriber',
            price: '$9.99',
            period: 'month',
            popular: true,
            features: [
                'Unlimited premium articles',
                'Ad-free reading experience',
                'Advanced search filters',
                'Download articles for offline',
                'Early access to exclusive content',
                'Priority customer support'
            ],
            buttonText: 'Go Premium',
            note: 'Most popular choice'
        },
        {
            id: 'family',
            title: 'Family Plan',
            price: '$14.99',
            period: 'month',
            popular: false,
            features: [
                'Up to 5 family members',
                'All Premium features',
                'Individual reading profiles',
                'Parental controls',
                'Family content sharing',
                'Dedicated family support'
            ],
            buttonText: 'Family Access',
            note: 'Share with your household'
        }
    ];

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div className="bg-gradient-to-br from-gray-50 to-[#faf6f0] py-16 px-4 sm:px-6 lg:px-8">
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
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="relative"
                    >
                        <div className={`relative rounded-2xl transition-all duration-300 overflow-hidden h-full flex flex-col ${plan.popular
                            ? 'bg-gradient-to-b from-[#c99e66] to-[#b08d5a] border-2 border-[#c99e66] shadow-2xl shadow-[#c99e66]/20'
                            : 'bg-white border border-gray-200 shadow-xl'
                            }`}>

                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <span className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8 flex-1 flex flex-col">
                                {/* Plan Title */}
                                <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {plan.title}
                                </h3>

                                {/* Price */}
                                <div className={`mb-6 ${plan.popular ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    <span className="text-4xl font-bold">
                                        {plan.price}
                                    </span>
                                    <span className="text-lg opacity-80">/{plan.period}</span>
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
                                    onClick={() => handleSubscribe(plan.id)}
                                    className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 ${plan.popular
                                        ? 'bg-white text-[#c99e66] hover:shadow-lg hover:shadow-white/20'
                                        : 'bg-[#c99e66] text-white hover:bg-[#b08d5a] hover:shadow-lg hover:shadow-[#c99e66]/20 cursor-pointer'
                                        }`}
                                >
                                    {plan.buttonText}
                                </motion.button>

                                {/* Note */}
                                <p className={`mt-4 text-center text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'
                                    }`}>
                                    {plan.note}
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
                    All plans include access to our complete article catalog. Cancel anytime.
                </p>
            </motion.div>
        </div>
    );
};

export default SubscriptionSection;