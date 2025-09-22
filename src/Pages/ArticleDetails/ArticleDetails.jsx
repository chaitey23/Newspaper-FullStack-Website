import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';



const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: article, isLoading, error } = useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            const response = await axiosSecure.get(`/articles/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c99e66] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading article details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600">
                <p>Error loading article. Please try again later.</p>
                <p className="text-sm mt-2">{error.message}</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Article not found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            {article.isPremium && (
                <div className="bg-[#c99e66] text-white px-4 py-2 rounded-full inline-flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    Premium Article
                </div>
            )}


            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
                <div className="flex justify-center items-center space-x-4 text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{article.publisher}</span>
                    <span>{article.views} views</span>
                </div>
            </div>


            <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
            />


            <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {article.description}
                </p>


                <div className="flex flex-wrap gap-2 mt-8">
                    {article.tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;