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
// import axios from 'axios';
// import { useContext, useEffect } from 'react';
// import { AuthContext } from '../Context/AuthContext/AuthContext';

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL
// });

// const useAxiosSecure = () => {
//     const { user } = useContext(AuthContext);

//     useEffect(() => {
//         const requestInterceptor = axiosInstance.interceptors.request.use(async (config) => {
//             if (user) {
//                 try {
//                     // ✅ Eikhane change korte hobe
//                     const idToken = await user.getIdToken();
//                     console.log('🔑 Sending ID Token to server');
//                     config.headers.Authorization = `Bearer ${idToken}`;
//                 } catch (error) {
//                     console.error('❌ Error getting ID token:', error);
//                 }
//             }
//             return config;
//         });

//         const responseInterceptor = axiosInstance.interceptors.response.use(
//             res => res,
//             err => {
//                 if (err.response?.status === 401) {
//                     console.log("❌ Unauthorized! Token problem.");
//                 }
//                 return Promise.reject(err);
//             }
//         );

//         return () => {
//             axiosInstance.interceptors.request.eject(requestInterceptor);
//             axiosInstance.interceptors.response.eject(responseInterceptor);
//         };
//     }, [user]);

//     return axiosInstance;
// };

// export default useAxiosSecure;