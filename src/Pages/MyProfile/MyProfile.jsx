import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const MyProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage('');

        try {
            await updateUser({ displayName, photoURL });
            setMessage('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Error updating profile. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                <p className="text-gray-600">Manage your account information and preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    {/* Profile Picture Section */}
                    <div className="lg:col-span-1 flex flex-col items-center space-y-6">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-4 border-white shadow-lg">
                                {photoURL ? (
                                    <img
                                        src={photoURL}
                                        alt={displayName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#c99e66] to-[#b58c58]">
                                        <span className="text-4xl font-semibold text-white">
                                            {displayName?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900">{displayName || 'User'}</h3>
                            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                        </div>

                        {/* Account Status Badge */}
                        <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user?.premiumTaken
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                                }`}>
                                {user?.premiumTaken ? 'Premium' : 'Free'} Plan
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                {user?.role || 'User'}
                            </span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your display name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Photo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition-all duration-200"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Enter a direct link to your profile image
                                    </p>
                                </div>

                                {/* Account Information */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <h4 className="font-medium text-gray-900">Account Information</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Email Address</p>
                                            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Account Role</p>
                                            <p className="text-sm font-medium text-gray-900">{user?.role || 'User'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Subscription</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {user?.premiumTaken ? 'Premium' : 'Free'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Member Since</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-[#c99e66] to-[#b58c58] text-white font-medium rounded-lg transition-all duration-200 ${updating
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:from-[#b58c58] hover:to-[#a57a4a] hover:shadow-lg transform hover:-translate-y-0.5'
                                        }`}
                                >
                                    {updating ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating Profile...
                                        </span>
                                    ) : (
                                        'Update Profile'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => {
                                        setDisplayName(user?.displayName || '');
                                        setPhotoURL(user?.photoURL || '');
                                        setMessage('');
                                    }}
                                >
                                    Reset Changes
                                </button>
                            </div>

                            {/* Message */}
                            {message && (
                                <div className={`p-4 rounded-lg ${message.includes('Error')
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-green-50 text-green-700 border border-green-200'
                                    }`}>
                                    <div className="flex items-center">
                                        {message.includes('Error') ? (
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {message}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;