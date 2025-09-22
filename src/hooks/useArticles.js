import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

export const useArticles = (filters = {}) => {
    const axiosSecure = useAxiosSecure();

    const { search, publisher, tags } = filters;

    return useQuery({
        queryKey: ['articles', filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (search) params.append('search', search);
            if (publisher) params.append('publisher', publisher);
            if (tags && tags.length > 0) params.append('tags', tags.join(','));

            const response = await axiosSecure.get(`/articles?${params.toString()}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes cache
    });
};

