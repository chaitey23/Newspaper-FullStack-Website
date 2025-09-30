import React from 'react';
import TrendingArticles from '../../Components/TrendingArticles/TrendingArticles';
import PublisherSection from '../../Components/PublisherSection/PublisherSection';
import SubscriptionSection from '../../Components/subscriptionSection/SubscriptionSection';
import StatisticsSection from '../../Components/StatisticsSection/StatisticsSection';

const Home = () => {
    return (
        <>
            <TrendingArticles></TrendingArticles>
            <PublisherSection></PublisherSection>
            <SubscriptionSection></SubscriptionSection>
            <StatisticsSection></StatisticsSection>
        </>
    );
};

export default Home;