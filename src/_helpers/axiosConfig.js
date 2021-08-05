import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: process.env.NODE_ENV === "development" ?
        process.env.REACT_APP_DEV_BACKEND_API_URL :
        process.env.REACT_APP_PROD_BACKEND_API_URL
});

export default axiosConfig;
