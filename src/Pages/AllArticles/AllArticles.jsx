import React from 'react';
import ArticlesList from '../../Components/ArticlesList/ArticlesList';


const AllArticles = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">All Articles</h1>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Browse through all our published articles from various publishers and categories
                </p>

                <ArticlesList />
            </div>
        </div>
    );
};

export default AllArticles;