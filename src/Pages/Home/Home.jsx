import React from 'react';
import TrendingArticles from '../../Components/TrendingArticles/TrendingArticles';
import PublisherSection from '../../Components/PublisherSection/PublisherSection';
import SubscriptionSection from '../../Components/subscriptionSection/SubscriptionSection';

const Home = () => {
    return (
        <>
            <TrendingArticles></TrendingArticles>
            <PublisherSection></PublisherSection>
            <SubscriptionSection></SubscriptionSection>
        </>
    );
};

export default Home;