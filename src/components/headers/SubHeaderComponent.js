import AppBar from '@material-ui/core/AppBar'
import React, {useContext, useState} from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import {TopicsContextData} from "../../contexts/context.group.category";
import {groupCategoryService} from "../../_services/group.category.service";
import memoize from "memoize-one";
import {IconButton} from "@material-ui/core";
import {AddCircleOutlined, EditOutlined, RemoveCircle} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "../../_helpers/use_styles/styles";
import AddEditFormDialogGroupCategory from "../AddEditFormDialogGroupCategory";
// import { useIntl } from 'react-intl'

const SubHeaderComponent = (props) => {
    let {
        tab,
        setTab,
        groupCategoryData,
        setData,
        setFilteredData,
        setGroupCategoryData
    } = useContext(TopicsContextData);

    const [theme, setTheme] = useState("dark");
    const [open, setOpen] = useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [showTextField1, setShowTextField1] = useState("Group");
    // const [showTextField2, setShowTextField2] = useState("Keywords");

    const classes = styles();

    const getTopics = () => {
        if (groupCategoryData && groupCategoryData.length > 0) {
            const arr = groupCategoryData &&
                groupCategoryData.map(groupCategory =>
                    <Tab label={groupCategory['group_category_name']}
                         value={groupCategory['id']}
                         key={groupCategory['id']}
                    />
                );
            arr.push(...actions);

            return arr;
        }
    }

    const deleteHandler = (params) => {
        groupCategoryService.delete(params)
            .then((response) => {
                console.log(response)
                updateGroupCategoryState(params)
                // alert(response.message)
                // props.setAlertOpen(true);
                // props.setAlertMessage(`${response.message}`);
                // props.setAlertType(AlertType.WARNING);
                // setFilteredData(response.filteredData);
            })
    }

    function updateGroupCategoryState(group_category_id) {

        let newGroupCategoryData = [...groupCategoryData];

        for (let i = 0; i < newGroupCategoryData.length; i++) {
            if (newGroupCategoryData[i].id === group_category_id) {
                newGroupCategoryData.splice(i, 1);
                break;
            }
        }

        console.log(newGroupCategoryData)

        setGroupCategoryData(newGroupCategoryData);
        //     setGroupCategoryDataEdits(newGroupCategoryData);
    }

    const DeleteAction = memoize(() => (
        <Tooltip title={'Remove a group'}>
            <IconButton onClick={() => {
                if (window.confirm(`Are you sure you want to delete this group?`))
                    deleteHandler(tab);
            }}
                        size={"small"}
                        style={{
                            marginLeft: 3 + 'em',
                            marginRight: 1 + 'em'
                        }}
                        edge="start">
                <RemoveCircle style={{fontSize: '32px'}}
                              color="secondary" />
            </IconButton>
        </Tooltip>
    ));

    const AddAction = memoize(() => (
        <Tooltip title={'Add a group'}>
            <IconButton onClick={() => {
                setOpen(true);
                setAddOrEdit("Add")
            }}
                        size={"small"}
                        edge="start">
                <AddCircleOutlined
                    style={{
                        fill: "#4CAF50",
                        fontSize: '32px'
                    }}
                />
            </IconButton>
        </Tooltip>
    ));

    const UpdateAction = memoize(() => (
        <Tooltip title={'Edit a group'}>
            <IconButton onClick={() => {
                setOpen(true);
                setAddOrEdit("Edit")
            }}
                        size={"small"}
                        edge="start"
                        style={{
                            marginRight: 1 + 'em'
                        }}
            >
                <EditOutlined
                    style={{
                        fill: "#F6E819",
                        fontSize: '32px'
                    }}
                />
            </IconButton>
        </Tooltip>
    ));

    const actions = [
        <DeleteAction value={"delete"} key={"delete"} />,
        <UpdateAction value={"update"} key={"update"} />,
        <AddAction value={"add"} key={"add"} />
    ];
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
                    variant={groupCategoryData.length > 5 ? "scrollable" : "standard"}
                    scrollButtons="auto"
                    aria-label="simple tabs example"
                    centered
                >
                    {getTopics()}
                </Tabs>
                <AddEditFormDialogGroupCategory
                    open={open}
                    onClose={() => setOpen(false)}
                    title={
                        `${addOrEdit} ${showTextField1}`
                    }
                    addOrEdit={addOrEdit}
                    showTextField1={showTextField1}
                />
            </AppBar>


        </>
    )
};
export default SubHeaderComponent