import React, {useContext, useEffect, useState} from "react";
// react component that copies the given text inside your clipboard
// @material-ui/core components
// import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
// core components
import AddEditFormDialogScope from "./AddEditFormDialogScope";
import DataTable from "react-data-table-component";
import ActionComponent from "./ActionComponent";
import {scopeService} from "../_services/scope.service";
import memoize from "memoize-one";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {AlertType} from "../_services";
import {categoryService} from "../_services/category.service";
import {AlertContextData} from "../contexts/context.alert";

const columns = [
    {
        name: "id",
        selector: (scope) => scope.id,
        sortable: true,
        omit: true,
    },
    {
        name: "Scopes",
        selector: "name",
        sortable: true,
        wrap: true,
    },
];


const ScopesComponent = (props) => {
    const {setAlertOpen, setAlertMessage, setAlertType} = useContext(AlertContextData);
    const [loading, setLoading] = React.useState(false);
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([{}]);
    const [open, setOpen] = useState(false);
    // const [dialogType, setDialogType] = useState("");
    const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [rowData, setRowData] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const [showTextField1, setShowTextField1] = useState("Scope");
    const [showTextField2, setShowTextField2] = useState(false);

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClearSelectedRows, setToggleClearSelectedRows] = useState(false);

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
                                    .includes(text.toLowerCase()))
                        )
                    );
                }}
                onClear={handleClear}
                filterText={filterText}
                onClick={() => {
                    addOrEditPresets({}, "Add", type, "", "Scope", false);
                }}
                tooltip={`add a new category`}
                placeholder={"filter by scope"}
            />
        );

    const contextActions = memoize((deleteHandler) => (
        <IconButton onClick={deleteHandler}>
            <Delete color="primary" />
        </IconButton>
    ));

    const handleSelectedRows = (sel) => {
        setSelectedRows(sel.selectedRows);
    }

    const deleteSelectedRows = data => {
        setLoading(true);
        const indices = selectedRows.map(selectedRow => parseInt(selectedRow.index));
        const params = {filteredData, indices};

        scopeService.delete(params)
            .then((response) => {
                setAlertOpen(true);
                setAlertMessage(`${response.message}`);
                setAlertType(AlertType.WARNING);
                setFilteredData(response.filteredData);
                setData(response.filteredData);
            })
            .catch(error => {
                setAlertOpen(true);
                setAlertMessage(`${error.message}`);
                setAlertType(AlertType.ERROR);
            })
        setToggleClearSelectedRows(!toggleClearSelectedRows);
    };

    const addOrEditPresets = (row, crudType, categoryType, showDropDown, showTextField1, showTextField2) => {
        setOpen(!open);
        setAddOrEdit(crudType);
        // setCategoryType(categoryType);
        setShowDropDown(showDropDown);
        setShowTextField1(showTextField1)
        setShowTextField2(showTextField2);
        setRowData(row);
    };

    const handleOnRowClicked = (row, editCategory, showDropDown, showTextField1, showTextField2) => {
        addOrEditPresets(row, "Edit", editCategory, showDropDown, showTextField1, showTextField2);
        setExpandOnRowClick(!expandOnRowClick);
    };

    useEffect(() => {
        scopeService.getAll()
            .then(data => {
                setData(data);
                setFilteredData(data);
            });
    }, []);

    return (
        <>
            <Grid container spacing={3} justify="space-between">
                <AddEditFormDialogScope
                    open={open}
                    onClose={() => setOpen(false)}
                    title={`${addOrEdit} Scope`}
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
                />

                <Grid item xs={12}>
                    <br />
                    <br />

                    <DataTable
                        title="Let's listen 👂🏿"
                        defaultSortField={"name"}
                        keyField={"datatable"}
                        columns={columns}
                        data={filteredData}
                        theme={props.theme}
                        highlightOnHover
                        pointerOnHover
                        pagination
                        selectableRows
                        clearSelectedRows={toggleClearSelectedRows}
                        expandableRows
                        actions={actions(null)}
                        onRowClicked={(row) =>
                            handleOnRowClicked(row, "Category", false, "Scope", false)
                        }
                        expandOnRowClicked={false}
                        expandableRowsComponent={<></>}
                        // dense
                        customStyles={props.customStyles}
                        contextActions={contextActions(deleteSelectedRows)}
                        onSelectedRowsChange={handleSelectedRows}
                        striped
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default ScopesComponent;
