const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Service = require('./src/models/Service.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zaploom_backend';

const services = [
    {
        title: 'Web Development',
        description: 'Custom, responsive websites built with modern frameworks to elevate your online presence.',
        image: '/gifs/webdevelopment.gif',
        icon: 'Globe',
        order: 1,
        isActive: true,
        isFeatured: true
    },
    {
        title: 'App Development',
        description: 'Native and cross-platform mobile applications that provide seamless user experiences.',
        image: '/gifs/appdevelopment.gif',
        icon: 'Smartphone',
        order: 2,
        isActive: true,
        isFeatured: true
    },
    {
        title: 'AI Integration',
        description: 'Leveraging cutting-edge AI technologies to automate processes and provide intelligent insights.',
        image: '/gifs/aiIntegration.gif',
        icon: 'Cpu',
        order: 3,
        isActive: true,
        isFeatured: true
    },
    {
        title: 'IT Consulting',
        description: 'Strategic IT advice and solutions tailored to your business goals and technological needs.',
        image: '/gifs/itconsulting.gif',
        icon: 'Server',
        order: 4,
        isActive: true,
        isFeatured: true
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Delete existing services if any (optional, but good for a fresh start in this task)
        await Service.deleteMany({});
        console.log('Cleared existing services');
        
        await Service.insertMany(services);
        console.log('Successfully seeded 4 services');
        
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
