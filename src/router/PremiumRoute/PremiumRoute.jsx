import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const PremiumRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#c99e66] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || !user.subscription) {
        return <Navigate to="/subscription" state={{ from: location }} replace />;
    }

    return children;
};

export default PremiumRoute;
