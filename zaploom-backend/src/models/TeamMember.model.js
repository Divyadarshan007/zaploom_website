/**
 * Team Member Model
 */

const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true },
        role: { type: String, required: [true, 'Role is required'], trim: true },
        image: { type: String, default: '' },
        bio: { type: String, trim: true, default: '' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

teamMemberSchema.index({ isActive: 1, order: 1 });
teamMemberSchema.index({ createdAt: -1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
