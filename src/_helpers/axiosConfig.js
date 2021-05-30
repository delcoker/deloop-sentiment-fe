import axios from 'axios';
// Next we make an 'instance' of it
const axiosConfig = axios.create({
  // baseURL: process.env.NODE_ENV === "development" ?
  //     process.env.REACT_APP_DEV_BACKEND_API_URL :
  //     process.env.REACT_APP_PROD_BACKEND_API_URL,
  // baseURL: 'http://localhost:8000',//http(s)://127.0.0.1
  // baseURL: 'http://192.168.2.108:8000',
  baseURL: 'https://dwm-social-media-backend.herokuapp.com/',
});

export default axiosConfig;
