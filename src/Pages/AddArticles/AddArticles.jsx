import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const AddArticles = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        publisher: '',
        tags: [],
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Fetch publishers from database
    const { data: publishers = [], isLoading: publishersLoading } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/publishers');
            return res.data;
        }
    });

    // Convert publishers to options for react-select
    const publisherOptions = publishers.map(publisher => ({
        value: publisher._id,
        label: publisher.name
    }));

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

    // ImgBB upload
    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) return data.data.url;
            throw new Error('Image upload failed');
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) return toast.error('Please select a valid image file');
        if (file.size > 5 * 1024 * 1024) return toast.error('Image size should be less than 5MB');

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (selectedOptions) => {
        const tags = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
        setFormData(prev => ({ ...prev, tags }));
    };

    const handlePublisherChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, publisher: selectedOption?.value || '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return toast.error('Please login to add articles');

        if (!formData.title || !formData.image || !formData.publisher || formData.tags.length === 0 || !formData.description) {
            return toast.error('Please fill in all fields');
        }

        setLoading(true);
        try {
            const res = await axiosSecure.post('/articles', formData);
            if (res.status === 201) {
                toast.success('Article submitted successfully!', { duration: 3000 });

                setFormData({ title: '', image: '', publisher: '', tags: [], description: '' });

                const fileInput = document.getElementById('image');
                if (fileInput) fileInput.value = '';

                setTimeout(() => navigate('/my-articles'), 100);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit article');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-10 transition-transform hover:shadow-xl hover:-translate-y-1">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Add New Article</h2>
                        <p className="text-gray-600 text-sm sm:text-base">Submit your article for admin approval</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Article Title *</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange}
                                placeholder="Enter article title" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition duration-200" />
                        </div>

                        <div className="relative">
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">Featured Image *</label>
                            <input type="file" id="image" accept="image/*" onChange={handleImageChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f8f5f1] file:text-[#c99e66] hover:file:bg-[#eee2d1] cursor-pointer" />
                            {imageUploading && <p className="mt-2 text-[#c99e66] text-sm font-medium animate-pulse">Uploading image...</p>}
                            {formData.image && !imageUploading && (
                                <div className="relative mt-4 inline-block">
                                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, image: '' })); document.getElementById('image').value = ''; }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition-colors" title="Remove image">✕</button>
                                    <img src={formData.image} alt="Preview" className="mx-auto max-w-xs max-h-40 rounded-lg border-2 border-[#c99e66]/40 shadow-sm" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="publisher" className="block text-sm font-semibold text-gray-700 mb-2">Publisher *</label>
                            <Select
                                id="publisher"
                                options={publisherOptions}
                                value={publisherOptions.find(pub => pub.value === formData.publisher)}
                                onChange={handlePublisherChange}
                                placeholder={publishersLoading ? "Loading publishers..." : "Select publisher"}
                                isSearchable
                                classNamePrefix="react-select"
                            />
                            {publishersLoading && <p className="mt-2 text-gray-500 text-sm">Loading publishers from database...</p>}
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">Tags *</label>
                            <Select id="tags" options={tagOptions} isMulti value={tagOptions.filter(opt => formData.tags.includes(opt.value))} onChange={handleTagsChange} placeholder="Select tags" classNamePrefix="react-select" />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Article Description *</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Write your article content here..." rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c99e66] focus:border-[#c99e66] transition duration-200 resize-vertical" />
                        </div>

                        <button type="submit" disabled={loading || imageUploading || !formData.title || !formData.image || !formData.publisher || formData.tags.length === 0 || !formData.description}
                            className={`w-full bg-[#c99e66] text-white py-3 px-4 rounded-lg font-semibold shadow-md ${loading || imageUploading || !formData.title || !formData.image || !formData.publisher || formData.tags.length === 0 || !formData.description ? 'cursor-not-allowed bg-[#c99e66]/60' : 'hover:bg-[#b3864f] cursor-pointer'} transition-all duration-200`}>
                            {loading ? 'Submitting...' : 'Submit Article'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddArticles;