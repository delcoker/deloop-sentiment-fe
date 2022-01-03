import {axiosWrapper} from '../_helpers';

export const categoryService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getCategoryPosts
};

const apiRoute = `/categories`;

function getAll() {
    return axiosWrapper.get(`${apiRoute}`);
}

function getById(category_id) {
    return axiosWrapper.post(`${apiRoute}`, category_id);
}

function create(params) {
    let requestData = new FormData();
    // requestData.append("token", accountService.getUserSession().token);
    requestData.append("category_name", params.name.trim());
    requestData.append("group_category_id", params.group_category_id);
    requestData.append("keywords", params.keywords.trim());

    return axiosWrapper.post(`${apiRoute}/create`, requestData);
}

function update(params) {
    let requestData = new FormData();
    // requestData.append("token", accountService.getUserSession().token);
    requestData.append("category_name", params.name.trim());
    requestData.append("group_category_id", params.group_category_id);
    requestData.append("keywords", params.keywords.trim());

    return axiosWrapper.post(`${apiRoute}/update/${params.category_id}`, requestData);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(ids) {
    const deleted = ids.map(id => Promise.allSettled([axiosWrapper.post(`${apiRoute}/delete/${id}`)]));
    // console.log(deleted);
    if (deleted.length === ids.length) {
        return deleted;
    }
}

function getCategoryPosts(category_id) {
    return axiosWrapper.post(`${apiRoute}/posts/${category_id}`);
}