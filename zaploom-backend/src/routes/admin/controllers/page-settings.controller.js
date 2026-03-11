/**
 * Page Settings Controller
 * Handles HomePage, AboutPage, ContactPage, and GlobalSettings
 */

const HomePage = require('../../../models/HomePage.model');
const AboutPage = require('../../../models/AboutPage.model');
const ContactPage = require('../../../models/ContactPage.model');
const GlobalSettings = require('../../../models/GlobalSettings.model');
const { success, error } = require('../../../utils/response');

// Generic get/update for singleton page models
const getOrCreateDoc = async (Model) => {
    let doc = await Model.findOne();
    if (!doc) {
        doc = new Model();
        await doc.save();
    }
    return doc;
};

// Home Page
const getHomePage = async (req, res) => {
    try {
        const page = await getOrCreateDoc(HomePage);
        return success(res, 'Home page retrieved', { page });
    } catch (err) {
        console.error('Get Home Page Error:', err);
        return error(res, 'Failed to retrieve home page');
    }
};

const updateHomePage = async (req, res) => {
    try {
        let page = await HomePage.findOne();
        if (!page) page = new HomePage();
        Object.assign(page, req.body);
        page.markModified('sections');
        page.markModified('seo');
        await page.save();
        return success(res, 'Home page updated', { page });
    } catch (err) {
        console.error('Update Home Page Error:', err);
        return error(res, 'Failed to update home page');
    }
};

// About Page
const getAboutPage = async (req, res) => {
    try {
        const page = await getOrCreateDoc(AboutPage);
        return success(res, 'About page retrieved', { page });
    } catch (err) {
        console.error('Get About Page Error:', err);
        return error(res, 'Failed to retrieve about page');
    }
};

const updateAboutPage = async (req, res) => {
    try {
        let page = await AboutPage.findOne();
        if (!page) page = new AboutPage();
        Object.assign(page, req.body);
        page.markModified('sections');
        page.markModified('seo');
        await page.save();
        return success(res, 'About page updated', { page });
    } catch (err) {
        console.error('Update About Page Error:', err);
        return error(res, 'Failed to update about page');
    }
};

// Contact Page
const getContactPage = async (req, res) => {
    try {
        const page = await getOrCreateDoc(ContactPage);
        return success(res, 'Contact page retrieved', { page });
    } catch (err) {
        console.error('Get Contact Page Error:', err);
        return error(res, 'Failed to retrieve contact page');
    }
};

const updateContactPage = async (req, res) => {
    try {
        let page = await ContactPage.findOne();
        if (!page) page = new ContactPage();
        Object.assign(page, req.body);
        page.markModified('sections');
        page.markModified('seo');
        await page.save();
        return success(res, 'Contact page updated', { page });
    } catch (err) {
        console.error('Update Contact Page Error:', err);
        return error(res, 'Failed to update contact page');
    }
};

// Global Settings
const getGlobalSettings = async (req, res) => {
    try {
        const settings = await getOrCreateDoc(GlobalSettings);
        return success(res, 'Global settings retrieved', { settings });
    } catch (err) {
        console.error('Get Global Settings Error:', err);
        return error(res, 'Failed to retrieve global settings');
    }
};

const updateGlobalSettings = async (req, res) => {
    try {
        let settings = await GlobalSettings.findOne();
        if (!settings) settings = new GlobalSettings();
        Object.assign(settings, req.body);
        settings.markModified('header');
        settings.markModified('footer');
        settings.markModified('siteSettings');
        await settings.save();
        return success(res, 'Global settings updated', { settings });
    } catch (err) {
        console.error('Update Global Settings Error:', err);
        return error(res, 'Failed to update global settings');
    }
};

module.exports = {
    getHomePage, updateHomePage,
    getAboutPage, updateAboutPage,
    getContactPage, updateContactPage,
    getGlobalSettings, updateGlobalSettings,
};
