// globalapi.js
const axios = require("axios");

const sendEmail = (data) => {
  return axios.post('/api/send', data);
};

export default {
  sendEmail
};
