// import { BehaviorSubject } from 'rxjs';
//
// import config from 'config';
import {axiosWrapper} from '../_helpers';
import {accountService} from "./account.service";

export const scopeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const apiRoute = `/scopes`;

function getAll() {
    return axiosWrapper.get(apiRoute)
        .then(data => {
            let dataSet = data && data.length > 0 ? data[0].scope.split(",") : data;

            let i = 0;
            dataSet = dataSet.map((scope) => {
                const one = {};
                one.name = scope;
                one.id = data[0].id
                one.user_id = data[0].user_id
                one.index = ++i;
                return one;
            });
            // console.log(dataSet)
            return dataSet;
        });
}

function getById(scope_id) {
    return axiosWrapper.post(apiRoute, scope_id)
        .then(data => {
            return data;
        });
}

function create(params) {

    console.log(params.filteredData)

    const scope_id = params.filteredData[0].id;
    const withOutRow = params.filteredData;

    let scopes = params.name;
    withOutRow.forEach(scope => {
        scopes += "," + scope.name.trim();
    })

    const requestData = new FormData();
    requestData.append("token", accountService.getUserSession().token);
    requestData.append("scope_id", scope_id);
    requestData.append("scope", scopes);

    return axiosWrapper.post(`${apiRoute}/update/${scope_id}`, requestData);
}

function update(params) {

    const scope_id = params.scope_id;
    const withOutRow = params.filteredData.filter(scope => scope.index !== parseInt(params.index))

    // const scopes = withOutRow.reduce((acc, two) => {
    //
    //     console.log(acc, "acc")
    //     console.log(two, "acc")
    //     return ((acc && acc.name) + "," + (two && two.name));
    // }, "")

    let scopes = params.name;
    withOutRow.forEach(scope => {
        scopes += "," + scope.name.trim();
    })

    const requestData = new FormData();
    requestData.append("token", accountService.getUserSession().token);
    requestData.append("scope_id", scope_id);
    requestData.append("scope", scopes);

    return axiosWrapper.post(`${apiRoute}/update/${params.scope_id}`, requestData);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return axiosWrapper.post(`${apiRoute}/delete/${id}`);
}

