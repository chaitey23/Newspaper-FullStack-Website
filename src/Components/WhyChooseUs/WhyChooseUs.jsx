import React from 'react';

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            title: "Quality Content",
            description: "Every article goes through rigorous editorial standards to ensure accuracy and value for our readers.",
            icon: "🎯",
            stats: "99%"
        },
        {
            id: 2,
            title: "Expert Writers",
            description: "Our team consists of industry experts and professional journalists with years of experience.",
            icon: "✍️",
            stats: "50+"
        },
        {
            id: 3,
            title: "Real-time Updates",
            description: "Stay informed with breaking news and real-time updates across all major categories.",
            icon: "⚡",
            stats: "24/7"
        },
        {
            id: 4,
            title: "Community Driven",
            description: "Join a community of curious minds sharing insights and perspectives on important topics.",
            icon: "👥",
            stats: "100K+"
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Marketing Director",
            content: "This platform has become my go-to source for industry insights. The quality of content is exceptional!",
            avatar: "👩"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Software Engineer",
            content: "The tech coverage is always up-to-date and the analysis is deep yet accessible. Highly recommended!",
            avatar: "👨"
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "University Professor",
            content: "As an academic, I appreciate the well-researched articles and diverse perspectives offered here.",
            avatar: "👩‍🏫"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Why Readers <span className="text-[#c99e66]">Choose Us</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Experience the difference with our commitment to excellence in journalism
                        and content creation that matters
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#f8f5f1] to-[#f0e6d6] flex items-center justify-center text-2xl text-[#c99e66] group-hover:scale-110 transition-transform duration-300 shadow-md">
                                {feature.icon}
                            </div>
                            <div className="text-3xl font-bold text-[#c99e66] mb-2">
                                {feature.stats}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="bg-gradient-to-r from-[#faf6f0] to-[#f8f5f1] rounded-3xl p-12 mb-16 border border-gray-200">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            What Our <span className="text-[#c99e66]">Readers Say</span>
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#c99e66] to-[#b08d5a] mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Join thousands of satisfied readers who trust us for their daily dose of information and insights
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f8f5f1] to-[#f0e6d6] flex items-center justify-center text-[#c99e66] text-xl mr-4 shadow-md">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic text-lg leading-relaxed mb-4">"{testimonial.content}"</p>
                                <div className="flex text-[#c99e66] text-lg">
                                    {"★".repeat(5)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner - Updated with your brand colors */}
                <div className="bg-gradient-to-br from-[#c99e66] via-[#b08d5a] to-[#9c7c4e] rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:20px_20px]"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-6">Ready to Dive In?</h3>
                        <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join our community of informed readers and never miss out on important updates and insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button className="px-8 py-4 bg-white text-[#c99e66] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg">
                                Create Free Account
                            </button>
                            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#c99e66] transition-all duration-300 transform hover:-translate-y-1 text-lg">
                                Learn More
                            </button>
                        </div>
                        <p className="text-white/80 mt-6 text-sm">
                            No credit card required • Start reading in seconds
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;