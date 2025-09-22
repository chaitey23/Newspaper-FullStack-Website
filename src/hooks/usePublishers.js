import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

export const usePublishers = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const response = await axiosSecure.get('/publishers');
            return response.data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes cache
    });
};
