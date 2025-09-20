import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router';


const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign-out successful");
                navigate('/');
            })
            .catch(error => console.error(error));
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
        <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4 md:px-8 py-3">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
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
                                    onClick={() => {
                                        handleSignOut();
                                        closeMenu();
                                    }}
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
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <Link to="/profile">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#c99e66] flex items-center justify-center border-2 border-transparent hover:border-[#c99e66] transition-colors">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-semibold text-lg">
                                            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="px-4 py-2 border-b border-gray-100">
                                <div className="font-medium text-gray-800">{user.displayName || "User"}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </li>
                            <li>
                                <Link to="/profile" className="justify-between">
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-articles">My Articles</Link>
                            </li>
                            {user.premiumTaken && (
                                <li>
                                    <Link to="/premium-articles">Premium Articles</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/subscription">
                                    Subscription
                                    {user.premiumTaken
                                        ? <span className="badge badge-success badge-sm ml-2">Active</span>
                                        : <span className="badge badge-warning badge-sm ml-2">Upgrade</span>
                                    }
                                </Link>
                            </li>
                            <li><hr className="my-1" /></li>
                            <li>
                                <button onClick={handleSignOut} className="text-red-600 hover:text-red-800 font-medium">
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;