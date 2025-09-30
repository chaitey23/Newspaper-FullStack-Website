import React from 'react';
import TrendingArticles from '../../Components/TrendingArticles/TrendingArticles';
import PublisherSection from '../../Components/PublisherSection/PublisherSection';
import SubscriptionSection from '../../Components/subscriptionSection/SubscriptionSection';
import StatisticsSection from '../../Components/StatisticsSection/StatisticsSection';
import UsePageTitle from '../../hooks/UsePageTitle/UsePageTitle';
import FeaturedCategoriesSection from '../../Components/FeaturedCategoriesSection/FeaturedCategoriesSection';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';

const Home = () => {
    UsePageTitle("Home")
    return (
        <>
            <TrendingArticles></TrendingArticles>
            <PublisherSection></PublisherSection>
            <SubscriptionSection></SubscriptionSection>
            <StatisticsSection></StatisticsSection>
            <FeaturedCategoriesSection></FeaturedCategoriesSection>
            <WhyChooseUs></WhyChooseUs>
        </>
    );
};

export default Home;