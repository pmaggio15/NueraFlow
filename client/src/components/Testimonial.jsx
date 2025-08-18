import React from 'react'
import { Quote, Star, Verified } from 'lucide-react'

const Testimonial = () => {
    const professionalTestimonials = [
       { 
        id: 1, 
        name: "Sarah Chen", 
        title: "Senior Product Manager",
        company: "Microsoft",
        address: "Seattle, WA", 
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop&crop=face", 
        rating: 5, 
        review: "The AI content suite has revolutionized our marketing workflow. What used to take hours now takes minutes, with consistently high-quality output that matches our brand voice perfectly.",
        verified: true
        },
        { 
            id: 2, 
            name: "Marcus Rodriguez", 
            title: "Creative Director",
            company: "Adobe",
            address: "San Francisco, CA", 
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200", 
            rating: 5, 
            review: "Exceptional AI tools that have elevated our creative process. The image generation and editing capabilities are enterprise-grade and have significantly improved our team's productivity.",
            verified: true
        },
        { 
            id: 3, 
            name: "Emily Thompson", 
            title: "Head of Content Strategy",
            company: "HubSpot",
            address: "Boston, MA", 
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200", 
            rating: 5, 
            review: "Outstanding platform that seamlessly integrates into our existing workflow. The AI-powered content creation tools have helped us scale our content operations while maintaining quality.",
            verified: true
        }
    ];

    const StarRating = ({ rating }) => (
        <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, index) => (
                <Star 
                    key={index} 
                    className={`w-4 h-4 ${rating > index ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                />
            ))}
        </div>
    );
    
    return (
        <section className="px-6 md:px-12 lg:px-24 xl:px-32 pt-8 pb-20 lg:pt-12 lg:pb-32 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
            
            {/* Header Section */}
            <div className="relative z-10 text-center max-w-4xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    <Verified className="w-4 h-4 text-green-400" />
                    <span>Verified Client Reviews</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                    Trusted Industry {" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Leaders
                    </span>
                </h2>
                
                <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                    See how leading companies and professionals are transforming their workflows with our AI-powered content suite
                </p>
            </div>

            {/* Testimonials Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {professionalTestimonials.map((testimonial, index) => (
                    <div 
                        key={testimonial.id} 
                        className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:border-white/40 hover:-translate-y-2 transition-all duration-500 ease-out"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <Quote className="w-8 h-8 text-purple-600" />
                        </div>
                        
                        {/* Premium gradient border on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        
                        <div className="relative z-10">
                            {/* Header with profile */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="relative">
                                    <img 
                                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                    />
                                    {testimonial.verified && (
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                                            <Verified className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-800 transition-colors">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-purple-600 font-semibold text-sm mb-1">
                                        {testimonial.title}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {testimonial.company} • {testimonial.address}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-6">
                                <StarRating rating={testimonial.rating} />
                            </div>

                            {/* Review */}
                            <blockquote className="text-gray-700 text-base leading-relaxed italic">
                                "{testimonial.review}"
                            </blockquote>
                        </div>

                        {/* Decorative corner accent */}
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                ))}
            </div>

            {/* Trust Indicators */}
            <div className="relative z-10 flex flex-wrap justify-center items-center gap-8 mt-20 pt-12 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">5.0 Average Rating</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">100+ Enterprise Clients</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">99.9% Client Satisfaction</span>
                </div>
            </div>
        </section>
    );
}

export default Testimonial