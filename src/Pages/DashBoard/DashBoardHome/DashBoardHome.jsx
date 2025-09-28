import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaNewspaper, FaBuilding, FaClock, FaSpinner } from 'react-icons/fa';

const DashBoardHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalArticles: 0,
        totalPublishers: 0,
        pendingArticles: 0
    });

    const [publisherData, setPublisherData] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch all data concurrently
                const [usersResponse, articlesResponse, publishersResponse] = await Promise.all([
                    axiosSecure.get('/users'),
                    axiosSecure.get('/articles'),
                    axiosSecure.get('/publishers')
                ]);

                const users = usersResponse.data;
                const articles = articlesResponse.data;
                const publishers = publishersResponse.data;

                console.log('Dashboard Data:', {
                    users: users.length,
                    articles: articles.length,
                    publishers: publishers.length
                });

                // Calculate publisher-wise article distribution
                const publisherStats = {};
                articles.forEach(article => {
                    if (article.status === 'approved') {
                        publisherStats[article.publisher] = (publisherStats[article.publisher] || 0) + 1;
                    }
                });

                const pieChartData = [['Publisher', 'Articles']];
                Object.keys(publisherStats).forEach(publisher => {
                    pieChartData.push([publisher, publisherStats[publisher]]);
                });

                // Get pending articles count
                const pendingArticles = articles.filter(article => article.status === 'pending').length;

                // Set states
                setStats({
                    totalUsers: users.length,
                    totalArticles: articles.length,
                    totalPublishers: publishers.length,
                    pendingArticles: pendingArticles
                });

                setPublisherData(pieChartData.length > 1 ? pieChartData : [['Publisher', 'Articles'], ['No Data', 1]]);
                setRecentUsers(users.slice(0, 5));
                setRecentArticles(articles.slice(0, 5));

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Fallback data
                setPublisherData([['Publisher', 'Articles'], ['No Data', 1]]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [axiosSecure]);

    // Sample data for additional charts
    const monthlyArticlesData = [
        ['Month', 'Articles'],
        ['Jan', 45],
        ['Feb', 52],
        ['Mar', 48],
        ['Apr', 60],
        ['May', 55],
        ['Jun', 68],
        ['Jul', 72],
        ['Aug', 65],
        ['Sep', 70],
        ['Oct', 75],
        ['Nov', 80],
        ['Dec', 85]
    ];

    const userGrowthData = [
        ['Month', 'Users'],
        ['Jan', 120],
        ['Feb', 250],
        ['Mar', 380],
        ['Apr', 520],
        ['May', 680],
        ['Jun', 850],
        ['Jul', 1020],
        ['Aug', 1250],
        ['Sep', 1500],
        ['Oct', 1800],
        ['Nov', 2100],
        ['Dec', 2500]
    ];

    const chartOptions = {
        backgroundColor: 'transparent',
        titleTextStyle: {
            fontSize: 16,
            color: '#2c3e50'
        },
        legend: {
            textStyle: {
                color: '#2c3e50'
            }
        },
        hAxis: {
            textStyle: {
                color: '#2c3e50'
            }
        },
        vAxis: {
            textStyle: {
                color: '#2c3e50'
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome to your admin dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                            <FaUsers className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                            <p className="text-gray-600">Total Users</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg mr-4">
                            <FaNewspaper className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.totalArticles}</h3>
                            <p className="text-gray-600">Total Articles</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <div className="flex items-center">
                        <div className="p-3 bg-red-100 rounded-lg mr-4">
                            <FaBuilding className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.totalPublishers}</h3>
                            <p className="text-gray-600">Total Publishers</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                            <FaClock className="text-yellow-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.pendingArticles}</h3>
                            <p className="text-gray-600">Pending Articles</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Pie Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Article Distribution by Publisher</h3>
                    <div className="h-80">
                        <Chart
                            chartType="PieChart"
                            data={publisherData}
                            options={{
                                ...chartOptions,
                                title: 'Article Distribution by Publisher',
                                is3D: true,
                                colors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'],
                            }}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Articles Published Per Month</h3>
                    <div className="h-80">
                        <Chart
                            chartType="ColumnChart"
                            data={monthlyArticlesData}
                            options={{
                                ...chartOptions,
                                title: 'Articles Published Per Month',
                                colors: ['#3498db'],
                                legend: { position: 'none' }
                            }}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Line Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">User Growth Over Time</h3>
                    <div className="h-80">
                        <Chart
                            chartType="LineChart"
                            data={userGrowthData}
                            options={{
                                ...chartOptions,
                                title: 'User Growth Over Time',
                                colors: ['#2ecc71'],
                                legend: { position: 'none' }
                            }}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Latest Users</h4>
                            <div className="space-y-2">
                                {recentUsers.map(user => (
                                    <div key={user._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center">
                                            <img
                                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <div>
                                                <p className="text-sm font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Latest Articles</h4>
                            <div className="space-y-2">
                                {recentArticles.map(article => (
                                    <div key={article._id} className="p-2 bg-gray-50 rounded">
                                        <p className="text-sm font-medium truncate">{article.title}</p>
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>By: {article.author}</span>
                                            <span className={`px-2 py-1 rounded-full ${article.status === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : article.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {article.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardHome;