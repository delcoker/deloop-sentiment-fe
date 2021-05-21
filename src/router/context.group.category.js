import React, {useEffect, useState} from "react";
import {groupCategoryService} from "../_services/group.category.service";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const TopicsContextData = React.createContext({});

export const TopicsContext = props => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [groupCategoryData, setGroupCategoryData] = useState([]);
    const [tab, setTab] = useState();

    useEffect(() => {
        groupCategoryService.getAll()
            .then(response => {
                const data = groupCategoryService.getAllCategoryData(response.all, response.all[0].id).categories;
                setTab(response.all[0].id);
                setGroupCategoryData(response.all);
                setData(data);
                setFilteredData(data);
            });
    }, []);

    return (
        <TopicsContextData.Provider
            value={{
                data,
                setData,
                filteredData,
                setFilteredData,
                tab,
                setTab,
                groupCategoryData,
                setGroupCategoryData
            }} // value of your context
        >
            {props.children}
        </TopicsContextData.Provider>
    );
}