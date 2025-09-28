// src/pages/PublisherArticles.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PublisherArticles = () => {
    const { publisherName } = useParams();

    // Decode the publisher name (URL theke asche)
    const decodedPublisherName = decodeURIComponent(publisherName);

    console.log('Publisher Name from URL:', publisherName);
    console.log('Decoded Publisher Name:', decodedPublisherName);

    const { data: articles, isLoading, error } = useQuery({
        queryKey: ['publisher-articles', decodedPublisherName],
        queryFn: async () => {
            try {
                console.log('Making API call for publisher:', decodedPublisherName);

                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/articles?publisher=${encodeURIComponent(decodedPublisherName)}`
                );

                console.log('API Response:', res.data);
                return res.data;
            } catch (err) {
                console.error('API Error:', err);
                throw err;
            }
        }
    });

    console.log('Articles Data:', articles);
    console.log('Loading:', isLoading);
    console.log('Error:', error);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c99e66]"></div>
                    </div>
                    <p className="text-center text-gray-600">Loading articles from {decodedPublisherName}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Articles from {decodedPublisherName}
                    </h1>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>Error loading articles: {error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Articles from {decodedPublisherName}
                </h1>

                {articles && articles.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map(article => (
                            <div key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {article.image && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Views: {article.views || 0}</span>
                                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No Articles Found
                        </h3>
                        <p className="text-gray-600">
                            No articles available from {decodedPublisherName} at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublisherArticles;