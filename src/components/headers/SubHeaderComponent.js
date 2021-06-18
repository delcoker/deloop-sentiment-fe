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
// import styles from "../../_helpers/use_styles/styles";
import AddEditFormDialogGroupCategory from "../AddEditFormDialogGroupCategory";
import {AlertContext} from "../../contexts/context.alert";
import {AlertType} from "../../_services";
// import { useIntl } from 'react-intl'

const SubHeaderComponent = () => {
    const {
        setAlertOpen,
        setAlertMessage,
        setAlertType,
        // alertConfirmed,
        // setAlertConfirm,
        // setAlertConfirmMessage,
        // setAlertConfirmed,
        // setAlertActionHandler
    } = useContext(AlertContext);

    const {
        tab,
        setTab,
        groupCategoryData,
        setData,
        setFilteredData,
        setGroupCategoryData
    } = useContext(TopicsContextData);

    // const [theme, setTheme] = useState("dark");
    const [open, setOpen] = useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [showTextField1, setShowTextField1] = useState("Group");
    const group_name = groupCategoryData.find(g => g.id === tab) && groupCategoryData.find(g => g.id === tab).group_category_name;

    // const classes = styles();

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
                updateGroupCategoryState(params);
                setAlertOpen(true);
                setAlertMessage(`${group_name} DELETED`);
                setAlertType(AlertType.WARNING);

                // setAlertConfirmed(false);
                // setAlertConfirm(false);
                // setAlertConfirmMessage();
            })
            .catch(error => {

            })
    }

    // setAlertActionHandler(() => deleteHandler(tab))

    function updateGroupCategoryState(group_category_id) {

        let newGroupCategoryData = [...groupCategoryData];

        for (let i = 0; i < newGroupCategoryData.length; i++) {
            if (newGroupCategoryData[i].id === group_category_id) {
                newGroupCategoryData.splice(i, 1);
                break;
            }
        }
        const newTab = newGroupCategoryData[newGroupCategoryData.length - 1].id;
        setTab(newTab);
        setFilteredData(groupCategoryService.getAllCategoryData(groupCategoryData, newTab).categories)
        setGroupCategoryData(newGroupCategoryData);
    }

    const DeleteAction = memoize(() => (
        <Tooltip title={'Remove a group'}>
            <IconButton onClick={() => {
                // setAlertType(AlertType.ERROR)
                // setAlertMessage(`Are you sure you want to delete this group?`);
                // setAlertOpen(true);
                // setAlertConfirm(true);
                // setAlertConfirmMessage("YES");
                if (window.confirm(`Are you sure you want to delete this group?
                ${group_name}`))
                    deleteHandler(tab);
            }}
                        size={"small"}
                        style={{
                            marginLeft: 3 + 'em',
                            marginRight: 2 + 'em'
                        }}
                        edge="start">
                <RemoveCircle style={{fontSize: '32px'}}
                              color="secondary" />
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
                            marginRight: 2 + 'em'
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
                        setData(groupCategoryService.getAllCategoryData(groupCategoryData, t).categories);
                        setFilteredData(groupCategoryService.getAllCategoryData(groupCategoryData, t).categories);

                    }}
                    variant={groupCategoryData.length > 5 ? "scrollable" : "standard"}
                    centered={groupCategoryData.length <= 5}
                    scrollButtons="auto"
                    aria-label="simple tabs example"
                >
                    {getTopics()}
                </Tabs>
                <AddEditFormDialogGroupCategory
                    open={open}
                    onClose={() => setOpen(false)}
                    title={`${addOrEdit} ${showTextField1}`}
                    addOrEdit={addOrEdit}
                    showTextField1={showTextField1}
                />
            </AppBar>


        </>
    )
};
export default SubHeaderComponent