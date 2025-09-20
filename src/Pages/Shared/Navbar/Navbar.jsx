import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

const Navbar = () => {
    const { user, signOutUser, } = useContext(AuthContext)
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign-out successfully");

            })
            .catch(error => {
                console.error(error);
            });
    };
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        {
            user && (
                <>
                    <li><NavLink to="/">Add Articles</NavLink></li>


                </>
            )
        }
    </>
    return (
        <div className="navbar mt-2 bg-base-100 sticky shadow-sm top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}

                    </ul>
                </div>
                <a className="text-3xl font-semibold">read<span className='text-[#c99e66]'>&</span>digest</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {links}

                </ul>
            </div>
            <div className="navbar-end">
                <NavLink to='/login'>Login</NavLink>
            </div>
        </div>
    );
};

export default Navbar;