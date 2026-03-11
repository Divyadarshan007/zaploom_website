const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { createTeamMemberSchema, updateTeamMemberSchema } = require('./validators/team-member.validator');
const { createTeamMember, getTeamMembers, getTeamMemberById, updateTeamMember, deleteTeamMember } = require('./controllers/team-member.controller');

router.post('/', adminAuthGuard, validate(createTeamMemberSchema), createTeamMember);
router.get('/', adminAuthGuard, getTeamMembers);
router.get('/:id', adminAuthGuard, getTeamMemberById);
router.put('/:id', adminAuthGuard, validate(updateTeamMemberSchema), updateTeamMember);
router.delete('/:id', adminAuthGuard, deleteTeamMember);

module.exports = router;
