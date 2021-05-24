import React, {useEffect, useState} from "react";
import memoize from 'memoize-one';
// react component that copies the given text inside your clipboard
// @material-ui/core components
import {Box, Card, CardHeader, Grid, IconButton} from "@material-ui/core";
// core components
import ActionComponent from "../components/ActionComponent";
import {Delete} from "@material-ui/icons";
import {categoryService} from "../_services/category.service";
import Container from "@material-ui/core/Container";
import useStyles from "../_helpers/use_styles/styles";
import AccountProfileDetails from "../components/profile/AccountProfileDetails";

const ProfilePage = ({withTime,  ...props}) => {
    // const classes = useStyles();
    const [theme, setTheme] = useState("dark");
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([{}]);
    const [open, setOpen] = useState(false);
    // const [categoryType, setCategoryType] = useState("");
    const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
    // const [addOrEdit, setAddOrEdit] = useState("Add");
    // const [rowData, setRowData] = useState();
    // const [showDropDown, setShowDropDown] = useState("Category");
    // const [showTextField1, setShowTextField1] = useState("Category");
    // const [showTextField2, setShowTextField2] = useState("Keywords");

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

    const actions = (type) => (
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
            <Delete color="primary" />
        </IconButton>
    ));

    const handleSelectedRows = (sel) => {
        // setSelectedRows(sel.selectedRows);
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
        // setOpen(!open);
        // setAddOrEdit(crudType);
        // // setCategoryType(categoryType);
        // setShowDropDown(showDropDown);
        // setShowTextField1(showTextField1);
        // setShowTextField2(showTextField2);
        // setRowData(row);
    };

    const handleOnRowClicked = (row, editCategory, showDropDown, showTextField1, showTextField2) => {
        addOrEditPresets(row, "Edit", editCategory, showDropDown, showTextField1, showTextField2);
        return setExpandOnRowClick(!expandOnRowClick);
    };

    useEffect(() => {
        // groupCategoryService.getAll()
        //     .then(data => {
        //         setData(data);
        //         setFilteredData(data);
        //     });
    }, []);


    return (
        <>
            <Card>
                <CardHeader
                    title={props.pageTitle}
                    titleTypographyProps={{
                        component: Box,
                        marginBottom: "0!important",
                        variant: "h5",
                    }}
                />
            </Card>
            <br />

            <Container maxWidth="lg">
                <Grid container spacing={3} justify="space-between">
                    {/*<Grid item lg={4} md={6} xs={12}>*/}
                    {/*    <AccountProfile/>*/}
                    {/*</Grid>*/}
                    <Grid item lg={12} md={10} xs={12}>
                        <AccountProfileDetails />
                    </Grid>
                </Grid>
            </Container>

        </>
    );
};

export default ProfilePage;
