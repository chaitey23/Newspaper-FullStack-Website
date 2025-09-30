// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { toast } from 'react-toastify';
// import { motion } from 'framer-motion';

// const Subscription = () => {
//     const [selectedPlan, setSelectedPlan] = useState('');
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     const plans = [
//         {
//             value: '1 minute',
//             label: '1 Minute Trial',
//             price: '$0.01',
//             originalPrice: '$9.99',
//             popular: false,
//             features: [
//                 'Full access to premium articles',
//                 'Ad-free experience',
//                 'Priority support',
//                 'Cancel anytime'
//             ],
//             badge: 'TEST'
//         },
//         {
//             value: '5 days',
//             label: 'Weekly Plan',
//             price: '$5.00',
//             originalPrice: '$12.99',
//             popular: true,
//             features: [
//                 'All premium features',
//                 'Download articles offline',
//                 'Exclusive content access',
//                 'Priority customer support',
//                 'Ad-free browsing'
//             ],
//             badge: 'MOST POPULAR'
//         },
//         {
//             value: '10 days',
//             label: 'Pro Plan',
//             price: '$8.00',
//             originalPrice: '$19.99',
//             popular: false,
//             features: [
//                 'Everything in Weekly Plan',
//                 'Early access to new features',
//                 'Dedicated account manager',
//                 'Advanced analytics',
//                 'Custom reading lists',
//                 'Multi-device sync'
//             ],
//             badge: 'BEST VALUE'
//         }
//     ];

//     const handleSubscribe = async () => {
//         if (!selectedPlan) {
//             toast.error('Please select a subscription plan');
//             return;
//         }

//         try {
//             const response = await axiosSecure.post('/subscribe', {
//                 plan: selectedPlan
//             });

//             if (response.data.success) {
//                 toast.success('🎉 Subscription activated successfully! Welcome to Premium!');
//                 navigate('/premium-articles');
//             }
//         } catch (error) {
//             toast.error('❌ Subscription failed. Please try again.');
//             console.error(error);
//         }
//     };

//     const selectedPlanData = plans.find(plan => plan.value === selectedPlan);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="text-center mb-16"
//                 >
//                     <h1 className="text-5xl font-bold text-gray-900 mb-4">
//                         Upgrade Your Reading Experience
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                         Unlock exclusive content, ad-free browsing, and premium features
//                         designed for serious readers.
//                     </p>
//                 </motion.div>

//                 {/* Plans Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//                     {plans.map((plan, index) => (
//                         <motion.div
//                             key={plan.value}
//                             initial={{ opacity: 0, y: 50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: index * 0.2 }}
//                             className={`relative rounded-2xl transition-all duration-300 ${selectedPlan === plan.value
//                                 ? 'ring-4 ring-blue-500 transform scale-105'
//                                 : 'ring-1 ring-gray-200'
//                                 } ${plan.popular
//                                     ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl'
//                                     : 'bg-white text-gray-900 shadow-lg'
//                                 }`}
//                         >
//                             {/* Popular Badge */}
//                             {plan.badge && (
//                                 <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.popular
//                                     ? 'bg-yellow-400 text-blue-900'
//                                     : plan.value === '1 minute'
//                                         ? 'bg-green-500 text-white'
//                                         : 'bg-purple-500 text-white'
//                                     } px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide`}>
//                                     {plan.badge}
//                                 </div>
//                             )}

//                             <div className="p-8">
//                                 {/* Plan Header */}
//                                 <div className="text-center mb-6">
//                                     <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'
//                                         }`}>
//                                         {plan.label}
//                                     </h3>
//                                     <div className="flex items-center justify-center gap-2 mb-2">
//                                         <span className="text-4xl font-bold">{plan.price}</span>
//                                         {plan.originalPrice && (
//                                             <span className={`text-lg line-through ${plan.popular ? 'text-blue-200' : 'text-gray-400'
//                                                 }`}>
//                                                 {plan.originalPrice}
//                                             </span>
//                                         )}
//                                     </div>
//                                     <p className={`text-sm ${plan.popular ? 'text-blue-200' : 'text-gray-500'
//                                         }`}>
//                                         One-time payment • No auto-renewal
//                                     </p>
//                                 </div>

//                                 {/* Features List */}
//                                 <ul className="space-y-3 mb-8">
//                                     {plan.features.map((feature, featureIndex) => (
//                                         <li key={featureIndex} className="flex items-start">
//                                             <svg
//                                                 className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${plan.popular ? 'text-yellow-400' : 'text-green-500'
//                                                     }`}
//                                                 fill="currentColor"
//                                                 viewBox="0 0 20 20"
//                                             >
//                                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                             </svg>
//                                             <span className={plan.popular ? 'text-blue-50' : 'text-gray-700'}>
//                                                 {feature}
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 {/* Select Button */}
//                                 <button
//                                     onClick={() => setSelectedPlan(plan.value)}
//                                     className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${selectedPlan === plan.value
//                                         ? 'bg-green-600 text-white shadow-lg'
//                                         : plan.popular
//                                             ? 'bg-white text-blue-600 hover:bg-blue-50'
//                                             : 'bg-blue-600 text-white hover:bg-blue-700'
//                                         }`}
//                                 >
//                                     {selectedPlan === plan.value ? '✓ Selected' : 'Select Plan'}
//                                 </button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Selected Plan Summary & Subscribe Button */}
//                 {selectedPlan && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-500"
//                     >
//                         <div className="flex flex-col lg:flex-row items-center justify-between">
//                             <div className="text-center lg:text-left mb-4 lg:mb-0">
//                                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                                     Ready to Upgrade?
//                                 </h3>
//                                 <p className="text-gray-600">
//                                     You selected: <span className="font-semibold text-blue-600">
//                                         {selectedPlanData?.label} - {selectedPlanData?.price}
//                                     </span>
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={handleSubscribe}
//                                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
//                             >
//                                 🚀 Get Premium Access Now
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Trust Indicators */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.8 }}
//                     className="text-center mt-12"
//                 >
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
//                         <div className="flex flex-col items-center">
//                             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
//                                 <span className="text-blue-600 text-xl">🔒</span>
//                             </div>
//                             <h4 className="font-semibold mb-1">Secure Payment</h4>
//                             <p className="text-sm">Your payment information is protected</p>
//                         </div>
//                         <div className="flex flex-col items-center">
//                             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
//                                 <span className="text-blue-600 text-xl">↶</span>
//                             </div>
//                             <h4 className="font-semibold mb-1">No Auto-Renewal</h4>
//                             <p className="text-sm">One-time payment, no surprises</p>
//                         </div>
//                         <div className="flex flex-col items-center">
//                             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
//                                 <span className="text-blue-600 text-xl">💬</span>
//                             </div>
//                             <h4 className="font-semibold mb-1">24/7 Support</h4>
//                             <p className="text-sm">Help whenever you need it</p>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default Subscription;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const plans = [
        {
            value: '1 minute',
            label: '1 Minute Trial',
            price: '$0.01',
            originalPrice: '$9.99',
            popular: false,
            features: [
                'Full access to premium articles',
                'Ad-free experience',
                'Priority support',
                'Cancel anytime'
            ],
            badge: 'TEST'
        },
        {
            value: '5 days',
            label: 'Weekly Plan',
            price: '$5.00',
            originalPrice: '$12.99',
            popular: true,
            features: [
                'All premium features',
                'Download articles offline',
                'Exclusive content access',
                'Priority customer support',
                'Ad-free browsing'
            ],
            badge: 'MOST POPULAR'
        },
        {
            value: '10 days',
            label: 'Pro Plan',
            price: '$8.00',
            originalPrice: '$19.99',
            popular: false,
            features: [
                'Everything in Weekly Plan',
                'Early access to new features',
                'Dedicated account manager',
                'Advanced analytics',
                'Custom reading lists',
                'Multi-device sync'
            ],
            badge: 'BEST VALUE'
        }
    ];

    const handleSubscribe = async () => {
        if (!selectedPlan) {
            toast.error('Please select a subscription plan');
            return;
        }

        try {
            const response = await axiosSecure.post('/subscribe', {
                plan: selectedPlan
            });

            if (response.data.success) {
                toast.success('🎉 Subscription activated successfully! Welcome to Premium!');
                navigate('/premium-articles');
            }
        } catch (error) {
            toast.error('❌ Subscription failed. Please try again.');
            console.error(error);
        }
    };

    const selectedPlanData = plans.find(plan => plan.value === selectedPlan);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Upgrade Your Reading Experience
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Unlock exclusive content, ad-free browsing, and premium features
                        designed for serious readers.
                    </p>
                </motion.div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.value}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative rounded-2xl transition-all duration-300 ${selectedPlan === plan.value
                                ? 'ring-4 ring-[#c99e66] transform scale-105'
                                : 'ring-1 ring-gray-200'
                                } ${plan.popular
                                    ? 'bg-gradient-to-b from-[#c99e66] to-[#b58d5a] text-white shadow-2xl'
                                    : 'bg-white text-gray-900 shadow-lg'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.badge && (
                                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.popular
                                    ? 'bg-amber-200 text-[#8b6b3d]'
                                    : plan.value === '1 minute'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-amber-600 text-white'
                                    } px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide`}>
                                    {plan.badge}
                                </div>
                            )}

                            <div className="p-8">
                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {plan.label}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.originalPrice && (
                                            <span className={`text-lg line-through ${plan.popular ? 'text-amber-200' : 'text-gray-400'
                                                }`}>
                                                {plan.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm ${plan.popular ? 'text-amber-200' : 'text-gray-500'
                                        }`}>
                                        One-time payment • No auto-renewal
                                    </p>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <svg
                                                className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${plan.popular ? 'text-amber-200' : 'text-[#c99e66]'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className={plan.popular ? 'text-amber-50' : 'text-gray-700'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Select Button */}
                                <button
                                    onClick={() => setSelectedPlan(plan.value)}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${selectedPlan === plan.value
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : plan.popular
                                            ? 'bg-white text-[#c99e66] hover:bg-amber-50'
                                            : 'bg-[#c99e66] text-white hover:bg-[#b58d5a]'
                                        }`}
                                >
                                    {selectedPlan === plan.value ? '✓ Selected' : 'Select Plan'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Selected Plan Summary & Subscribe Button */}
                {selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#c99e66]"
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between">
                            <div className="text-center lg:text-left mb-4 lg:mb-0">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Ready to Upgrade?
                                </h3>
                                <p className="text-gray-600">
                                    You selected: <span className="font-semibold text-[#c99e66]">
                                        {selectedPlanData?.label} - {selectedPlanData?.price}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={handleSubscribe}
                                className="bg-gradient-to-r from-[#c99e66] to-[#b58d5a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-[#b58d5a] hover:to-[#a17b48] transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                🚀 Get Premium Access Now
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                <span className="text-[#c99e66] text-xl">🔒</span>
                            </div>
                            <h4 className="font-semibold mb-1">Secure Payment</h4>
                            <p className="text-sm">Your payment information is protected</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                <span className="text-[#c99e66] text-xl">↶</span>
                            </div>
                            <h4 className="font-semibold mb-1">No Auto-Renewal</h4>
                            <p className="text-sm">One-time payment, no surprises</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                <span className="text-[#c99e66] text-xl">💬</span>
                            </div>
                            <h4 className="font-semibold mb-1">24/7 Support</h4>
                            <p className="text-sm">Help whenever you need it</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Subscription;