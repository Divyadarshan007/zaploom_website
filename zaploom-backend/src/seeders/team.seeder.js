/**
 * Team Member Seeder
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const TeamMember = require('../models/TeamMember.model');

const teamMembers = [
    {
        name: "Kapil Singh",
        role: "Founder & CEO",
        image: "/images/team/Kapil_Singh.png",
        isActive: true, order: 1
    },
    {
        name: "Divyadarshan Das",
        role: "MERN Stack Developer",
        image: "/images/team/profile-img.png",
        isActive: true, order: 2
    }
];

const seedTeamMembers = async () => {
    try {
        await connectDB();
        await TeamMember.deleteMany({});
        await TeamMember.insertMany(teamMembers);
        console.log(`✅ ${teamMembers.length} team members seeded successfully`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Team Member Seeder Error:', err);
        process.exit(1);
    }
};

seedTeamMembers();
