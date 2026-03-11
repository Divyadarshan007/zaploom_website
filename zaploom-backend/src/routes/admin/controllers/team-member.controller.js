/**
 * Team Member Controller
 */

const TeamMember = require('../../../models/TeamMember.model');
const { success, error } = require('../../../utils/response');
const { getPaginationParams, formatPaginationResponse } = require('../../../utils/helpers');

const createTeamMember = async (req, res) => {
    try {
        const teamMember = new TeamMember(req.body);
        await teamMember.save();
        return success(res, 'Team member created successfully', { teamMember }, 201);
    } catch (err) {
        console.error('Create Team Member Error:', err);
        return error(res, 'Failed to create team member');
    }
};

const getTeamMembers = async (req, res) => {
    try {
        const { page, limit, skip } = getPaginationParams(req.query);
        const { search } = req.query;
        const query = {};
        if (search) query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } },
        ];
        const [teamMembers, total] = await Promise.all([
            TeamMember.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
            TeamMember.countDocuments(query),
        ]);
        const { data, pagination } = formatPaginationResponse(teamMembers, page, limit, total);
        return success(res, 'Team members retrieved successfully', { teamMembers: data, ...pagination });
    } catch (err) {
        console.error('Get Team Members Error:', err);
        return error(res, 'Failed to retrieve team members');
    }
};

const getTeamMemberById = async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return error(res, 'Team member not found', 404);
        return success(res, 'Team member retrieved successfully', { teamMember });
    } catch (err) {
        console.error('Get Team Member Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid team member ID', 400);
        return error(res, 'Failed to retrieve team member');
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!teamMember) return error(res, 'Team member not found', 404);
        return success(res, 'Team member updated successfully', { teamMember });
    } catch (err) {
        console.error('Update Team Member Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid team member ID', 400);
        return error(res, 'Failed to update team member');
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return error(res, 'Team member not found', 404);
        await TeamMember.findByIdAndDelete(req.params.id);
        return success(res, 'Team member deleted successfully');
    } catch (err) {
        console.error('Delete Team Member Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid team member ID', 400);
        return error(res, 'Failed to delete team member');
    }
};

module.exports = { createTeamMember, getTeamMembers, getTeamMemberById, updateTeamMember, deleteTeamMember };
