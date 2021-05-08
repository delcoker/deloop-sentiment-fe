import axiosConfig from './axiosConfig';
import { accountService } from "../_services";

export const axiosWrapper = {
		get,
		post,
		put,
		delete: _delete
}

function get(url) {
		// const requestOptions = {
		//     method: 'GET',
		//     headers: authHeader(url)
		// };
		return axiosConfig.get(url).then(handleResponse);
}

function post(url, body) {
		// const requestOptions = {
		// 		headers: { /**'Content-Type': 'application/json', ...authHeader(url) **/},
		// 		body: (body)
		// };
		return axiosConfig.post(url, body).then(handleResponse);
}


function put(url, body) {
		return axiosConfig.put(url, body).then(handleResponse);
}


// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
		return axiosConfig.delete(url).then(handleResponse);
}

// // helper functions
//
// function authHeader(url) {
//     // return auth header with jwt if user is logged in and request is to the api url
//     const user = accountService.userValue;
//     const isLoggedIn = user && user.jwtToken;
//     const isApiUrl = url.startsWith(config.apiUrl);
//     if (isLoggedIn && isApiUrl) {
//         return { Authorization: `Bearer ${user.jwtToken}` };
//     } else {
//         return {};
//     }
// }
//
function handleResponse(response) {
		// console.log(response)
		if (response.status !== 200) {
				if ([401, 403].includes(response.status)) {
						// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
						accountService.logout();
				}

				const error = (response.data && response.data.message) || response.statusText;
				return Promise.reject(error);
		}
		// return data;
		return response.data;
}