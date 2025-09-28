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
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });

        const responseInterceptor = axiosInstance.interceptors.response.use(
            res => res,
            err => {
                if (err.response?.status === 401) {
                    console.log("Unauthorized! Token expired or missing.");
                }
                return Promise.reject(err);
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