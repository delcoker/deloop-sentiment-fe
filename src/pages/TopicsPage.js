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
import {customDataTableStyles} from "../_helpers/use_styles/styles";
import AlertPopUp from "../components/snackbars/AlertPopUp";
import {AlertType} from "../_services";

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

const TopicsPage = React.memo((props) => {
    // const classes = useStyles();
    const [theme, setTheme] = useState("dark");
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([{}]);
    const [open, setOpen] = useState(false);
    // const [dialogType, setDialogType] = useState("");
    const [expandOnRowClick, setExpandOnRowClick] = useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [rowData, setRowData] = useState();
    const [showDropDown, setShowDropDown] = useState("Category");
    const [showTextField1, setShowTextField1] = useState("Category");
    const [showTextField2, setShowTextField2] = useState("Keywords");

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClearSelectedRows, setToggleClearSelectedRows] = useState(false);

    // const [alertMessage, setAlertMessage] = useState("");
    // const [alertOpen, setAlertOpen] = useState(false);
    // const [alertType, setAlertType] = useState("");

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

    const actions = (type) => <ActionComponent
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
                    let newFilteredData = [];
                    for (let i = 0; i < filteredData.length; i++) {
                        if (filteredData[i].id !== selectedRow.id) {
                            newFilteredData.push(filteredData[i]);
                        }
                    }
                    props.setAlertOpen(true);
                    props.setAlertMessage(`${response.message}`);
                    setFilteredData(newFilteredData);
                    setData(newFilteredData);
                    props.setAlertType(AlertType.WARNING);
                })
        });
        setToggleClearSelectedRows(!toggleClearSelectedRows);
    };

    const addOrEditPresets = (row, crudType, categoryType, showDropDown, showTextField1, showTextField2) => {
        setOpen(!open);
        setAddOrEdit(crudType);
        // setDialogType(categoryType);
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
            .then(response => {
                setData(response);
                setFilteredData(response);
            });
    }, []);

    return (
        <>
            <br/><br/>
            <br/><br/>
            <Card>
                <CardHeader
                    title="Categories"
                    titleTypographyProps={{
                        component: Box,
                        marginBottom: "0!important",
                        variant: "h5",
                    }}
                />

                <CardContent>
                    <Grid container spacing={3} justify="space-between">
                        {/*<AlertPopUp*/}
                        {/*    alertOpen={alertOpen}*/}
                        {/*    setAlertOpen={setAlertOpen}*/}
                        {/*    alertMessage={alertMessage}*/}
                        {/*    alertType={alertType}*/}
                        {/*/>*/}
                        <AddEditFormDialog
                            open={open}
                            onClose={() => setOpen(false)}
                            title={
                                `${addOrEdit} Category`
                            }
                            // type={categoryType}
                            addOrEdit={addOrEdit}
                            rowData={rowData}
                            setRowData={setRowData}
                            data={data}
                            setData={setData}
                            filteredData={filteredData}
                            setFilteredData={setFilteredData}
                            showDropDown={showDropDown}
                            showTextField1={showTextField1}
                            showTextField2={showTextField2}
                            setAlertMessage={props.setAlertMessage}
                            setAlertOpen={props.setAlertOpen}
                            setAlertType={props.setAlertType}
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

                            <DataTable
                                title="Be on the lookout 👀"
                                defaultSortField={"name"}
                                columns={columns}
                                data={filteredData}
                                theme={theme}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                expandableRows
                                contextActions={contextActions(deleteSelectedRows)}
                                actions={actions("user")}
                                onRowClicked={(row) =>
                                    handleOnRowClicked(row, "don't need this anymore", false, "Category", "Keywords")
                                }
                                expandOnRowClicked={false}
                                expandableRowsComponent={<></>}
                                // selectableRows
                                clearSelectedRows={toggleClearSelectedRows}
                                onSelectedRowsChange={handleSelectedRows}
                                customStyles={customDataTableStyles}
                                striped
                                // dense
                            />
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </>
    );
});

export default TopicsPage;
