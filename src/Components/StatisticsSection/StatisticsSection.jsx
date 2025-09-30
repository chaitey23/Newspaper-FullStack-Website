import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const StatisticsSection = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        normalUsers: 0,
        premiumUsers: 0
    });
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosSecure.get('/stats');
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Statistics</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Real-time insights into our growing community
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(item => (
                            <div key={item} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <div className="animate-pulse">
                                    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                                    <div className="h-12 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const StatCard = ({ number, label, description, color, delay }) => (
        <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

            {/* Animated background pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-50 to-transparent rounded-tr-xl opacity-60"></div>

            <div className="relative">
                <div className={`text-5xl font-bold mb-4 ${color}`}>
                    <CountUp
                        end={number}
                        duration={2.5}
                        separator=","
                        delay={delay}
                    />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{label}</h3>
                <p className="text-gray-500 font-medium">{description}</p>

                {/* Progress bar indicator */}
                <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${color.replace('text', 'bg')} transition-all duration-1000 ease-out`}
                        style={{
                            width: `${(number / Math.max(stats.totalUsers, 1)) * 100}%`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-[#faf6f0] mt-14">
            <div className="container mx-auto px-4">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Platform Statistics
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Real-time insights into our growing community and user engagement metrics
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard
                        number={stats.totalUsers}
                        label="Total Users"
                        description="Registered Community Members"
                        color="text-blue-600"
                        delay={0}
                    />

                    <StatCard
                        number={stats.normalUsers}
                        label="Standard Users"
                        description="Free Plan Members"
                        color="text-green-600"
                        delay={0.2}
                    />

                    <StatCard
                        number={stats.premiumUsers}
                        label="Premium Users"
                        description="Exclusive Membership Tier"
                        color="text-purple-600"
                        delay={0.4}
                    />
                </div>

                {/* Additional Info Section */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-600">
                                Premium Ratio: {stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}%
                            </span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="text-sm font-medium text-gray-600">
                            Last Updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;