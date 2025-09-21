import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {

        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, error => Promise.reject(error));

        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    console.log("Unauthorized! Token may have expired.");
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [user]);

    return axiosInstance;
};

export default useAxiosSecure;