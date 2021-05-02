import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DataTable from "react-data-table-component";
// import { CubeContext } from "@cubejs-client/react";
import ActionComponent from "../components/ActionComponent";
import AddFormDialog from "../components/AddFormDialog";
import { Card, CardContent } from "@material-ui/core";
import ExpandedAdminComponent from "../components/ExpandedAdminComponent";

const columnsPeople = [
    {
        name: "id",
        selector: (user) => user["UsersOfInterest.id"],
        sortable: true,
        omit: true,
    },
    {
        name: "Name",
        selector: (user) => user["UsersOfInterest.name"],
        sortable: true,
        wrap: true,
    },
    {
        name: "Position",
        selector: (user) => user["UsersOfInterest.userType"],
        sortable: true,
    },
    {
        name: "Keywords",
        selector: (user) => user["UsersOfInterest.keywords"],
        sortable: true,
        wrap: true,
        grow: 3,
    },
];
const columnsIssues = [
    {
        name: "id",
        selector: (user) => user["IssuesOfInterest.id"],
        sortable: true,
        omit: true,
    },
    {
        name: "Name",
        selector: (issue) => issue["IssuesOfInterest.name"],
        sortable: true,
        wrap: true,
    },
    {
        name: "Keywords",
        selector: (issue) => issue["IssuesOfInterest.keywords"],
        sortable: true,
        wrap: true,
        grow: 3,
    },
];

const usersQuery = {
    dimensions: [
        "UsersOfInterest.id",
        "UsersOfInterest.name",
        "UsersOfInterest.userType",
        "UsersOfInterest.keywords",
    ],
};
const issuesQuery = {
    dimensions: [
        "IssuesOfInterest.id",
        "IssuesOfInterest.name",
        "IssuesOfInterest.keywords",
    ],
};

const AdminPage = () => {
    // const { cubejsApi } = React.useContext(CubeContext);
    const [theme, setTheme] = useState("dark");
    const [theme2, setTheme2] = useState("light");
    const [filterPeopleText, setFilterPeopleText] = useState("");
    const [filterIssuesText, setFilterIssuesText] = useState("");
    const [people, setPeople] = useState([]);
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoryType, setCategoryType] = useState("");
    const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [rowData, setRowData] = useState();

    const handleChange = () => {
        if (theme === "dark") {
            setTheme("default");
        } else {
            setTheme("dark");
        }
    };
    const handleChange2 = () => {
        if (theme2 === "dark") {
            setTheme2("default");
        } else {
            setTheme2("dark");
        }
    };

    const handleClear = (type) => {
        if (type === "user") {
            setFilterPeopleText("");
            setFilteredPeople(people);
        } else if (type === "issue") {
            setFilterIssuesText("");
            setFilteredIssues(issues);
        }
    };

    const actions = (type) => (
        <ActionComponent
            onFilter={(e) => {
                const text = e.target.value;
                if (type === "user") {
                    setFilterPeopleText(text);
                    setFilteredPeople(
                        people.filter(
                            (person) =>
                                (person["UsersOfInterest.name"] &&
                                    person["UsersOfInterest.name"]
                                        .toLowerCase()
                                        .includes(text.toLowerCase())) ||
                                (person["UsersOfInterest.keywords"] &&
                                    person["UsersOfInterest.keywords"]
                                        .toLowerCase()
                                        .includes(text.toLowerCase()))
                        )
                    );
                } else {
                    setFilterIssuesText(text);
                    setFilteredIssues(
                        issues.filter(
                            (issue) =>
                                (issue["IssuesOfInterest.name"] &&
                                    issue["IssuesOfInterest.name"]
                                        .toLowerCase()
                                        .includes(text.toLowerCase())) ||
                                (issue["IssuesOfInterest.keywords"] &&
                                    issue["IssuesOfInterest.keywords"]
                                        .toLowerCase()
                                        .includes(text.toLowerCase()))
                        )
                    );
                }
            }}
            onClear={() => handleClear(type)}
            filterText={type === "user" ? filterPeopleText : filterIssuesText}
            onClick={() => {
                addOrEditPresets({}, "Add", type);
            }}
            tooltip={type === "user" ? "Add A New Person" : "Add A New Issue"}
            placeholder={"Filter by name & keywords"}
        />
    );

    const addOrEditPresets = (row, crudType, categoryType) => {
        setOpen(!open);
        setAddOrEdit(crudType);
        setCategoryType(categoryType);
        setRowData(row);
    };

    const handleOnRowClicked = (row, editCategory) => {
        addOrEditPresets(row, "Edit", editCategory);
        return setExpandOnRowClick(!expandOnRowClick);
    };

    useEffect(() => {
        // cubejsApi.load(usersQuery).then((resultSet) => {
        //     setPeople(resultSet.loadResponses[0].data);
        //     setFilteredPeople(resultSet.loadResponses[0].data);
        // });
        // cubejsApi.load(issuesQuery).then((resultSet) => {
        //     setIssues(resultSet.loadResponses[0].data);
        //     setFilteredIssues(resultSet.loadResponses[0].data);
        // });
        console.log("AdminPage useEffect");
    }, []);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3} justify="space-between">
                    <AddFormDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        showPosition={categoryType === "user" ? true : false}
                        title={
                            categoryType === "user"
                                ? `${addOrEdit} Person`
                                : `${addOrEdit} Issue`
                        }
                        type={categoryType}
                        addOrEdit={addOrEdit}
                        rowData={rowData}
                        setRowData={setRowData}
                        people={people}
                        setFilteredPeople={setFilteredPeople}
                        issues={issues}
                        setFilteredIssues={setFilteredIssues}
                        // saveNewUser={saveNewUser}
                    />
                    <Grid item xs={6}>
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
                            title="People to Look Out For"
                            columns={columnsPeople}
                            data={filteredPeople}
                            theme={theme}
                            highlightOnHover
                            pointerOnHover
                            pagination
                            selectableRows
                            expandableRows
                            actions={actions("user")}
                            onRowClicked={(row) =>
                                handleOnRowClicked(row, "user")
                            }
                            expandOnRowClicked={false}
                            expandableRowsComponent={<></>}
                            // dense
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            label="Dark Mode"
                            control={
                                <Switch
                                    checked={theme2 === "dark"}
                                    onChange={handleChange2}
                                />
                            }
                        />
                        <DataTable
                            title="Issues to Track"
                            columns={columnsIssues}
                            data={filteredIssues}
                            theme={theme2}
                            highlightOnHover
                            pointerOnHover
                            pagination
                            selectableRows
                            expandableRows
                            actions={actions("issue")}
                            onRowClicked={(row) =>
                                handleOnRowClicked(row, "issue")
                            }
                            expandOnRowClicked={false}
                            expandableRowsComponent={<></>}
                            // dense
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
