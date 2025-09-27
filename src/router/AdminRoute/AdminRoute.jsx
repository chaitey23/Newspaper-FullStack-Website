// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { AuthContext } from '../../Context/AuthContext/AuthContext';


// const AdminRoute = ({ children }) => {
//     const { user, loading } = useContext(AuthContext);
//     const location = useLocation();

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-[60vh]">
//                 <div className="w-12 h-12 border-4 border-[#c99e66] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (!user || user.role !== 'admin') {
//         return <Navigate to="/" state={{ from: location }} replace />;
//     }

//     return children;
// };

// export default AdminRoute;
// AdminRoute.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import axios from 'axios';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const checkUserRole = async () => {
            if (user && user.email) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${user.email}`);
                    setUserRole(res.data.role);
                } catch (error) {
                    console.error('Error checking user role:', error);
                    setUserRole('user');
                }
            }
            setCheckingRole(false);
        };

        checkUserRole();
    }, [user]);

    if (loading || checkingRole) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#c99e66] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || userRole !== 'admin') {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;