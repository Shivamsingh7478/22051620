const axios = require('axios');
const { API_BASE_URL, TIMEOUT_MS, API_ENDPOINTS } = require('../config/constants');

const fetchNumbers = async (type) => {
  try {
    const endpoint = API_ENDPOINTS[type.toUpperCase()];
    if (!endpoint) {
      throw new Error('Invalid number type');
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      timeout: TIMEOUT_MS
    });

    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return [];
  }
};

module.exports = { fetchNumbers };