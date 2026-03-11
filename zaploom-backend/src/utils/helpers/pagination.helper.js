/**
 * Pagination Helper
 */

const getPaginationParams = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};

const formatPaginationResponse = (data, page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    };
};

module.exports = { getPaginationParams, formatPaginationResponse };
