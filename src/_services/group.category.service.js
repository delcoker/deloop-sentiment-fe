// import { BehaviorSubject } from 'rxjs';
//
// import config from 'config';
import { axiosWrapper } from '../_helpers';
//
// const userSubject = new BehaviorSubject(null);
// // const baseUrl = `${config.apiUrl}/accounts`;
// const baseUrl = `${config.apiUrl}`;
//
export const groupCategoryService = {
		getAll,
		// getById,
		// create,
		// update,
		// delete: _delete,
		// user: userSubject.asObservable(),
};

function getAll() {
		return axiosWrapper.get(`/group/categories`)
			.then(data => {
					let dataSet = data && data.length > 0 ? data[0].categories : data;
					dataSet.map(category => {
							category.name = category.category_name;
							if (category.keywords) {
									if (category.keywords.length > 0) {
											category.keywords = category && category["keywords"]
												.reduce((acc, two) => ((acc && acc.keywords) + " " + two.keywords), "");
											return category;
									}
									category.keywords = "👀";
							}
							return category
					});
					return dataSet;
			});
}

// function getGroupCategories(group_category_id) {
// 		// revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
// 		// fetchWrapper.post(`${baseUrl}/revoke-token`, {});
// 		// stopRefreshTokenTimer();
// 		removeUserSession();
// 		history.push('/login');
// }

//
// // function refreshToken() {
// //
// // 		const user = getUserSession();
// // 		userSubject.next(user);
// //
// // 		return user;
// //
// // 		// return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
// // 		// 	.then(user => {
// // 		// 			// publish user to subscribers and start timer to refresh token
// // 		// 			userSubject.next(user);
// // 		// 			startRefreshTokenTimer();
// // 		// 			return user;
// // 		// 	});
// // }
//
// function register(params) {
// 		return fetchWrapper.post(`${baseUrl}/register`, params);
// }
//
// function verifyEmail(token) {
// 		return fetchWrapper.post(`${baseUrl}/verify-email`, {token});
// }
//
// function forgotPassword(email) {
// 		return fetchWrapper.post(`${baseUrl}/forgot-password`, {email});
// }
//
// function validateResetToken(token) {
// 		return fetchWrapper.post(`${baseUrl}/validate-reset-token`, {token});
// }
//
// function resetPassword({token, password, confirmPassword}) {
// 		return fetchWrapper.post(`${baseUrl}/reset-password`, {token, password, confirmPassword});
// }
//
// function getAll() {
// 		return fetchWrapper.get(baseUrl);
// }
//
// function getById(id) {
// 		return fetchWrapper.get(`${baseUrl}/${id}`);
// }
//
// function create(params) {
// 		return fetchWrapper.post(baseUrl, params);
// }
//
// function update(id, params) {
// 		return fetchWrapper.put(`${baseUrl}/${id}`, params)
// 			.then(user => {
// 					// update stored user if the logged in user updated their own record
// 					if (user.id === userSubject.value.id) {
// 							// publish updated user to subscribers
// 							user = {...userSubject.value, ...user};
// 							userSubject.next(user);
// 					}
// 					return user;
// 			});
// }
//
// // prefixed with underscore because 'delete' is a reserved word in javascript
// function _delete(id) {
// 		return fetchWrapper.delete(`${baseUrl}/${id}`)
// 			.then(x => {
// 					// auto logout if the logged in user deleted their own record
// 					if (id === userSubject.value.id) {
// 							logout();
// 					}
// 					return x;
// 			});
// }
//
// // helper functions
//
// let refreshTokenTimeout;
//
// function startRefreshTokenTimer() {
// 		// parse json object from base64 encoded jwt token
// 		const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));
//
// 		// set a timeout to refresh the token a minute before it expires
// 		const expires = new Date(jwtToken.exp * 1000);
// 		const timeout = expires.getTime() - Date.now() - (60 * 1000);
// 		refreshTokenTimeout = setTimeout(refreshToken, timeout);
// }
//
// function stopRefreshTokenTimer() {
// 		clearTimeout(refreshTokenTimeout);
// }
//

// function getUserSession() {
// 		const userStr = localStorage.getItem('user');
// 		if (userStr) return (userStr);
// 		else return null;
// }
//
// // return the token from the session storage
// export const getToken = () => {
// 		return localStorage.getItem('token') || null;
// }
//
// // remove the token and user from the session storage
// export const removeUserSession = () => {
// 		localStorage.clear();
// }
//
// // set the token and user from the session storage
// export const setUserSession = (token, user, token_type,) => {
// 		localStorage.setItem('token', token);
// 		localStorage.setItem('first_name', (user.first_name));
// 		localStorage.setItem('last_name', (user.last_name));
// 		localStorage.setItem('user', JSON.stringify(user));
// 		localStorage.setItem('token_type', token_type);
// }