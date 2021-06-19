import React, {useCallback, useContext, useState} from "react";
import memoize from 'memoize-one'; // https://stackoverflow.com/questions/61255053/react-usecallback-with-parameter
import {Box, Card, CardContent, CardHeader, FormControlLabel, Grid, IconButton, Switch,} from "@material-ui/core";
// core components
import AddEditFormDialogTopic from "../components/AddEditFormDialogTopic";
import DataTable from "react-data-table-component";
import ActionComponent from "../components/ActionComponent";
import {categoryService} from "../_services/category.service";
import {customDataTableStyles} from "../_helpers/use_styles/styles";
import {AlertType} from "../_services";
import {TopicsContext} from "../contexts/context.group.category";
import {Delete} from "@material-ui/icons";
import {AlertContext} from "../contexts/context.alert";
import CustomizedProgressBars from "../components/spinners/CustomizedProgressBars";

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
        maxWidth: "30%",
        wrap: true
    },
    {
        name: "Keywords",
        selector: "keywordz",
        sortable: true,
        wrap: true
    }
];

const TopicsPage = React.memo((props) => {
    const {setAlertOpen, setAlertMessage, setAlertType} = useContext(AlertContext);
    const {data, setData, filteredData, setFilteredData, loading, setLoading} = useContext(TopicsContext);
    const [theme, setTheme] = useState("dark");
    const [filterText, setFilterText] = useState("");
    const [open, setOpen] = useState(false);
    const [expandOnRowClick, setExpandOnRowClick] = useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [rowData, setRowData] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const [showTextField1, setShowTextField1] = useState("Category");
    const [showTextField2, setShowTextField2] = useState("Keywords");
    // const [loading, setLoading] = React.useState(true);

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClearSelectedRows, setToggleClearSelectedRows] = useState(false);

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
                        (data["keywordz"] && data["keywordz"]
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
            <Delete color="primary" />
        </IconButton>
    ));

    const handleSelectedRows = (sel) => {
        setSelectedRows(sel.selectedRows);
    }

    const deleteSelectedRows = () => {
        setLoading(true);
        const ids = selectedRows.map(selectedRow => selectedRow.id);
        const resolved = categoryService.delete(ids);

        let errors = 0;
        resolved.forEach((response) => {
            if (response.message !== "Category has been deleted successfully") {
                errors++;
            }
        });

        if (errors > 0) {
            setAlertOpen(true);
            setAlertMessage(`DELETE FAIL for: ${errors}`);
            setAlertType(AlertType.ERROR);
            setLoading(false);
        }

        let newFilteredData = [];

        for (let i = 0; i < data.length; i++) {
            if (!ids.includes(data[i].id)) {
                newFilteredData.push(data[i]);
            }
        }

        setAlertOpen(true);
        setAlertMessage(`${resolved.length} ${resolved.length > 1 ? "categories" : 'category'} DELETED`);
        setFilteredData(newFilteredData);
        setData(newFilteredData);
        setAlertType(AlertType.WARNING);
        setLoading(false);
        // .catch(error => {
        //     setAlertOpen(true);
        //     setAlertMessage(`DELETE FAIL ${error.message}`);
        //     setAlertType(AlertType.ERROR);
        //     setLoading(false);
        // });
        setToggleClearSelectedRows(!toggleClearSelectedRows);
    };

    const addOrEditPresets = useCallback(memoize((row, crudType, categoryType, showDropDown, showTextField1, showTextField2) => {
        setOpen(!open);
        setAddOrEdit(crudType);
        // setDialogType(categoryType);
        setShowDropDown(showDropDown);
        setShowTextField1(showTextField1);
        setShowTextField2(showTextField2);
        setRowData(row);
    }), []);

    const handleOnRowClicked = ((row, editCategory, showDropDown, showTextField1, showTextField2) => {
        addOrEditPresets(row, "Edit", editCategory, showDropDown, showTextField1, showTextField2);
        return setExpandOnRowClick(!expandOnRowClick);
    });

    return (
        <>
            <br />
            <br />
            <Card>
                <CardHeader
                    title="Categories"
                    titleTypographyProps={{
                        component: Box,
                        marginBottom: "0!important",
                        variant: "h5",
                    }}
                />
            </Card>
            <br />
            <Card>

                <CardContent>

                    <Grid container spacing={3} justify="space-between">
                        <AddEditFormDialogTopic
                            open={open}
                            onClose={() => setOpen(false)}
                            title={`${addOrEdit} Category`}
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
                            setAlertMessage={setAlertMessage}
                            setAlertOpen={setAlertOpen}
                            setAlertType={setAlertType}
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

                            {/* fn = (a, b, c) => (row) => {}  */}
                            {/*const useCase =  fn('a', 'bob', 'car')  */}

                            <DataTable
                                title="Be on the lookout 👀"
                                progressPending={loading}
                                progressComponent={<CustomizedProgressBars />}
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
                                onRowClicked={row => handleOnRowClicked(row, "don't need this anymore", false, "Category", "Keywords")}
                                expandOnRowClicked={false}
                                expandableRowsComponent={<></>}
                                selectableRows
                                clearSelectedRows={toggleClearSelectedRows}
                                onSelectedRowsChange={handleSelectedRows}
                                customStyles={customDataTableStyles}
                                striped
                                paginationRowsPerPageOptions={[20, 40, 60]}
                                paginationPerPage={20}
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
