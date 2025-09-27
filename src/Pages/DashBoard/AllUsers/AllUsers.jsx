import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaUserShield, FaUser, FaCrown, FaStar, FaEnvelope, FaExclamationTriangle, FaSpinner, FaTrash, FaEdit, FaImage } from "react-icons/fa";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        refetch,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
        retry: 2,
    });

    // Make Admin Function
    const handleMakeAdmin = async (id, email) => {
        try {
            const result = await Swal.fire({
                title: 'Make Administrator?',
                text: `Do you want to make ${email} an Administrator?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#c99e66',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, make Admin!',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                backdrop: true,
                allowOutsideClick: false
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.put(`/users/${id}/role`, { role: "admin" });

                if (res.data.message.includes("updated")) {
                    await Swal.fire({
                        title: 'Success!',
                        text: `${email} is now an Administrator!`,
                        icon: 'success',
                        confirmButtonColor: '#c99e66',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating user role',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
            console.log(error);
        }
    };

    // Delete User Function
    const handleDeleteUser = async (id, email) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `You are about to delete user: ${email}. This action cannot be undone!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                backdrop: true,
                allowOutsideClick: false,
                customClass: {
                    popup: 'rounded-2xl'
                }
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`);

                if (res.data.message.includes("deleted")) {
                    await Swal.fire({
                        title: 'Deleted!',
                        text: `User ${email} has been deleted successfully.`,
                        icon: 'success',
                        confirmButtonColor: '#c99e66',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to delete user',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
            console.log(error);
        }
    };

    const adminCount = users.filter(user => user.role === "admin").length;
    const regularCount = users.filter(user => user.role !== "admin").length;

    // ✅ Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <FaSpinner className="text-3xl text-white animate-spin" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Users</h2>
                    <p className="text-slate-500">Please wait while we fetch the data...</p>
                </div>
            </div>
        );
    }

    // ✅ Error State
    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
                        <FaExclamationTriangle className="text-3xl text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Error Loading Data</h2>
                    <p className="text-slate-500 mb-4">
                        {error?.message || "Failed to load users. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-gradient-to-r from-[#c99e66] to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header - Premium Design */}
                <div className="text-center mb-10">
                    <div className="relative inline-block mb-5">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50">
                            <FaUsers className="text-2xl text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{users.length}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-800 mb-2">User Management</h1>
                    <p className="text-slate-600 max-w-md mx-auto">Manage user roles, permissions and access controls</p>
                </div>

                {/* Stats Cards - Compact & Elegant */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Total Users</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{users.length}</h3>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaUsers className="text-blue-600 text-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Administrators</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{adminCount}</h3>
                            </div>
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <FaUserShield className="text-emerald-600 text-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Regular Users</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{regularCount}</h3>
                            </div>
                            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                                <FaUser className="text-violet-600 text-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Actions Available</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{users.length}</h3>
                            </div>
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <FaEdit className="text-amber-600 text-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section - Professional & Clean */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#c99e66] to-amber-600 rounded-lg flex items-center justify-center">
                                    <FaUserShield className="text-white text-sm" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">User Accounts</h2>
                                    <p className="text-slate-500 text-sm">Manage user roles and permissions</p>
                                </div>
                            </div>
                            <div className="text-sm text-slate-500">
                                {users.length} user{users.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/80">
                                    <th className="py-4 px-6 text-left">
                                        <span className="text-slate-600 text-sm font-medium">#</span>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <span className="text-slate-600 text-sm font-medium flex items-center gap-2">
                                            <FaUser className="text-slate-400" />
                                            User Info
                                        </span>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <span className="text-slate-600 text-sm font-medium">Role</span>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <span className="text-slate-600 text-sm font-medium">Admin Action</span>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <span className="text-slate-600 text-sm font-medium">Delete</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="text-slate-700 font-medium">{index + 1}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {/* User Avatar with Image */}
                                                <div className="relative">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.name || user.email}
                                                            className="w-12 h-12 rounded-xl object-cover border-2 border-slate-200 shadow-inner"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-inner">
                                                            <span className="text-slate-700 font-semibold text-lg">
                                                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {/* Online Status Indicator */}
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                </div>
                                                <div>
                                                    <p className="text-slate-800 font-medium text-sm">
                                                        {user.name || 'No Name'}
                                                    </p>
                                                    <p className="text-slate-400 text-xs flex items-center gap-1">
                                                        <FaEnvelope className="text-slate-300" />
                                                        {user.email}
                                                    </p>
                                                    <p className="text-slate-500 text-xs mt-1">
                                                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${user.role === "admin"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : "bg-blue-50 text-blue-700 border border-blue-200"
                                                }`}>
                                                {user.role === "admin" ? <FaStar className="text-amber-500" /> : <FaUser className="text-blue-500" />}
                                                <span className="capitalize">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.role === "admin" ? (
                                                <div className="flex items-center gap-2 text-emerald-700">
                                                    <FaUserShield className="text-sm" />
                                                    <span className="font-medium text-sm">Administrator</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id, user.email)}
                                                    className="group flex items-center gap-2 bg-gradient-to-r from-[#c99e66] to-amber-600 hover:from-amber-600 hover:to-[#c99e66] text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium cursor-pointer"
                                                >
                                                    <FaCrown className="text-white text-xs group-hover:scale-110 transition-transform" />
                                                    <span>Make Admin</span>
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => handleDeleteUser(user._id, user.email)}
                                                className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium cursor-pointer"
                                            >
                                                <FaTrash className="text-white text-xs group-hover:scale-110 transition-transform" />
                                                <span>Delete User</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                                <FaUsers className="text-2xl text-slate-400" />
                            </div>
                            <h3 className="text-base font-medium text-slate-700 mb-1">No users found</h3>
                            <p className="text-slate-500 text-sm">Users will appear here once they register</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-slate-400 text-xs">© 2024 User Management System</p>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;