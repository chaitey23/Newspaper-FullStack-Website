import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Navbar/Footer/Footer';
import ScrollToTop from '../Pages/ScrollToTop/ScrollToTop';

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar></Navbar>
            <ScrollToTop></ScrollToTop>
            <div className='w-11/12 mx-auto p-4'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;