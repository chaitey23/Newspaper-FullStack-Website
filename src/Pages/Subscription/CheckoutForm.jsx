// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { toast } from 'react-toastify';

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [clientSecret, setClientSecret] = useState("");
//     const location = useLocation();
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     const planValue = location.state?.plan;

//     console.log(' Stripe loaded:', !!stripe);
//     console.log(' Plan received:', planValue);

//     // Plan prices
//     const planPrices = {
//         '1 minute': 0.10,
//         '5 days': 5.00,
//         '10 days': 8.00
//     };

//     //  Step 1: Create payment intent
//     useEffect(() => {
//         if (planValue && stripe) {
//             console.log(' Creating payment intent for:', planValue);

//             axiosSecure.post('/create-payment-intent', { plan: planValue })
//                 .then(res => {
//                     console.log(' Payment intent created');
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch(err => {
//                     console.error(' Error creating payment intent:', err);
//                     setError('Failed to initialize payment');
//                 });
//         }
//     }, [planValue, axiosSecure, stripe]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             console.log(' Stripe not ready');
//             return;
//         }

//         setLoading(true);
//         setError("");

//         const card = elements.getElement(CardElement);
//         if (card == null) {
//             setLoading(false);
//             return;
//         }

//         try {
//             console.log(' Starting payment...');


//             const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: card,
//                 }
//             });

//             if (stripeError) {
//                 console.error(' Stripe error:', stripeError);
//                 setError(stripeError.message);
//                 setLoading(false);
//                 return;
//             }

//             console.log(' Payment successful');

//             if (paymentIntent.status === 'succeeded') {
//                 //  Step 3: Confirm with server
//                 const confirmResponse = await axiosSecure.post('/confirm-payment', {
//                     paymentIntentId: paymentIntent.id
//                 });

//                 console.log('Server confirmed');

//                 if (confirmResponse.data.success) {
//                     toast.success('🎉 Payment successful! Premium activated!');
//                     navigate('/premium-articles');
//                 }
//             }
//         } catch (err) {
//             console.error(' Payment error:', err);
//             setError('Payment failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
//             <div className="max-w-md mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                         Complete Your Payment
//                     </h1>
//                     <p className="text-gray-600">
//                         Plan: <span className="font-semibold text-[#c99e66]">{planValue}</span>
//                     </p>
//                     <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
//                         <p className="text-2xl font-bold text-[#c99e66]">
//                             ${planPrices[planValue]?.toFixed(2) || '0.00'}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Payment Form */}
//                 <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Card Details
//                         </label>
//                         <div className="border border-[#c99e66] rounded-xl px-4 py-3">
//                             <CardElement
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: "16px",
//                                             color: "#2d2d2d",
//                                             '::placeholder': {
//                                                 color: "#a1a1a1",
//                                             },
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={!stripe || !clientSecret || loading}
//                         className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#c99e66] to-[#b58d5a] text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {loading ? 'Processing...' : `Pay $${planPrices[planValue]?.toFixed(2)}`}
//                     </button>

//                     {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
//                 </form>


//             </div>
//         </div>
//     );
// };

// export default CheckoutForm;
