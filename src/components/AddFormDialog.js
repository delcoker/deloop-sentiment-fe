import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, makeStyles } from "@material-ui/core";
import {
    AddCircleOutline as AddIcon,
    Edit as EditIcon,
} from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "fit-content",
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 90,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

const endpoint =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_URL_DEV
        : process.env.REACT_APP_URL_PROD;

export default function AddFormDialog(props) {
    const setRowData = props.setRowData;
    const rowData = props.rowData;
    const people = props.people;
    const setFilteredPeople = props.setFilteredPeople;
    const issues = props.issues;
    const setFilteredIssues = props.setFilteredIssues;

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const saveNewUser = (e) => {
        setLoading(true);
        axios({
            method: "post",
            url: `${endpoint}/api/usersofinterest/add`,
            data: {
                name: e.target.name.value,
                user_type: e.target.user_type.value,
                keywords: e.target.keywords.value,
            },
            // headers: {Authorization: `Bearer ${token}`}
        })
            .then(function(response) {
                setLoading(false);
                alert(`${response.data.message}:
                                ${JSON.stringify(
                                    response.data.user,
                                    null,
                                    2
                                )}`);
                props.onClose();
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error);
            });
    };

    const saveNewIssue = (e) => {
        setLoading(true);
        axios({
            method: "post",
            url: `${endpoint}/api/issuesofinterest/add`,
            data: {
                name: e.target.name.value,
                keywords: e.target.keywords.value,
            },
            // headers: {Authorization: `Bearer ${token}`}
        })
            .then(function(response) {
                setLoading(false);
                alert(`${response.data.message}:
                                ${JSON.stringify(
                                    response.data.issue,
                                    null,
                                    2
                                )}`);
                props.onClose();
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error);
            });
    };

    const editUser = (e) => {
        setLoading(true);
        axios({
            method: "put",
            url: `${endpoint}/api/usersofinterest/update`,
            data: {
                id: rowData["UsersOfInterest.id"],
                name: rowData["UsersOfInterest.name"],
                user_type: rowData["UsersOfInterest.userType"],
                keywords: rowData["UsersOfInterest.keywords"],
            },
            // headers: {Authorization: `Bearer ${token}`}
        })
            .then(function(response) {
                setLoading(false);
                setFilteredPeople(
                    people.map((person) => {
                        if (
                            person["UsersOfInterest.id"] ===
                            rowData["UsersOfInterest.id"]
                        ) {
                            return rowData;
                        }
                        return person;
                    })
                );
                alert(`${response.data.message}:
                                ${JSON.stringify(
                                    response.data.user,
                                    null,
                                    2
                                )}`);
                props.onClose();
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error.response.data.error);
            });
    };

    const editIssue = (e) => {
        setLoading(true);
        axios({
            method: "put",
            url: `${endpoint}/api/issuesofinterest/update`,
            data: {
                id: e.target.id.value,
                name: e.target.name.value,
                keywords: e.target.keywords.value,
            },
            // headers: {Authorization: `Bearer ${token}`}
        })
            .then(function(response) {
                setLoading(false);
                setFilteredIssues(
                    issues.map((issue) => {
                        if (
                            issue["IssuesOfInterest.id"] ===
                            rowData["IssuesOfInterest.id"]
                        ) {
                            return rowData;
                        }
                        return issue;
                    })
                );
                alert(`${response.data.message}:
                                ${JSON.stringify(
                                    response.data.issue,
                                    null,
                                    2
                                )}`);

                props.onClose();
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error.message);
            });
    };

    // const close = () => {
    //     // setRowData({});
    //     return props.onClose();
    // };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="form-dialog-title"
                maxWidth={"sm"}
                keepMounted
                onExit={props.onClose}
            >
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (props.addOrEdit === "Add")
                                props.type === "user"
                                    ? saveNewUser(e)
                                    : saveNewIssue(e);
                            else {
                                props.type === "user"
                                    ? editUser(e)
                                    : editIssue(e);
                            }
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                            justify="space-around"
                            className={classes.dashedBorder}
                        >
                            <TextField
                                required
                                disabled
                                inputProps={{ type: "hidden" }}
                                name="id"
                                value={
                                    rowData &&
                                    (rowData["UsersOfInterest.id"] ||
                                        rowData["IssuesOfInterest.id"])
                                        ? rowData["UsersOfInterest.id"] ||
                                          rowData["IssuesOfInterest.id"]
                                        : ""
                                }
                            />
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Name"
                                    color="primary"
                                    fullWidth
                                    autoComplete="name"
                                    name="name"
                                    value={
                                        rowData &&
                                        (rowData["UsersOfInterest.name"] ||
                                            rowData["IssuesOfInterest.name"])
                                            ? rowData["UsersOfInterest.name"] ||
                                              rowData["IssuesOfInterest.name"]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const attribute = rowData[
                                            "UsersOfInterest.name"
                                        ]
                                            ? {
                                                  "UsersOfInterest.name":
                                                      e.target.value,
                                              }
                                            : {
                                                  "IssuesOfInterest.name":
                                                      e.target.value,
                                              };
                                        setRowData({
                                            ...rowData,
                                            ...attribute,
                                        });
                                    }}
                                />
                            </Grid>
                            {props.showPosition && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        label="Position"
                                        color="primary"
                                        fullWidth
                                        autoComplete="position"
                                        name="user_type"
                                        value={
                                            rowData &&
                                            rowData["UsersOfInterest.userType"]
                                                ? rowData[
                                                      "UsersOfInterest.userType"
                                                  ]
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setRowData({
                                                ...rowData,
                                                "UsersOfInterest.userType":
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Keywords"
                                    color="primary"
                                    fullWidth
                                    autoComplete="keywords"
                                    name="keywords"
                                    multiline
                                    value={
                                        rowData &&
                                        (rowData["UsersOfInterest.keywords"] ||
                                            rowData[
                                                "IssuesOfInterest.keywords"
                                            ])
                                            ? rowData[
                                                  "UsersOfInterest.keywords"
                                              ] ||
                                              rowData[
                                                  "IssuesOfInterest.keywords"
                                              ]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const attribute = rowData[
                                            "UsersOfInterest.keywords"
                                        ]
                                            ? {
                                                  "UsersOfInterest.keywords":
                                                      e.target.value,
                                              }
                                            : {
                                                  "IssuesOfInterest.keywords":
                                                      e.target.value,
                                              };
                                        setRowData({
                                            ...rowData,
                                            ...attribute,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    endIcon={
                                        props.addOrEdit === "Edit" ? (
                                            <EditIcon />
                                        ) : (
                                            <AddIcon />
                                        )
                                    }
                                >
                                    Confirm {props.addOrEdit}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
