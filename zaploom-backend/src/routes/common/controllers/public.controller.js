/**
 * Common/Public Controller
 * Serves public API data for the frontend (no auth required)
 */

const Product = require('../../../models/Product.model');
const Testimonial = require('../../../models/Testimonial.model');
const TeamMember = require('../../../models/TeamMember.model');
const FAQ = require('../../../models/FAQ.model');
const ContactInquiry = require('../../../models/ContactInquiry.model');
const HomePage = require('../../../models/HomePage.model');
const AboutPage = require('../../../models/AboutPage.model');
const ContactPage = require('../../../models/ContactPage.model');
const GlobalSettings = require('../../../models/GlobalSettings.model');
const Service = require('../../../models/Service.model');
const { success, error } = require('../../../utils/response');

// Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return success(res, 'Products retrieved', { products });
    } catch (err) {
        console.error('Public Get Products Error:', err);
        return error(res, 'Failed to retrieve products');
    }
};

const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, isActive: true });
        if (!product) return error(res, 'Product not found', 404);
        return success(res, 'Product retrieved', { product });
    } catch (err) {
        console.error('Public Get Product Error:', err);
        return error(res, 'Failed to retrieve product');
    }
};

// Testimonials
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return success(res, 'Testimonials retrieved', { testimonials });
    } catch (err) {
        console.error('Public Get Testimonials Error:', err);
        return error(res, 'Failed to retrieve testimonials');
    }
};

// Team Members
const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return success(res, 'Team members retrieved', { teamMembers });
    } catch (err) {
        console.error('Public Get Team Members Error:', err);
        return error(res, 'Failed to retrieve team members');
    }
};

// FAQs
const getFaqs = async (req, res) => {
    try {
        const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return success(res, 'FAQs retrieved', { faqs });
    } catch (err) {
        console.error('Public Get FAQs Error:', err);
        return error(res, 'Failed to retrieve FAQs');
    }
};

// Contact Form Submission
const submitContact = async (req, res) => {
    try {
        const inquiry = new ContactInquiry(req.body);
        await inquiry.save();
        return success(res, 'Thank you! Your inquiry has been submitted.', { inquiry }, 201);
    } catch (err) {
        console.error('Submit Contact Error:', err);
        return error(res, 'Failed to submit inquiry');
    }
};

// Page Data
const getHomePage = async (req, res) => {
    try {
        let page = await HomePage.findOne();
        if (!page) page = {};
        return success(res, 'Home page data retrieved', { page });
    } catch (err) {
        console.error('Public Get Home Page Error:', err);
        return error(res, 'Failed to retrieve home page');
    }
};

const getAboutPage = async (req, res) => {
    try {
        let page = await AboutPage.findOne();
        if (!page) page = {};
        return success(res, 'About page data retrieved', { page });
    } catch (err) {
        console.error('Public Get About Page Error:', err);
        return error(res, 'Failed to retrieve about page');
    }
};

const getContactPage = async (req, res) => {
    try {
        let page = await ContactPage.findOne();
        if (!page) page = {};
        return success(res, 'Contact page data retrieved', { page });
    } catch (err) {
        console.error('Public Get Contact Page Error:', err);
        return error(res, 'Failed to retrieve contact page');
    }
};

const getGlobalSettings = async (req, res) => {
    try {
        let settings = await GlobalSettings.findOne();
        if (!settings) settings = {};
        return success(res, 'Global settings retrieved', { settings });
    } catch (err) {
        console.error('Public Get Global Settings Error:', err);
        return error(res, 'Failed to retrieve global settings');
    }
};

const getServices = async (req, res) => {
    try {
        const { featured } = req.query;
        const query = { isActive: true };
        if (featured === 'true') query.isFeatured = true;
        
        const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
        return success(res, 'Services retrieved', { services });
    } catch (err) {
        console.error('Public Get Services Error:', err);
        return error(res, 'Failed to retrieve services');
    }
};

module.exports = {
    getProducts, getProductBySlug,
    getTestimonials, getTeamMembers, getFaqs,
    submitContact,
    getHomePage, getAboutPage, getContactPage, getGlobalSettings,
    getServices,
};
