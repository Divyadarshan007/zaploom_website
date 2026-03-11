/**
 * FAQ Seeder
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const FAQ = require('../models/FAQ.model');

const faqs = [
    {
        question: "What services does Zaploom offer?",
        answer: "Zaploom offers end-to-end digital solutions including custom website development, mobile app development (Android & iOS), SaaS product development, UI/UX design, and digital strategy consulting. We build everything from scratch, tailored specifically to your business needs.",
        isActive: true, order: 1
    },
    {
        question: "How long does it take to build a custom website or app?",
        answer: "The timeline depends on the project's scope and complexity. A standard website typically takes 2–4 weeks, while a full-featured mobile app or SaaS platform can take 6–12 weeks. We always provide a detailed project timeline before starting.",
        isActive: true, order: 2
    },
    {
        question: "Do you provide post-launch support and maintenance?",
        answer: "Absolutely! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, performance optimization, security updates, and feature enhancements to keep your product running at its best.",
        isActive: true, order: 3
    },
    {
        question: "What technologies do you use for development?",
        answer: "We use modern, industry-leading technologies including React, Next.js, Node.js, Flutter, React Native, MongoDB, PostgreSQL, and cloud services like AWS and Firebase. We choose the best tech stack based on your project requirements.",
        isActive: true, order: 4
    },
    {
        question: "Can I see progress during the development process?",
        answer: "Yes! We follow an agile development approach with regular updates and demo sessions. You'll have full visibility into the project progress through shared dashboards, weekly reviews, and a dedicated project manager.",
        isActive: true, order: 5
    },
    {
        question: "How do I get started with Zaploom?",
        answer: "Getting started is easy! Simply reach out to us through our contact form, email, or phone. We'll schedule a free consultation call to understand your requirements and provide a detailed proposal with timeline and cost estimate.",
        isActive: true, order: 6
    }
];

const seedFaqs = async () => {
    try {
        await connectDB();
        await FAQ.deleteMany({});
        await FAQ.insertMany(faqs);
        console.log(`✅ ${faqs.length} FAQs seeded successfully`);
        process.exit(0);
    } catch (err) {
        console.error('❌ FAQ Seeder Error:', err);
        process.exit(1);
    }
};

seedFaqs();
