import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const SubscriptionModal = ({ show, onClose }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        }
    }, [show]);

    const handleSubscribeClick = () => {
        navigate('/subscription');
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    if (!show && !isVisible) return null;

    return (
        <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className={`bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'
                }`}>
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-light"
                    onClick={handleClose}
                >
                    ×
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Stay Updated!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Subscribe to our newsletter to get the latest news and updates delivered to your inbox.
                    </p>
                    <button
                        className="bg-[#c99e66] text-white font-medium py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 cursor-pointer"
                        onClick={handleSubscribeClick}
                    >
                        Subscribe Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;