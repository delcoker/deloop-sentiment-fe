import React, {useEffect, useState} from "react";
import memoize from 'memoize-one';
// react component that copies the given text inside your clipboard
// @material-ui/core components
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
// core components
import AddEditFormDialog from "../components/AddEditFormDialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";
import ActionComponent from "../components/ActionComponent";
import {groupCategoryService} from "../_services/group.category.service";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {categoryService} from "../_services/category.service";

const ProfilePage = ({withTime}) => {
    const [theme, setTheme] = useState("dark");
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([{}]);
    const [open, setOpen] = useState(false);
    // const [categoryType, setCategoryType] = useState("");
    const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [rowData, setRowData] = useState();
    const [showDropDown, setShowDropDown] = useState("Category");
    const [showTextField1, setShowTextField1] = useState("Category");
    const [showTextField2, setShowTextField2] = useState("Keywords");

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClearSelectedRows, setToggleClearSelectedRows] = useState(false);

    const columns = [
        {
            name: "id",
            selector: (category) => category.id,
            sortable: true,
            omit: true,
        },
        {
            name: "Category",
            selector: "name",
            sortable: true,
            maxWidth: "30%"
        },
        {
            name: "Keywords",
            selector: "keywords",
            sortable: true,
        }
    ];

    const handleChange = () => {
        if (theme === "dark") {
            setTheme("default");
        } else {
            setTheme("dark");
        }
    };

    const handleClear = () => {
        setFilterText("");
        setFilteredData(data);
    };

    const actions = (type) =>
        (
            <ActionComponent
                onFilter={(e) => {
                    const text = e.target.value;
                    setFilterText(text);
                    setFilteredData(
                        data.filter(
                            (data) =>
                                (data["name"] && data["name"]
                                    .toLowerCase()
                                    .includes(text.toLowerCase())) ||
                                (data["keywords"] && data["keywords"]
                                    .toLowerCase()
                                    .includes(text.toLowerCase()))
                        )
                    );
                }}
                onClear={handleClear}
                filterText={filterText}
                onClick={() => {
                    addOrEditPresets({}, "Add", type, "", "Category", "Keywords");
                }}
                tooltip={`add a new category`}
                placeholder={"filter by category & keywords"}
            />
        );

    const contextActions = memoize((deleteHandler) => (
        <IconButton onClick={deleteHandler}>
            <Delete color="primary"/>
        </IconButton>
    ));

    const handleSelectedRows = (sel) => {
        setSelectedRows(sel.selectedRows);
    }

    const deleteSelectedRows = data => {
        selectedRows.forEach(selectedRow => {
            categoryService.delete(selectedRow.id)
                .then((response) => {
                    alert(response.message);
                    let newFilteredData = [];
                    for (let i = 0; i < filteredData.length; i++) {
                        if (filteredData[i].id !== selectedRow.id) {
                            newFilteredData.push(filteredData[i]);
                        }
                    }
                    setFilteredData(newFilteredData);
                })
        });
        setToggleClearSelectedRows(!toggleClearSelectedRows);
    };

    const addOrEditPresets = (row, crudType, categoryType, showDropDown, showTextField1, showTextField2) => {
        setOpen(!open);
        setAddOrEdit(crudType);
        // setCategoryType(categoryType);
        setShowDropDown(showDropDown);
        setShowTextField1(showTextField1);
        setShowTextField2(showTextField2);
        setRowData(row);
    };

    const handleOnRowClicked = (row, editCategory, showDropDown, showTextField1, showTextField2) => {
        addOrEditPresets(row, "Edit", editCategory, showDropDown, showTextField1, showTextField2);
        return setExpandOnRowClick(!expandOnRowClick);
    };

    useEffect(() => {
        groupCategoryService.getAll()
            .then(data => {
                setData(data);
                setFilteredData(data);
            });
    }, [filteredData]);


    return (
        <>
            {/*<TabsComponent/>*/}

            <br/>
            <Card>
                <CardHeader
                    title="Profile"
                    titleTypographyProps={{
                        component: Box,
                        marginBottom: "0!important",
                        variant: "h5",
                    }}
                />

                <CardContent>
                    <Grid container spacing={3} justify="space-between">
                        <AddEditFormDialog
                            open={open}
                            onClose={() => setOpen(false)}
                            title={
                                `${addOrEdit} Category`
                            }
                            // addOrEdit={addOrEdit}
                            rowData={rowData}
                            setRowData={setRowData}
                            data={data}
                            setData={setData}
                            filteredData={filteredData}
                            setFilteredData={setFilteredData}
                            showDropDown={showDropDown}
                            showTextField1={showTextField1}
                            showTextField2={showTextField2}
                        />

                        <Grid item xs={12}>
                            <FormControlLabel
                                label="Dark Mode"
                                control={
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={handleChange}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default ProfilePage;
