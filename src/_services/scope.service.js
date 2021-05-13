// import { BehaviorSubject } from 'rxjs';
//
// import config from 'config';
import { axiosWrapper } from '../_helpers';
import { accountService } from "./account.service";

export const categoryService = {
		getAll,
		getById,
		create,
		update,
		delete: _delete
};

const apiRoute = `/scopes`;

function getAll() {
		return axiosWrapper.post(apiRoute)
			.then(data => {
					return data;
			});
}

function getById(scope_id) {
		return axiosWrapper.post(apiRoute, scope_id)
			.then(data => {
					return data;
			});
}

function create(params) {
		let requestData = new FormData();
		requestData.append("token", accountService.getUserSession().token);
		// requestData.append("scope_name", params.name);
		requestData.append("scope", params.scope);

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

