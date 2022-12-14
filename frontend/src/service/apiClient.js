import axios from 'axios';
import { baseURL } from './baseApi';

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
