m/**
 * Run All Seeders
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin.model');
const Product = require('../models/Product.model');
const Testimonial = require('../models/Testimonial.model');
const TeamMember = require('../models/TeamMember.model');
const FAQ = require('../models/FAQ.model');

const runAll = async () => {
    try {
        await connectDB();
        console.log('🚀 Running all seeders...\n');

        // Admin
        const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@zaploom.com' });
        if (!existingAdmin) {
            const admin = new Admin({
                email: process.env.ADMIN_EMAIL || 'admin@zaploom.com',
                password: process.env.ADMIN_PASSWORD || 'admin123',
                name: process.env.ADMIN_NAME || 'Admin User',
                role: process.env.ADMIN_ROLE || 'super_admin',
                isActive: true,
            });
            await admin.save();
            console.log('✅ Admin seeded');
        } else {
            console.log('⚠️  Admin already exists, skipping...');
        }

        // Products
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            const products = require('./data/products.data');
            await Product.insertMany(products);
            console.log(`✅ ${products.length} products seeded`);
        } else {
            console.log(`⚠️  ${productCount} products already exist, skipping...`);
        }

        // Testimonials
        const testimonialCount = await Testimonial.countDocuments();
        if (testimonialCount === 0) {
            const testimonials = require('./data/testimonials.data');
            await Testimonial.insertMany(testimonials);
            console.log(`✅ ${testimonials.length} testimonials seeded`);
        } else {
            console.log(`⚠️  ${testimonialCount} testimonials already exist, skipping...`);
        }

        // Team Members
        const teamCount = await TeamMember.countDocuments();
        if (teamCount === 0) {
            const teamMembers = require('./data/team.data');
            await TeamMember.insertMany(teamMembers);
            console.log(`✅ ${teamMembers.length} team members seeded`);
        } else {
            console.log(`⚠️  ${teamCount} team members already exist, skipping...`);
        }

        // FAQs
        const faqCount = await FAQ.countDocuments();
        if (faqCount === 0) {
            const faqs = require('./data/faqs.data');
            await FAQ.insertMany(faqs);
            console.log(`✅ ${faqs.length} FAQs seeded`);
        } else {
            console.log(`⚠️  ${faqCount} FAQs already exist, skipping...`);
        }

        console.log('\n✅ All seeders completed!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Run All Seeders Error:', err);
        process.exit(1);
    }
};

runAll();
