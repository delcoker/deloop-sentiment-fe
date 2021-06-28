import {axiosWrapper} from '../_helpers';

const apiRoute = `/group`;

export const groupCategoryService = {
    getAll,
    getAllCategoryData,
    // getById,
    create,
    update,
    delete: _delete,
};

function getAll() {
    return axiosWrapper.get(`${apiRoute}/categories`)
        .then(data => getAllCategoryData(data, data[0] && data[0].id));
}

function getAllCategoryData(group_category_data, group_category_id) {
    // console.log(group_category_data, group_category_id)
    let response = {};
    response.all = group_category_data;

    const group = group_category_data.find(group_category => group_category.id === group_category_id);
    let dataSet = group_category_data && group_category_data.length > 0 ? group.categories : group_category_data;

    // console.log(dataSet);

    dataSet.forEach(category => {
        category.name = category.category_name;
        if (category.keywords) {
            if (category.keywords.length > 0) {
                category.keywordz = category && category["keywords"]
                    .reduce((acc, two) =>
                        ((acc && acc.keywords) + " " + two.keywords && two.keywords ? two.keywords : "👀"), "");
                return category;
            }
            category.keywordz = "👀";
        }
        return category;
    });

    response.categories = dataSet;
    // console.log(response);
    return response;
}

function create(params) {
    let requestData = new FormData();
    requestData.append("group_category_name", params.name.trim());

    return axiosWrapper.post(`${apiRoute}/category/create/`, requestData);
}

function update(params) {
    let requestData = new FormData();
    // requestData.append("token", accountService.getUserSession().token);
    requestData.append("group_category_name", params.name.trim());
    requestData.append("group_category_id", params.group_category_id);

    return axiosWrapper.post(`${apiRoute}/category/update/${params.group_category_id}`, requestData);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return axiosWrapper.get(`${apiRoute}/categories`)
        .then(response => {
            if (response.length < 2) {
                throw Error("At least one group is mandatory");
            }
            return axiosWrapper.post(`${apiRoute}/category/delete/${id}`);
        })
}
