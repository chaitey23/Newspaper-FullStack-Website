import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import UsePageTitle from '../../hooks/UsePageTitle/UsePageTitle';

const SocialLogin = () => {
    UsePageTitle("SocialLogin")
    const { googleSignIn, setLoading } = useContext(AuthContext);
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(async (result) => {
                console.log('Google user:', result.user);
                toast.success("Google Login successful! Welcome to NewsPortal.");
                const userData = {
                    uid: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL || ''
                };

                try {
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userData);
                    console.log('Google user saved in MongoDB');
                } catch (err) {
                    console.error('Failed to save Google user in MongoDB', err);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Google Login Failed");
                setLoading(false)
            });
    };
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with Google</span>
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                    <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                        <path fill="#4285F4" d="M533.5 278.4c0-17.5-1.4-34.4-4-50.8H272v95.9h146.9c-6.3 33.6-25.3 62.2-53.9 81.4v67.5h87c50.7-46.7 81.5-115.5 81.5-193.9z" />
                        <path fill="#34A853" d="M272 544.3c72.6 0 133.6-24 178.1-65.1l-87-67.5c-24.2 16.3-55 25.9-91.1 25.9-69.9 0-129.3-47.2-150.5-110.3h-89.3v69.3c44.3 87.1 134.3 148.7 239.8 148.7z" />
                        <path fill="#FBBC05" d="M121.4 330.3c-10.6-31.8-10.6-66.7 0-98.5v-69.3h-89.3c-38.7 75.5-38.7 164.1 0 239.6l89.3-71.8z" />
                        <path fill="#EA4335" d="M272 107.7c37.9 0 71.9 13 98.6 34.1l73.9-73.9C404.3 24.5 345.3 0 272 0 166.5 0 76.5 61.6 32.2 148.7l89.3 69.3c21.2-63.1 80.6-110.3 150.5-110.3z" />
                    </svg>
                    <span className="ml-2">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
