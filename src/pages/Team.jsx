import React, { useState, useEffect } from 'react';
import { commonAPI } from '../lib/api';
import { getImageUrl } from '../lib/utils';

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await commonAPI.getTeam();
                if (res.success) {
                    setTeamMembers(res.teamMembers);
                }
            } catch (error) {
                console.error("Failed to fetch team", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    const dataToShow = teamMembers.length > 0 ? teamMembers : [
        {
            _id: 1,
            name: "Kapil Singh",
            position: "Founder & CEO",
            photo: "/images/team/Kapil_Singh.png"
        },
        {
            _id: 2,
            name: "Divyadarshan Das",
            position: "MERN Stack Developer",
            photo: "/images/team/profile-img.png"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden bg-texture" id="team">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-20">
                    <span className="px-5 py-2 mb-8 text-xs font-semibold tracking-widest uppercase text-slate-500 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
                        Our Team
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-4xl font-medium text-slate-900 text-center tracking-tight leading-[1.1]">
                        Team Behind Wonders
                    </h2>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {loading ? (
                        <div className="col-span-full text-center py-10 opacity-50">Loading team...</div>
                    ) : dataToShow.map((member) => {
                        return (
                        <div
                            key={member._id}
                            className="group relative rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/5] relative overflow-hidden bg-slate-100 rounded-[2rem]">
                                <img
                                    src={getImageUrl(member.image || member.photo) || undefined}
                                    alt={member.name}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay Shadow (Always visible but subtle) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                {/* Content Badge - Glassmorphism */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="backdrop-blur-md bg-white/80 border border-white/40 p-5 rounded-2xl shadow-xl transform transition-all duration-500 group-hover:bg-white/95 group-hover:px-6">
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 tracking-tight">
                                            {member.name}
                                        </h3>
                                        <p className="text-slate-600 text-sm font-medium tracking-wide">
                                            {member.position || member.role}
                                        </p>
                                        {member.socialLinks?.linkedin && (
                                            <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 text-xs font-bold">LinkedIn →</a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Shadow Effect */}
                            <div className="absolute inset-0 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Team;
