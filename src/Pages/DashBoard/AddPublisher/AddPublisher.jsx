import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUpload, FaSpinner } from "react-icons/fa";

const AddPublisher = () => {
    const axiosSecure = useAxiosSecure();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        setImageUploading(true);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);

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
                toast.success('Image uploaded successfully!');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Publisher name is required!");
            return;
        }

        // Get the image file
        const fileInput = document.getElementById('logo');
        const file = fileInput.files[0];

        if (!file) {
            toast.error("Please select a logo image!");
            return;
        }

        setLoading(true);

        try {
            // First upload the image
            const imageUrl = await handleImageUpload({ target: { files: [file] } });

            if (!imageUrl) {
                setLoading(false);
                return;
            }

            // Then submit the publisher data
            const res = await axiosSecure.post("/publishers", {
                name,
                logo: imageUrl
            });

            if (res.data.insertedId) {
                toast.success("Publisher added successfully!");
                setName("");
                setPreviewImage("");
                fileInput.value = "";
            }
        } catch (error) {
            console.error('Add publisher error:', error);
            toast.error(error.response?.data?.message || "Failed to add publisher!");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create preview immediately
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center">
                        <FaUpload className="text-2xl text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800">Add New Publisher</h2>
                    <p className="text-slate-600 text-sm mt-1">Add a new publisher to your website</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Publisher Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Publisher Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c99e66] focus:border-transparent"
                            placeholder="Enter publisher name"
                            required
                        />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Publisher Logo *
                        </label>

                        {/* Image Preview */}
                        {previewImage && (
                            <div className="mb-4">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-slate-200 mx-auto"
                                />
                            </div>
                        )}

                        {/* File Input */}
                        <div className="flex items-center justify-center w-full">
                            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${imageUploading ? 'border-amber-400 bg-amber-50' : 'border-slate-300 hover:border-[#c99e66] hover:bg-slate-50'
                                }`}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {imageUploading ? (
                                        <>
                                            <FaSpinner className="w-8 h-8 mb-2 text-amber-600 animate-spin" />
                                            <p className="text-sm text-amber-600">Uploading...</p>
                                        </>
                                    ) : (
                                        <>
                                            <FaUpload className="w-8 h-8 mb-2 text-slate-400" />
                                            <p className="text-sm text-slate-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-slate-400">PNG, JPG, JPEG (Max 5MB)</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="logo"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={imageUploading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || imageUploading}
                        className="w-full bg-gradient-to-r from-[#c99e66] to-amber-600 text-white py-3 rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <FaSpinner className="animate-spin" />
                                Adding Publisher...
                            </span>
                        ) : (
                            'Add Publisher'
                        )}
                    </button>
                </form>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">About Publishers</h4>
                    <p className="text-xs text-slate-600">
                        Publishers represent brands or categories for articles. Each article will be associated with a publisher.
                        The logo will be displayed alongside articles from this publisher.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddPublisher;
