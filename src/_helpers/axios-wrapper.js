import axiosConfig from './axiosConfig';
import {accountService} from "../_services";

export const axiosWrapper = {
    get,
    post,
    put,
    delete: _delete
}

function get(url) {
    authHeader();
    return axiosConfig.get(url).then(handleResponse).catch(handleResponseError);
}

function post(url, body) {
    authHeader();
    return axiosConfig.post(url, body).then(handleResponse).catch(handleResponseError);
}

function put(url, body) {
    authHeader();
    return axiosConfig.put(url, body).then(handleResponse).catch(handleResponseError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    authHeader();
    return axiosConfig.delete(url).then(handleResponse).catch(handleResponseError);
}

// helper functions
function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = accountService.getToken();
    if (token) {
        axiosConfig.defaults.headers.common['token'] = token;
    }
}

function handleResponse(response) {
    if (response.status !== 200) {
        if ([401, 403].includes(response.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            accountService.logout();
        }
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data;
}

function handleResponseError(error) {
    if (error.response && [401, 403].includes(error.response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        accountService.logout(error.response.data);
    }
    return Promise.reject(error);

}