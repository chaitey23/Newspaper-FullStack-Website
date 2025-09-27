import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaUsers,
    FaUserCog,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaNewspaper,
    FaUserPlus
} from 'react-icons/fa';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const DashBoardLayout = () => {
    const { signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign-out successful");
                navigate('/');
            })
            .catch(error => console.error(error));
    };
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar for Desktop */}
            <div className="hidden lg:flex lg:w-80 bg-gradient-to-b from-slate-800 to-slate-900 shadow-xl">
                <div className="flex flex-col w-full">
                    {/* Logo Section */}
                    <div className="p-6 border-b border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-xl flex items-center justify-center">
                                <FaUserCog className="text-white text-lg" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                                <p className="text-slate-400 text-sm">Management System</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <FaHome className="text-base" />
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='all-users'
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <FaUsers className="text-base" />
                                    <span>All Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='all-articles'
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <FaNewspaper className="text-base" />
                                    <span>All Articles</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='add-publisher'
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <FaUserPlus className="text-base" />
                                    <span>Add Publisher</span>
                                </NavLink>
                            </li>
                            <li></li>
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm font-medium">
                                    <FaChartBar className="text-base" />
                                    <span>Analytics</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm font-medium">
                                    <FaCog className="text-base" />
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* User Section & Logout */}
                    <div className="p-4 border-t border-slate-700">
                        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-slate-700/50">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">A</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-medium">Admin User</p>
                                <p className="text-slate-400 text-xs">Administrator</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200 text-sm font-medium">
                            <FaSignOutAlt className="text-base" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className="drawer flex-1">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                {/* Main Content Area */}
                <div className="drawer-content flex flex-col">
                    {/* Mobile Header */}
                    <header className="lg:hidden bg-white shadow-sm border-b border-gray-200">
                        <div className="navbar px-4">
                            <div className="flex-1">
                                <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button">
                                    <FaBars className="text-lg text-gray-600" />
                                </label>
                                <div className="ml-4">
                                    <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
                                </div>
                            </div>
                            <div className="flex-none">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">A</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <Navbar></Navbar>
                    {/* Page Content */}
                    <main className="flex-1 p-4 lg:p-6">
                        <Outlet />
                    </main>
                </div>

                {/* Mobile Drawer Sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-gradient-to-b from-slate-800 to-slate-900 text-base-content min-h-full w-80 p-4">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between mb-6 p-4 border-b border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-xl flex items-center justify-center">
                                    <FaUserCog className="text-white text-lg" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                                </div>
                            </div>
                            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-sm btn-circle">
                                <FaTimes className="text-white" />
                            </label>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1">
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        to='/'
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                                ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                        onClick={() => document.getElementById('my-drawer-2').checked = false}
                                    >
                                        <FaHome className="text-base" />
                                        <span>Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='all-users'
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                                ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                        onClick={() => document.getElementById('my-drawer-2').checked = false}
                                    >
                                        <FaUsers className="text-base" />
                                        <span>All Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='all-articles'
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                                ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                        onClick={() => document.getElementById('my-drawer-2').checked = false}
                                    >
                                        <FaNewspaper className="text-base" />
                                        <span>All Articles</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='add-publisher'
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                                ? 'bg-gradient-to-r from-[#c99e66] to-amber-600 text-white shadow-lg'
                                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                        onClick={() => document.getElementById('my-drawer-2').checked = false}
                                    >
                                        <FaUserPlus className="text-base" />
                                        <span>Add Publisher</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm font-medium">
                                        <FaChartBar className="text-base" />
                                        <span>Analytics</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm font-medium">
                                        <FaCog className="text-base" />
                                        <span>Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* Mobile Footer */}
                        <div className="p-4 border-t border-slate-700 mt-auto">
                            <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200 text-sm font-medium">
                                <FaSignOutAlt className="text-base" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;
