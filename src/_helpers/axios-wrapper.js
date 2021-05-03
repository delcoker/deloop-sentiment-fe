import axiosConfig from './axiosConfig';

export const axiosWrapper = {
		// get,
		post,
		// put,
		// delete: _delete
}
//
// function get(url) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader(url)
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }
//
// let bodyFormData = new FormData();
// bodyFormData.append("username", email);
// bodyFormData.append("password", password);
//
// axiosConfig.post(`/login`,
// 	bodyFormData,
// 	// {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
// )
function post(url, body) {
		const requestOptions = {
				headers: { /**'Content-Type': 'application/json', ...authHeader(url) **/},
				body: (body)
		};
		return axiosConfig.post(url, body).then(handleResponse);
}

//
// function put(url, body) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', ...authHeader(url) },
//         body: JSON.stringify(body)
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }
//
// // prefixed with underscored because delete is a reserved word in javascript
// function _delete(url) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader(url)
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }
//
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
		return response.data;
		// if (response.status !== 200) {
		// 		if ([401, 403].includes(response.status)) {
		// 				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
		// 				accountService.logout();
		// 		}
		//
		// 		const error = (data && data.message) || response.statusText;
		// 		return Promise.reject(error);
		// }
		// return data;
}