import React, { useContext, useState, } from 'react';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddArticles = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        publisher: '',
        tags: [],
        description: ''
    });
    // const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)

    // Static tags for react-select
    const tagOptions = [
        { value: 'technology', label: 'Technology' },
        { value: 'politics', label: 'Politics' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'health', label: 'Health' },
        { value: 'business', label: 'Business' },
        { value: 'science', label: 'Science' },
        { value: 'education', label: 'Education' }
    ];

    // Static publishers - pore dynamic korben
    const publisherOptions = [
        { value: 'prothom-alo', label: 'Prothom Alo' },
        { value: 'jugantor', label: 'Jugantor' },
        { value: 'ittefaq', label: 'Ittefaq' },
        { value: 'kalerkontho', label: 'Kaler Kantho' },
        { value: 'bd-news', label: 'BD News' },
        { value: 'daily-star', label: 'The Daily Star' }
    ];

    // Handle image upload to ImgBB
    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            throw new Error('Failed to upload image: ' + error.message);
        }
    };

    // Handle file input change
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error('Image size should be less than 5MB');
            return;
        }

        setImageUploading(true);
        try {
            const imageUrl = await uploadImageToImgBB(file);
            setFormData(prev => ({ ...prev, image: imageUrl }));
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setImageUploading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle tags change
    const handleTagsChange = (selectedOptions) => {
        const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData(prev => ({ ...prev, tags }));
    };

    // Handle publisher change
    const handlePublisherChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, publisher: selectedOption?.value || '' }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to add articles');
            return;
        }

        // Validation
        if (!formData.title || !formData.image || !formData.publisher || formData.tags.length === 0 || !formData.description) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axiosSecure.post('/articles', formData);

            if (response.status === 201) {
                // Success message with details
                toast.success(
                    <div>
                        <div className="font-semibold">Article Submitted Successfully! ✅</div>
                        <div className="text-sm mt-1">
                            Article ID: {response.data.articleId}
                        </div>
                        <div className="text-sm">
                            Status: <span className="font-medium">Pending Approval</span>
                        </div>
                    </div>,
                    { duration: 5000 }
                );

                // Console e debug information
                console.log('📤 Article Submitted:', {
                    title: formData.title,
                    publisher: formData.publisher,
                    tags: formData.tags,
                    image: formData.image?.substring(0, 50) + '...',
                    articleId: response.data.articleId,
                    timestamp: new Date().toISOString()
                });

                // Reset form
                setFormData({
                    title: '',
                    image: null,
                    publisher: '',
                    tags: [],
                    description: ''
                });

                // Clear file input
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';

                // 3 second por automatically my-articles e redirect korbe
                setTimeout(() => {
                    window.location.href = '/my-articles';
                }, 3000);
            }
        } catch (error) {
            console.error('❌ Error submitting article:', error);
            toast.error(error.response?.data?.message || 'Failed to submit article');
        } finally {
            setLoading(false);
        }
    };
    return (
        // <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        //     <div className="max-w-2xl mx-auto">
        //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        //             {/* Header */}
        //             <div className="text-center mb-8">
        //                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
        //                     Add New Article
        //                 </h2>
        //                 <p className="text-gray-600">
        //                     Submit your article for admin approval
        //                 </p>
        //             </div>

        //             {/* Form */}
        //             <form onSubmit={handleSubmit} className="space-y-6">
        //                 {/* Title Field */}
        //                 <div>
        //                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
        //                         Article Title *
        //                     </label>
        //                     <input
        //                         type="text"
        //                         id="title"
        //                         name="title"
        //                         value={formData.title}
        //                         onChange={handleInputChange}
        //                         placeholder="Enter article title"
        //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        //                         required
        //                     />
        //                 </div>

        //                 {/* Image Upload Field */}
        //                 <div>
        //                     <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
        //                         Featured Image *
        //                     </label>
        //                     <input
        //                         type="file"
        //                         id="image"
        //                         accept="image/*"
        //                         onChange={handleImageChange}
        //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        //                         required
        //                     />
        //                     {imageUploading && (
        //                         <p className="mt-2 text-yellow-600 text-sm">Uploading image...</p>
        //                     )}
        //                     {formData.image && !imageUploading && (
        //                         <div className="mt-4 text-center">
        //                             <img
        //                                 src={formData.image}
        //                                 alt="Preview"
        //                                 className="mx-auto max-w-xs max-h-40 rounded-lg border-2 border-green-200"
        //                             />
        //                             <span className="block mt-2 text-green-600 text-sm font-medium">
        //                                 ✓ Image uploaded successfully
        //                             </span>
        //                         </div>
        //                     )}
        //                 </div>

        //                 {/* Publisher Dropdown */}
        //                 <div>
        //                     <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-2">
        //                         Publisher *
        //                     </label>
        //                     <Select
        //                         id="publisher"
        //                         options={publisherOptions}
        //                         value={publisherOptions.find(pub => pub.value === formData.publisher)}
        //                         onChange={handlePublisherChange}
        //                         placeholder="Select publisher"
        //                         isSearchable
        //                         className="react-select-container"
        //                         classNamePrefix="react-select"
        //                     />
        //                 </div>

        //                 {/* Tags Multi-select */}
        //                 <div>
        //                     <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
        //                         Tags *
        //                     </label>
        //                     <Select
        //                         id="tags"
        //                         options={tagOptions}
        //                         isMulti
        //                         value={tagOptions.filter(option =>
        //                             formData.tags.includes(option.value)
        //                         )}
        //                         onChange={handleTagsChange}
        //                         placeholder="Select tags"
        //                         className="react-select-container"
        //                         classNamePrefix="react-select"
        //                     />
        //                 </div>

        //                 {/* Description Field */}
        //                 <div>
        //                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
        //                         Article Description *
        //                     </label>
        //                     <textarea
        //                         id="description"
        //                         name="description"
        //                         value={formData.description}
        //                         onChange={handleInputChange}
        //                         placeholder="Write your article content here..."
        //                         rows="6"
        //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
        //                         required
        //                     />
        //                 </div>

        //                 {/* Submit Button */}
        //                 <button
        //                     type="submit"
        //                     disabled={loading || imageUploading}
        //                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200"
        //                 >
        //                     {loading ? (
        //                         <span className="flex items-center justify-center">
        //                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        //                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        //                             </svg>
        //                             Submitting...
        //                         </span>
        //                     ) : (
        //                         'Submit Article'
        //                     )}
        //                 </button>
        //             </form>

        //             {/* Additional Info */}
        //             <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        //                 <div className="flex items-start">
        //                     <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        //                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
        //                     </svg>
        //                     <p className="text-blue-700 text-sm">
        //                         Your article will be reviewed by admin before publishing. You'll be notified once it's approved.
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


        // </div>
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-10 transition-transform hover:shadow-xl hover:-translate-y-1">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Add New Article
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Submit your article for admin approval
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Article Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter article title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition duration-200"
                                required
                            />
                        </div>

                        {/* Image Upload Field */}
                        {/* Image Upload Field */}
                        <div className="relative">
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                                Featured Image *
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f8f5f1] file:text-[#c99e66] hover:file:bg-[#eee2d1] cursor-pointer"
                                required={!formData.image}
                            />

                            {imageUploading && (
                                <p className="mt-2 text-[#c99e66] text-sm font-medium animate-pulse">
                                    Uploading image...
                                </p>
                            )}

                            {formData.image && !imageUploading && (
                                <div className="relative mt-4 inline-block">
                                    {/* Cross Icon */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, image: '' });

                                            document.getElementById('image').value = '';
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition-colors"
                                        title="Remove image"
                                    >
                                        ✕
                                    </button>

                                    {/* Image Preview */}
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="mx-auto max-w-xs max-h-40 rounded-lg border-2 border-[#c99e66]/40 shadow-sm"
                                    />
                                    <span className="block mt-2 text-[#c99e66] text-sm font-semibold text-center">
                                        ✓ Image uploaded successfully
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Publisher Dropdown */}
                        <div>
                            <label htmlFor="publisher" className="block text-sm font-semibold text-gray-700 mb-2">
                                Publisher *
                            </label>
                            <Select
                                id="publisher"
                                options={publisherOptions}
                                value={publisherOptions.find(pub => pub.value === formData.publisher)}
                                onChange={handlePublisherChange}
                                placeholder="Select publisher"
                                isSearchable
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        {/* Tags Multi-select */}
                        <div>
                            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                                Tags *
                            </label>
                            <Select
                                id="tags"
                                options={tagOptions}
                                isMulti
                                value={tagOptions.filter(option => formData.tags.includes(option.value))}
                                onChange={handleTagsChange}
                                placeholder="Select tags"
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Article Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Write your article content here..."
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition duration-200 resize-vertical"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || imageUploading}
                            className="w-full bg-[#c99e66] text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-[#b3864f] focus:ring-4 focus:ring-[#c99e66]/30 disabled:bg-[#c99e66]/60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                   1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                'Submit Article'
                            )}
                        </button>
                    </form>

                    {/* Additional Info */}
                    <div className="mt-8 p-5 bg-[#f8f5f1] rounded-lg border border-[#c99e66]/30">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-[#c99e66] mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 
                 0116 0zm-7-4a1 1 0 11-2 
                 0 1 1 0 012 0zM9 9a1 1 0 
                 000 2v3a1 1 0 001 1h1a1 1 
                 0 100-2v-3a1 1 0 
                 00-1-1H9z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <p className="text-gray-700 text-sm">
                                Your article will be reviewed by admin before publishing. You'll be notified once it's approved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AddArticles;