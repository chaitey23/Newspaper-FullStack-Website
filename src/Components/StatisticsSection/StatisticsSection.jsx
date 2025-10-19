import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import UsePageTitle from '../../hooks/UsePageTitle/UsePageTitle';

const StatisticsSection = () => {
    UsePageTitle("StatisticsSection")
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

    // Enhanced color scheme with your brand
    const colorSchemes = [
        {
            bg: 'bg-gradient-to-br from-[#c99e66] to-[#b08d5a]',
            text: 'text-white',
            progress: 'bg-white',
            shadow: 'shadow-[#c99e66]/20'
        },
        {
            bg: 'bg-gradient-to-br from-[#f8f4ec] to-[#f0e6d6]',
            text: 'text-[#8b6b3c]',
            progress: 'bg-[#c99e66]',
            shadow: 'shadow-gray-200'
        },
        {
            bg: 'bg-gradient-to-br from-[#2c1810] to-[#4a3528]',
            text: 'text-[#d4af76]',
            progress: 'bg-[#d4af76]',
            shadow: 'shadow-[#8b6b3c]/20'
        }
    ];

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-gray-50 to-[#faf6f0] mt-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Statistics</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Real-time insights into our growing community
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(item => (
                            <div key={item} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
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

    const StatCard = ({ number, label, description, colorScheme, delay, index }) => (
        <div className="group relative">
            {/* Main Card */}
            <div className={`relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-full ${colorScheme.bg} ${colorScheme.shadow}`}>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9ZM19 9H14V4L19 9Z" />
                    </svg>
                </div>

                <div className="relative z-10">
                    {/* Number with CountUp */}
                    <div className={`text-5xl font-bold mb-4 font-serif ${colorScheme.text}`}>
                        <CountUp
                            end={number}
                            duration={2.5}
                            separator=","
                            delay={delay}
                        />
                        {index === 0 && <span className="text-3xl ml-1">+</span>}
                    </div>

                    {/* Label */}
                    <h3 className={`text-xl font-semibold mb-2 ${colorScheme.text}`}>
                        {label}
                    </h3>

                    {/* Description */}
                    <p className={`font-medium mb-6 opacity-90 ${colorScheme.text}`}>
                        {description}
                    </p>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-black/10 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${colorScheme.progress} transition-all duration-1000 ease-out`}
                            style={{
                                width: `${(number / Math.max(stats.totalUsers, 1)) * 100}%`
                            }}
                        ></div>
                    </div>

                    {/* Decorative Line */}
                    <div className={`w-12 h-1 ${colorScheme.progress} rounded-full mt-4 opacity-60`}></div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
            </div>

            {/* Floating Badge for Premium */}
            {index === 2 && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg transform rotate-6">
                    ⭐ Premium
                </div>
            )}
        </div>
    );

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-[#faf6f0]">
            <div className="container mx-auto px-4">
                {/* Enhanced Header with Icon */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#c99e66] to-[#b08d5a] rounded-full mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                        Growing Community
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join thousands of readers who trust our platform for quality journalism
                    </p>
                </div>

                {/* Enhanced Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard
                        number={stats.totalUsers}
                        label="Total Readers"
                        description="Active Community Members"
                        colorScheme={colorSchemes[0]}
                        delay={0}
                        index={0}
                    />

                    <StatCard
                        number={stats.normalUsers}
                        label="Standard Readers"
                        description="Free Access Members"
                        colorScheme={colorSchemes[1]}
                        delay={0.3}
                        index={1}
                    />

                    <StatCard
                        number={stats.premiumUsers}
                        label="Premium Members"
                        description="Exclusive Content Access"
                        colorScheme={colorSchemes[2]}
                        delay={0.6}
                        index={2}
                    />
                </div>

                {/* Enhanced Stats Footer */}
                <div className="mt-12 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-white">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#c99e66] rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-gray-700">
                                    Premium Ratio: <span className="text-[#c99e66]">{stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}%</span>
                                </span>
                            </div>
                        </div>

                        <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#c99e66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-600">
                                Updated: {new Date().toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Growth Indicator */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>Community growing daily • </span>
                        <span className="text-[#c99e66] font-semibold">Join the movement</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;