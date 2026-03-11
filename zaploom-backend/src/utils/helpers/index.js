const slugHelper = require('./slug.helper');
const paginationHelper = require('./pagination.helper');
const passwordHelper = require('./password.helper');

module.exports = {
    ...slugHelper,
    ...paginationHelper,
    ...passwordHelper,
};
