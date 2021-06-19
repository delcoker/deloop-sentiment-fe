import React, {useContext, useEffect, useState} from "react";
import {groupCategoryService} from "../_services/group.category.service";
import {UserContext} from "./context.user";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const TopicsContext = React.createContext({});

export const TopicsContextWrapper = props => {
    const {user} = useContext(UserContext);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [groupCategoryData, setGroupCategoryData] = useState([]);
    const [groupCategoryDataEdits, setGroupCategoryDataEdits] = useState([]);
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user !== undefined) {
            console.log("⚡️⚡️⚡️⚡⚡️⚡️⚡️");
            groupCategoryService.getAll()
                .then(response => {
                    if (response.all[0]) {
                        const categoryData = groupCategoryService.getAllCategoryData(response.all, response.all[0].id).categories;
                        setTab(response.all[0].id);
                        setGroupCategoryData(response.all);
                        setGroupCategoryDataEdits(response.all);
                        setData(categoryData);
                        setFilteredData(categoryData);
                        setLoading(false);
                    }
                }).catch(error => {
                console.log(error)
                setLoading(false);
            });
        }
    }, [user]);

    return (
        <TopicsContext.Provider
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
                setGroupCategoryDataEdits,
                loading,
                setLoading
            }} // value of your context
        >
            {props.children}
        </TopicsContext.Provider>
    );
}