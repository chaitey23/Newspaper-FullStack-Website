import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const [userRole, setUserRole] = useState(null);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!user?.email) {
                setCheckingRole(false);
                return;
            }

            try {
                const res = await axiosSecure.get(`/users?email=${user.email}`);
                setUserRole(res.data.role);
            } catch (err) {
                console.error("Error fetching user role:", err);
                setUserRole('user'); // fallback
            } finally {
                setCheckingRole(false);
            }
        };

        fetchUserRole();
    }, [user, axiosSecure]);

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
