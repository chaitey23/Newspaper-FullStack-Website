import React, { useEffect, useState } from 'react';
import TrendingArticles from '../../Components/TrendingArticles/TrendingArticles';
import PublisherSection from '../../Components/PublisherSection/PublisherSection';
import SubscriptionSection from '../../Components/subscriptionSection/SubscriptionSection';
import StatisticsSection from '../../Components/StatisticsSection/StatisticsSection';
import UsePageTitle from '../../hooks/UsePageTitle/UsePageTitle';
import FeaturedCategoriesSection from '../../Components/FeaturedCategoriesSection/FeaturedCategoriesSection';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';
import SubscriptionModal from '../../Components/SubscriptionModal/SubcriptionModal';
import HeroSection from '../../Components/HeroSection/HeroSection';
import LatestArticles from '../../Components/LatestArticles/LatestArticles';


const Home = () => {
    UsePageTitle("Home");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <HeroSection></HeroSection>
            <LatestArticles></LatestArticles>
            <TrendingArticles></TrendingArticles>
            <PublisherSection></PublisherSection>
            <StatisticsSection></StatisticsSection>
            <FeaturedCategoriesSection></FeaturedCategoriesSection>
            <WhyChooseUs></WhyChooseUs>
            <SubscriptionSection></SubscriptionSection>
            <SubscriptionModal show={showModal} onClose={() => setShowModal(false)}>
            </SubscriptionModal>
        </>
    );
};

export default Home;