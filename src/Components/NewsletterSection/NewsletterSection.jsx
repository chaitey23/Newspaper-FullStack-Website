import React, { useState } from 'react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Subscribing email:', email);
        setIsSubscribed(true);
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-[#c99e66] to-[#b08d5a]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Stay Informed with Our Newsletter
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Get the latest articles, updates, and exclusive content delivered directly to your inbox. No spam, ever.
                    </p>

                    {isSubscribed ? (
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
                            <div className="text-2xl mb-2">🎉</div>
                            <h3 className="text-xl font-bold mb-2">Welcome to our community!</h3>
                            <p className="text-white/90">Thank you for subscribing to our newsletter.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
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
                        </form>
                    )}

                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Weekly digest</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>No spam, unsubscribe anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Exclusive content</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;