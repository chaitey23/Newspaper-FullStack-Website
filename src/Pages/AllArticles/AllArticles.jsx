import React from 'react';
import ArticlesList from '../../Components/ArticlesList/ArticlesList';


const AllArticles = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">


                <ArticlesList />
            </div>
        </div>
    );
};

export default AllArticles;