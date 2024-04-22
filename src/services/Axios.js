import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.67.3:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
