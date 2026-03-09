import React, { useState } from 'react';

const Testimonial = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [pausedId, setPausedId] = useState(null);
    const testimonialData = [
        {
            id: 1,
            name: "Ajay Agarwal",
            role: "AVEENA CO-FOUNDER",
            videoUrl: "https://cdn.sanity.io/files/c0vwz9hn/production/c4eb4f1401603662ef2e72b2b7a54861afd1278e.mp4",
        },
        {
            id: 2,
            name: "Shriya Sadneni",
            role: "MURZBAN",
            videoUrl: "https://cdn.sanity.io/files/c0vwz9hn/production/4de1b241798fb444655b782a5c4468bbaa868845.mp4",
        },
        {
            id: 3,
            name: "Muktesh Narula",
            role: "DOVESOFT",
            videoUrl: "https://cdn.sanity.io/files/c0vwz9hn/production/af4e8a23683d87cfdfab5dd361810d092af5f1e8.mp4",
        },
        {
            id: 4,
            name: "Yash Goswami",
            role: "BITEBEE FOUNDER",
            videoUrl: "https://cdn.sanity.io/files/c0vwz9hn/production/7e645973372eaaf4b6865d05a84bdef46208f935.mp4",
        }
    ];

    const [isMuted, setIsMuted] = useState(true);

    return (
        <section className="py-20 px-4 md:px-10 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Badge */}
                <div className="mb-6 px-6 py-2 border border-gray-200 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Client Testimonials</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-medium text-[#1a2b3c] mb-16 text-center">
                    Happy Clients Testimonials
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
                    {testimonialData.map((item) => (
                        <div
                            key={item.id}
                            onMouseEnter={() => {
                                setHoveredId(item.id);
                                setPausedId(null);
                            }}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative group overflow-hidden rounded-[1.5rem] aspect-[9/16] cursor-pointer transition-all duration-500 hover:shadow-2xl transform-gpu isolate bg-gray-100"
                            style={{
                                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                maskImage: 'radial-gradient(white, black)',
                                WebkitBackfaceVisibility: 'hidden',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            {/* Video Background */}
                            <video
                                src={item.videoUrl}
                                autoPlay
                                muted={isMuted}
                                loop
                                playsInline
                                ref={(el) => {
                                    if (el) {
                                        if (hoveredId === item.id && pausedId !== item.id) {
                                            el.play().catch(() => { });
                                        } else {
                                            el.pause();
                                        }
                                    }
                                }}
                                className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 "
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 z-20 transition-opacity duration-300 group-hover:opacity-60"></div>

                            {/* Top Icons */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPausedId(pausedId === item.id ? null : item.id);
                                    }}
                                    className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                                >
                                    {hoveredId === item.id && pausedId !== item.id ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMuted(!isMuted);
                                    }}
                                    className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                                >
                                    {isMuted ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Text content */}
                            <div className="absolute bottom-8 left-8 right-8 text-white z-30">
                                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                <p className="text-xs font-semibold opacity-80 tracking-widest uppercase">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
