import axios from 'axios';
// Next we make an 'instance' of it
const axiosConfig = axios.create({
  // baseURL: process.env.NODE_ENV === "development" ?
  //     process.env.REACT_APP_DEV_BACKEND_API_URL :
  //     process.env.REACT_APP_PROD_BACKEND_API_URL,
  // baseURL: 'http://localhost:8000',//http(s)://127.0.0.1
  baseURL: 'http://192.168.0.54:8000',
  headers: {
    'access_token': localStorage.getItem('access_token'),

  }
});

export default axiosConfig;
