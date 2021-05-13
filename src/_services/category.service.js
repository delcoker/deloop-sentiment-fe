// import { BehaviorSubject } from 'rxjs';
//
// import config from 'config';
import { axiosWrapper } from '../_helpers';
import { accountService } from "./account.service";
//
// const userSubject = new BehaviorSubject(null);
// // const baseUrl = `${config.apiUrl}/accounts`;
// const baseUrl = `${config.apiUrl}`;
//
export const categoryService = {
		getAll,
		getById,
		create,
		update,
		delete: _delete
};

const apiRoute = `/categories`;

function getAll() {
		return axiosWrapper.post(`${apiRoute}`)
			.then(data => {
					return data;
			});
}

function getById(category_id) {
		return axiosWrapper.post(`${apiRoute}`, category_id);
}

function create(params) {
		let requestData = new FormData();
		requestData.append("token", accountService.getUserSession().token);
		requestData.append("category_name", params.name);
		requestData.append("group_category_id", params.group_category_id);
		requestData.append("keywords", [params.keywords]);


		return axiosWrapper.post(`${apiRoute}/create`, requestData);
}

function update(params) {
		let requestData = new FormData();
		requestData.append("token", accountService.getUserSession().token);
		requestData.append("category_name", params.name);
		requestData.append("group_category_id", params.group_category_id);
		requestData.append("keywords", [params.keywords]);

		console.log("requestData", params.keywords)

		return axiosWrapper.post(`${apiRoute}/update/${params.category_id}`, requestData);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
		return axiosWrapper.post(`${apiRoute}/delete/${id}`);
}


/**
function convertFormDataToJSON(formData) {

		// let bodyFormData = new FormData();
		// bodyFormData.append("token", accountService.getUserSession().token);
		// bodyFormData.append("category_name", params.name);
		// bodyFormData.append("group_category_id", 3);
		// bodyFormData.append("keywords", ([{"keywords": params.keywords}]));


		// let requestData = {};
		// requestData.token = accountService.getUserSession().token;
		// requestData["category_name"] = params.name;
		// requestData.group_category_id = 3;
		// // requestData["keywords"] = [{"keywords": params.keywords}];
		// requestData["keywords"] = [params.keywords];

		// const requestData = convertFormDataToJSON(bodyFormData)
		// console.log(requestData)
		// not working
		let object = {};
		formData.forEach((value, key) => object[key] = value);
		return JSON.stringify(object);
}
 **/
