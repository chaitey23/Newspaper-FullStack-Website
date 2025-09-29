import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import axios from 'axios';
import { FaUpload, FaSpinner, FaTimes } from 'react-icons/fa';

const Register = () => {
    const { createUser, loading, user } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const password = watch("password", "");

    useEffect(() => {
        if (!loading && user) {
            navigate(from, { replace: true });
        }
    }, [loading, user, from, navigate]);

    const handleImageUpload = async (file) => {
        if (!file) return null;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return null;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return null;
        }

        setImageUploading(true);

        // Upload to imgBB
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Profile picture uploaded successfully!');
                return data.data.url;
            } else {
                throw new Error(data.error?.message || 'Image upload failed');
            }
        } catch (error) {
            console.error('Image upload error:', error);
            toast.error('Failed to upload image');
            return null;
        } finally {
            setImageUploading(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload image and get URL
        const imageUrl = await handleImageUpload(file);
        if (imageUrl) {
            setValue('photoURL', imageUrl); // Set the value in react-hook-form
        }
    };

    const removeImage = () => {
        setPreviewImage("");
        setValue('photoURL', "");
        // Clear the file input
        const fileInput = document.getElementById('profileImage');
        if (fileInput) fileInput.value = "";
    };

    // const onSubmit = async (data) => {
    //     try {
    //         const result = await createUser(data.email, data.password)

    //         toast.success('Registration successful! Welcome to NewsPortal.');
    //         reset()
    //         setPreviewImage(""); // Clear preview on success
    //         console.log('Registered user:', result.user);

    //         const userData = {
    //             uid: result.user.uid,
    //             name: data.name,
    //             email: result.user.email,
    //             photoURL: data.photoURL || '' // Use the uploaded photo URL
    //         };

    //         await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userData)
    //     } catch (error) {
    //         toast.error('Registration failed. Please try again.');
    //         console.log(error);
    //     }
    // };
    const onSubmit = async (data) => {
        try {
            // Pass user info to createUser function
            const result = await createUser(data.email, data.password, {
                displayName: data.name,
                photoURL: data.photoURL
            });

            toast.success('Registration successful! Welcome to NewsPortal.');
            reset();
            setPreviewImage("");
            console.log('Registered user:', result.user);

            const userData = {
                uid: result.user.uid,
                name: data.name,
                email: result.user.email,
                photoURL: data.photoURL || '',
                role: 'user',
                premiumTaken: null,
                createdAt: new Date()
            };

            await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userData);

        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="mt-2 text-gray-600">Join NewsPortal for the latest updates</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Profile Picture Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Picture
                            </label>

                            {/* Image Preview */}
                            {previewImage && (
                                <div className="mb-4 relative">
                                    <img
                                        src={previewImage}
                                        alt="Profile preview"
                                        className="w-24 h-24 object-cover rounded-full border-2 border-[#c99e66] mx-auto"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-0 right-1/2 transform translate-x-12 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* File Input */}
                            <div className="flex items-center justify-center w-full">
                                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${imageUploading ? 'border-amber-400 bg-amber-50' : 'border-gray-300 hover:border-[#c99e66] hover:bg-gray-50'
                                    }`}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {imageUploading ? (
                                            <>
                                                <FaSpinner className="w-8 h-8 mb-2 text-amber-600 animate-spin" />
                                                <p className="text-sm text-amber-600">Uploading...</p>
                                            </>
                                        ) : (
                                            <>
                                                <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="profileImage"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={imageUploading}
                                    />
                                    <input
                                        type="hidden"
                                        {...register("photoURL")}
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    {...register("name", { required: "Name is required" })}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition duration-200 sm:text-sm"
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition duration-200 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        validate: {
                                            hasCapital: value => /[A-Z]/.test(value) || "Password must contain at least one capital letter",
                                            hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
                                            hasNumber: value => /[0-9]/.test(value) || "Password must contain at least one number"
                                        }
                                    })}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition duration-200 sm:text-sm"
                                    placeholder="Create a secure password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent transition duration-200 sm:text-sm"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    {...register("agreeToTerms", {
                                        required: "You must agree to the terms and conditions"
                                    })}
                                    className="h-4 w-4 text-[#c99e66] focus:ring-[#c99e66] border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agreeToTerms" className="text-gray-700">
                                    I agree to the <a href="#" className="font-medium text-[#c99e66] hover:text-[#b58c58]">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>
                        {errors.agreeToTerms && (
                            <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#c99e66] hover:bg-[#b58c58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c99e66] transition duration-200 cursor-pointer"
                                disabled={loading || imageUploading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <SocialLogin />
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to='/login' className="font-medium text-[#c99e66] hover:text-[#b58c58]">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;