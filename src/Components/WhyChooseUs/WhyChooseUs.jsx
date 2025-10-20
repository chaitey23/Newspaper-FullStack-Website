import React, { useState } from 'react';

const WhyChooseUs = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

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

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        console.log('Newsletter subscription:', email);

        // Show success message
        setIsSubscribed(true);
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => {
            setIsSubscribed(false);
        }, 3000);
    };

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

                {/* ✅ UPDATED: Newsletter Section - Replaced CTA */}
                <div className="bg-gradient-to-br from-[#c99e66] via-[#b08d5a] to-[#9c7c4e] rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:20px_20px]"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Stay Informed with Our Newsletter</h3>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                            Get weekly updates, exclusive content, and early access to premium articles delivered to your inbox.
                        </p>

                        {isSubscribed ? (
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
                                <div className="text-2xl mb-2">🎉</div>
                                <h4 className="text-xl font-bold mb-2">Welcome to our community!</h4>
                                <p className="text-white/90">Thank you for subscribing to our newsletter.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="flex-1 px-4 py-3 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-white text-[#c99e66] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
                                    >
                                        Subscribe Now
                                    </button>
                                </div>
                                <p className="text-white/80 text-sm">
                                    No spam, unsubscribe anytime. Join 10,000+ readers already subscribed.
                                </p>
                            </form>
                        )}

                        {/* Trust indicators */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Weekly digest</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Exclusive content</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>No spam, ever</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;