import axios from 'axios';

import config from 'config';

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});
