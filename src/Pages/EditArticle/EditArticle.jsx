// import React from 'react';

// const EditArticle = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default EditArticle;
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams, useNavigate } from 'react-router-dom';

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [formData, setFormData] = useState({
        title: '',
        image: null,
        publisher: '',
        tags: [],
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    // Static options
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
    const publisherOptions = [
        { value: 'prothom-alo', label: 'Prothom Alo' },
        { value: 'jugantor', label: 'Jugantor' },
        { value: 'ittefaq', label: 'Ittefaq' },
        { value: 'kalerkontho', label: 'Kaler Kantho' },
        { value: 'bd-news', label: 'BD News' },
        { value: 'daily-star', label: 'The Daily Star' }
    ];

    // Fetch article details
    useEffect(() => {
        const fetchArticle = async () => {
            if (!user) return;
            try {
                const response = await axiosSecure.get(`/my-article/${id}`);
                const article = response.data;
                setFormData({
                    title: article.title,
                    image: article.image,
                    publisher: article.publisher,
                    tags: article.tags || [],
                    description: article.description
                });
            } catch (error) {
                console.error('Failed to fetch article:', error);
                toast.error('Failed to load article data');
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id, user]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (selectedOptions) => {
        const tags = selectedOptions ? selectedOptions.map(o => o.value) : [];
        setFormData(prev => ({ ...prev, tags }));
    };

    const handlePublisherChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, publisher: selectedOption?.value || '' }));
    };

    // Image upload function (reuse from AddArticles)
    const uploadImageToImgBB = async (imageFile) => {
        const data = new FormData();
        data.append('image', imageFile);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
            method: 'POST',
            body: data
        });
        const result = await res.json();
        if (result.success) return result.data.url;
        throw new Error('Image upload failed');
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be <5MB');
            return;
        }
        setImageUploading(true);
        try {
            const url = await uploadImageToImgBB(file);
            setFormData(prev => ({ ...prev, image: url }));
            toast.success('Image uploaded successfully!');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setImageUploading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.image || !formData.publisher || formData.tags.length === 0 || !formData.description) {
            toast.error('Please fill in all fields');
            return;
        }

        setSubmitting(true);
        try {
            await axiosSecure.put(`/articles/${id}`, formData);
            toast.success('Article updated successfully!');
            navigate('/my-articles');
        } catch (error) {
            console.error('Failed to update article:', error);
            toast.error(error.response?.data?.message || 'Failed to update article');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">Edit Article</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                        {formData.image && (
                            <img src={formData.image} alt="Preview" className="mt-2 max-h-40 rounded-lg" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Publisher *</label>
                        <Select
                            options={publisherOptions}
                            value={publisherOptions.find(p => p.value === formData.publisher)}
                            onChange={handlePublisherChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags *</label>
                        <Select
                            options={tagOptions}
                            isMulti
                            value={tagOptions.filter(o => formData.tags.includes(o.value))}
                            onChange={handleTagsChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 border rounded-lg"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || imageUploading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {submitting ? 'Updating...' : 'Update Article'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditArticle;
