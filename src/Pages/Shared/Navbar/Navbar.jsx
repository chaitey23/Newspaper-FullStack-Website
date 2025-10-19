import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaCrown, FaCreditCard, FaSignOutAlt, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
    const { user, signOutUser, loading } = useContext(AuthContext);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    console.log("User object:", user);



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    if (loading) {
        return (
            <nav className="navbar bg-white shadow-md sticky top-0 z-50 px-4 md:px-8 py-3">
                <div className="navbar-start">
                    <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-800">
                        read<span className='text-[#c99e66]'>&</span>digest
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                </div>
            </nav>
        );
    }
    const handleSignOut = () => {
        setShowLogoutModal(false);
        signOutUser()
            .then(() => {
                console.log("Sign-out successful");
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
        closeMenu();
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    const commonLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                    }
                    onClick={closeMenu}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-articles"
                    className={({ isActive }) =>
                        isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                    }
                    onClick={closeMenu}
                >
                    All Articles
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/subscription"
                    className={({ isActive }) =>
                        isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                    }
                    onClick={closeMenu}
                >
                    Subscription
                </NavLink>
            </li>
        </>
    );

    const loggedInLinks = (
        <>
            <li>
                <NavLink
                    to="/add-article"
                    className={({ isActive }) =>
                        isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                    }
                    onClick={closeMenu}
                >
                    Add Articles
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/my-articles"
                    className={({ isActive }) =>
                        isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                    }
                    onClick={closeMenu}
                >
                    My Articles
                </NavLink>
            </li>
            {user?.premiumTaken && (
                <li>
                    <NavLink
                        to="/premium-articles"
                        className={({ isActive }) =>
                            isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                        }
                        onClick={closeMenu}
                    >
                        Premium Articles
                    </NavLink>
                </li>
            )}
            {user?.role === 'admin' && (
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "text-[#c99e66] font-medium text-base md:text-lg underline underline-offset-4 decoration-2" : "text-gray-700 hover:text-[#c99e66] transition-colors text-base md:text-lg"
                        }
                        onClick={closeMenu}
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <>
            <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4 md:px-8 py-3 border-b-2 border-[#c99e66]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            aria-label="Toggle menu"
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"}
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {commonLinks}
                            {user && loggedInLinks}
                            {user && (
                                <li>
                                    <button
                                        onClick={openLogoutModal}
                                        className="text-gray-700 hover:text-[#c99e66] w-full text-left"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-800">
                        read<span className='text-[#c99e66]'>&</span>digest
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {commonLinks}
                        {user && loggedInLinks}
                    </ul>
                </div>

                <div className="navbar-end">

                    {!user ? (
                        <>
                            <div className="flex md:hidden">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `px-3 py-1.5 rounded-lg transition-colors text-sm mr-2 ${isActive ? "text-[#c99e66] font-medium border border-[#c99e66]" : "text-gray-700 hover:text-[#c99e66] border border-gray-300 hover:border-[#c99e66]"}`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-3 py-1.5 bg-[#c99e66] text-white rounded-lg hover:bg-[#b58c58] transition-colors text-sm"
                                >
                                    Register
                                </NavLink>

                            </div>

                            <div className="hidden md:flex gap-4">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg transition-colors ${isActive ? "text-[#c99e66] font-medium border border-[#c99e66]" : "text-gray-700 hover:text-[#c99e66] border border-gray-300 hover:border-[#c99e66]"}`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-4 py-2 bg-[#c99e66] text-white rounded-lg hover:bg-[#b58c58] transition-colors"
                                >
                                    Register
                                </NavLink>
                            </div>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="avatar">
                                <Link to="/profile">
                                    <div className='flex items-center gap-3'>
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#c99e66] to-[#b88d54] flex items-center justify-center shadow-md">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName || "User"}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-bold text-xl">
                                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        {user.displayName && (
                                            <span className="hidden md:inline text-gray-900 font-semibold text-lg tracking-wide bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                                {user.displayName}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border border-gray-200">
                                <li className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                    <div className="font-semibold text-gray-900">{user.displayName || "User"}</div>
                                    <div className="text-sm text-gray-600 mt-1">{user.email}</div>
                                </li>
                                <li>
                                    <Link to="/profile" className="justify-between py-3 text-gray-700 hover:text-[#c99e66] hover:bg-gray-50 transition-colors">
                                        <span className="flex items-center gap-2">
                                            <FaUser className="w-4 h-4" />
                                            My Profile
                                        </span>
                                    </Link>
                                </li>
                                {user.role === "admin" && (
                                    <li>
                                        <Link to="/dashboard" className="py-3 text-gray-700 hover:text-[#c99e66] hover:bg-gray-50 transition-colors">
                                            <span className="flex items-center gap-2">
                                                <FaChartBar className="w-4 h-4" />
                                                Dashboard
                                            </span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link to="/my-articles" className="py-3 text-gray-700 hover:text-[#c99e66] hover:bg-gray-50 transition-colors">
                                        <span className="flex items-center gap-2">
                                            <FaFileAlt className="w-4 h-4" />
                                            My Articles
                                        </span>
                                    </Link>
                                </li>
                                {user.premiumTaken && (
                                    <li>
                                        <Link to="/premium-articles" className="py-3 text-gray-700 hover:text-[#c99e66] hover:bg-gray-50 transition-colors">
                                            <span className="flex items-center gap-2">
                                                <FaCrown className="w-4 h-4" />
                                                Premium Articles
                                            </span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link to="/subscription" className="py-3 text-gray-700 hover:text-[#c99e66] hover:bg-gray-50 transition-colors justify-between">
                                        <span className="flex items-center gap-2">
                                            <FaCreditCard className="w-4 h-4" />
                                            Subscription
                                        </span>
                                        {user.premiumTaken
                                            ? <span className="badge badge-success badge-sm ml-2">Active</span>
                                            : <span className="badge badge-warning badge-sm ml-2 bg-[#c99e66] border-[#c99e66] text-white">Upgrade</span>
                                        }
                                    </Link>
                                </li>
                                <li><hr className="my-1 border-gray-200" /></li>
                                <li>
                                    <button onClick={openLogoutModal} className="py-3 text-red-600 hover:text-red-800 font-medium hover:bg-red-50 transition-colors flex items-center gap-2">
                                        <FaSignOutAlt className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
                    <div className="bg-amber-100 rounded-lg p-6 w-11/12 max-w-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 bg-[#c99e66] text-white rounded-lg hover:bg-[#c99e66] transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;