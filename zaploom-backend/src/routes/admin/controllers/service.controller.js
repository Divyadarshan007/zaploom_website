/**
 * Service Controller
 */

const Service = require('../../../models/Service.model');
const { success, error } = require('../../../utils/response');
const { getPaginationParams, formatPaginationResponse } = require('../../../utils/helpers');

const createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        return success(res, 'Service created successfully', { service }, 201);
    } catch (err) {
        console.error('Create Service Error:', err);
        return error(res, 'Failed to create service');
    }
};

const getServices = async (req, res) => {
    try {
        const { page, limit, skip } = getPaginationParams(req.query);
        const { search } = req.query;
        const query = {};
        if (search) query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
        const [services, total] = await Promise.all([
            Service.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
            Service.countDocuments(query),
        ]);
        const { data, pagination } = formatPaginationResponse(services, page, limit, total);
        return success(res, 'Services retrieved successfully', { services: data, ...pagination });
    } catch (err) {
        console.error('Get Services Error:', err);
        return error(res, 'Failed to retrieve services');
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return error(res, 'Service not found', 404);
        return success(res, 'Service retrieved successfully', { service });
    } catch (err) {
        console.error('GetService Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid service ID', 400);
        return error(res, 'Failed to retrieve service');
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) return error(res, 'Service not found', 404);
        return success(res, 'Service updated successfully', { service });
    } catch (err) {
        console.error('Update Service Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid service ID', 400);
        return error(res, 'Failed to update service');
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return error(res, 'Service not found', 404);
        await Service.findByIdAndDelete(req.params.id);
        return success(res, 'Service deleted successfully');
    } catch (err) {
        console.error('Delete Service Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid service ID', 400);
        return error(res, 'Failed to delete service');
    }
};

module.exports = { createService, getServices, getServiceById, updateService, deleteService };
