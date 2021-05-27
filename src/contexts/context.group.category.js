import React, {useEffect, useState} from "react";
import {groupCategoryService} from "../_services/group.category.service";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const TopicsContextData = React.createContext({});

export const TopicsContext = props => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [groupCategoryData, setGroupCategoryData] = useState([]);
    const [groupCategoryDataEdits, setGroupCategoryDataEdits] = useState([]);
    const [tab, setTab] = useState();

    useEffect(() => {
        groupCategoryService.getAll()
            .then(response => {
                if (response.all[0]) {
                    const categoryData = groupCategoryService.getAllCategoryData(response.all, response.all[0].id).categories;
                    setTab(response.all[0].id);
                    setGroupCategoryData(response.all);
                    setGroupCategoryDataEdits(response.all);
                    setData(categoryData);
                    setFilteredData(categoryData);
                }
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
                setGroupCategoryData,
                groupCategoryDataEdits,
                setGroupCategoryDataEdits
            }} // value of your context
        >
            {props.children}
        </TopicsContextData.Provider>
    );
}