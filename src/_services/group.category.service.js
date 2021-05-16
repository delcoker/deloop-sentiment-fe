// import { BehaviorSubject } from 'rxjs';
//
// import config from 'config';
import {axiosWrapper} from '../_helpers';
//
// const userSubject = new BehaviorSubject(null);
// // const baseUrl = `${config.apiUrl}/accounts`;
// const baseUrl = `${config.apiUrl}`;
//
export const groupCategoryService = {
    getAll,
    getAllCategoryData,
    // getById,
    // create,
    // update,
    // delete: _delete,
    // user: userSubject.asObservable(),
};

function getAll() {
    return axiosWrapper.get(`/group/categories`)
        .then(data => getAllCategoryData(data, data[0].id));
}

function getAllCategoryData(group_category_data, group_category_id) {
    // console.log(group_category_data, group_category_id)
    let response = {};
    response.all = group_category_data;

    const group = group_category_data.find(group_category => group_category.id === group_category_id);
    let dataSet = group_category_data && group_category_data.length > 0 ? group.categories : group_category_data;

    dataSet.forEach(category => {
        category.name = category.category_name;
        if (category.keywords) {
            if (category.keywords.length > 0) {
                category.keywordz = category && category["keywords"]
                    .reduce((acc, two) => ((acc && acc.keywords) + " " + two.keywords), "");
                return category;
            }
            category.keywords = "👀";
        }
        return category;
    });

    // dataSet = dataSet.map(data => {
    //     data.keywords = data.keywordz;
    //     return data;
    // })

    // console.log("dataSet", dataSet)

    response.categories = dataSet;
    return response;
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
