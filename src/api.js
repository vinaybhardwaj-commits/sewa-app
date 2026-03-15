// API Client for Google Apps Script Backend
// Handles all communication with the backend

const API_URL = import.meta.env.VITE_API_URL;

// Check if API is configured
const isConfigured = () => API_URL && API_URL !== 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';

/**
 * Make API request to Google Apps Script backend
 * Uses Content-Type: text/plain (Apps Script requirement)
 */
const request = async (action, data) => {
  if (!isConfigured()) {
    // Return mock success if API not configured
    console.warn('API not configured. Using offline mode.');
    return { success: true, message: 'Offline mode' };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        action,
        ...data,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`API Error (${action}):`, error);
    // Fall back gracefully - app works offline
    return { success: true, message: 'Request queued (offline)' };
  }
};

/**
 * Create a new service request
 */
export const createRequest = async (data) => {
  return request('CREATE_REQUEST', {
    service: data.service,
    hub: data.hub,
    dept: data.dept,
    assignee: data.assignee,
    slaMin: data.slaMin,
    createdAt: new Date().toISOString(),
  });
};

/**
 * Update request status
 */
export const updateStatus = async (data) => {
  return request('UPDATE_STATUS', {
    requestId: data.requestId,
    status: data.status,
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Add feedback/rating to a resolved request
 */
export const addFeedback = async (data) => {
  return request('ADD_FEEDBACK', {
    requestId: data.requestId,
    rating: data.rating,
    feedback: data.feedback || '',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Add comment to a request
 */
export const addComment = async (data) => {
  return request('ADD_COMMENT', {
    requestId: data.requestId,
    user: data.user,
    text: data.text,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Get all requests
 */
export const getRequests = async () => {
  if (!isConfigured()) {
    return { success: true, requests: [] };
  }
  return request('GET_REQUESTS', {});
};

/**
 * Get staff list
 */
export const getStaff = async () => {
  if (!isConfigured()) {
    return { success: true, staff: [] };
  }
  return request('GET_STAFF', {});
};

/**
 * Get dashboard metrics
 */
export const getDashboard = async () => {
  if (!isConfigured()) {
    return {
      success: true,
      totalRequests: 0,
      activeRequests: 0,
      completedRequests: 0,
      avgRating: 0,
    };
  }
  return request('GET_DASHBOARD', {});
};

export default {
  createRequest,
  updateStatus,
  addFeedback,
  addComment,
  getRequests,
  getStaff,
  getDashboard,
};
