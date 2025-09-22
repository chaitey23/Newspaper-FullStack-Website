import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

export const useTags = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axiosSecure.get('/tags');
            console.log('Tags API response:', response.data);
            return response.data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes cache
    });
};