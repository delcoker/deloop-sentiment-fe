import AppBar from '@material-ui/core/AppBar'
import React, {useContext} from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import {TopicsContextData} from "../../router/context.group.category";
import {groupCategoryService} from "../../_services/group.category.service";
// import { useIntl } from 'react-intl'

const SubHeaderComponent = () => {
    const {tab, setTab, groupCategoryData, setData, setFilteredData} = useContext(TopicsContextData);

    const topics = () => {
        if (groupCategoryData && groupCategoryData.length > 0) {
            // <>	<option aria-label="None" value=""/>
            return groupCategoryData &&
                groupCategoryData.map(groupCategory =>
                    <Tab label={groupCategory['group_category_name']}
                         value={groupCategory['id']}
                         key={groupCategory['id']}
                    />
                )
        }
    }

    return (
        <>
            <AppBar position="static">
                <Tabs
                    value={tab}
                    onChange={(e, t) => {
                        setTab(t);
                        setData(groupCategoryService.getAllCategoryData(groupCategoryData, t).categories)
                        setFilteredData(groupCategoryService.getAllCategoryData(groupCategoryData, t).categories)
                    }}
                    aria-label="simple tabs example"
                    centered
                >
                    {topics()}
                </Tabs>
            </AppBar>
        </>
    )
}
export default SubHeaderComponent