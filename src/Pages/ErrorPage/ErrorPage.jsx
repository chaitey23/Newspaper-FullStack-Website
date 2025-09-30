// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ErrorPage = () => {
//     const navigate = useNavigate();

//     const handleGoHome = () => {
//         navigate('/');
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//             <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="p-8 sm:p-10">
//                     {/* Error Graphic */}
//                     <div className="text-center mb-8">
//                         <div className="relative inline-block">
//                             {/* Animated 404 */}
//                             <div className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4">
//                                 <span className="text-indigo-600">4</span>
//                                 <span className="text-blue-500 animate-bounce inline-block">0</span>
//                                 <span className="text-indigo-600">4</span>
//                             </div>

//                             {/* Floating Astronaut Illustration */}
//                             <div className="absolute -top-4 -right-4">
//                                 <div className="relative animate-float">
//                                     <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
//                                         <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
//                                             <div className="w-6 h-4 bg-white rounded-full"></div>
//                                         </div>
//                                     </div>
//                                     <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-800 rounded-full"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Error Content */}
//                     <div className="text-center">
//                         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//                             Page Not Found
//                         </h1>

//                         <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                             Oops! The page you're looking for seems to have drifted off into
//                             digital space. It might have been moved, deleted, or you entered
//                             the wrong URL.
//                         </p>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
//                             <button
//                                 onClick={handleGoBack}
//                                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
//                             >
//                                 ← Go Back
//                             </button>

//                             <button
//                                 onClick={handleGoHome}
//                                 className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
//                             >
//                                 Go Home
//                             </button>
//                         </div>

//                         {/* Help Text */}
//                         <div className="border-t border-gray-200 pt-6">
//                             <p className="text-sm text-gray-500">
//                                 If you believe this is an error, please{' '}
//                                 <a
//                                     href="/contact"
//                                     className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors duration-200"
//                                 >
//                                     contact our support team
//                                 </a>
//                                 .
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Decorative Footer */}
//                 <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4">
//                     <div className="flex justify-center space-x-2">
//                         {[...Array(5)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"
//                                 style={{ animationDelay: `${i * 0.2}s` }}
//                             ></div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ErrorPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 sm:p-10">
                    {/* Error Graphic */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            {/* Animated 404 */}
                            <div className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4">
                                <span className="text-[#c99e66]">4</span>
                                <span className="text-amber-500 animate-bounce inline-block">0</span>
                                <span className="text-[#c99e66]">4</span>
                            </div>

                            {/* Floating Astronaut Illustration */}
                            <div className="absolute -top-4 -right-4">
                                <div className="relative animate-float">
                                    <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                                            <div className="w-6 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-800 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Content */}
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Page Not Found
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Oops! The page you're looking for seems to have drifted off into
                            digital space. It might have been moved, deleted, or you entered
                            the wrong URL.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <button
                                onClick={handleGoBack}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                            >
                                ← Go Back
                            </button>

                            <button
                                onClick={handleGoHome}
                                className="px-6 py-3 bg-[#c99e66] text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
                            >
                                Go Home
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-sm text-gray-500">
                                If you believe this is an error, please{' '}
                                <a
                                    href="/contact"
                                    className="text-[#c99e66] font-semibold hover:text-amber-700 hover:underline transition-colors duration-200"
                                >
                                    contact our support team
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Footer */}
                <div className="bg-[#c99e66] p-4">
                    <div className="flex justify-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;