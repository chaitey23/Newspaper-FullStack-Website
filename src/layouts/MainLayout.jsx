import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto p-4'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;