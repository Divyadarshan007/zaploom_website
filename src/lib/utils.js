const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Get the base URL (without /api)
const BASE_URL = API_URL.replace(/\/api$/, '');

/**
 * Consistently format image URLs.
 * Handles:
 * 1. Full URLs (http:// or https://)
 * 2. Local public images (starting with /images)
 * 3. Backend uploaded images (relative paths)
 */
export const getImageUrl = (path) => {
    if (!path) return null;

    // If it's already a full URL, return it
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // If it starts with /images, it's a local public asset
    if (path.startsWith('/images')) {
        return path;
    }

    // Otherwise, assume it's a backend upload and prefix with BASE_URL
    // Ensure path starts with / if it's not already
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // If if starts with uploads, it might need the base URL
    // Sometimes paths from backend come as 'uploads/filename.jpg'
    return `${BASE_URL}${cleanPath}`;
};
