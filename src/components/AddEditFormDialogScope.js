import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Grid} from "@material-ui/core";
import {AddCircleOutline as AddIcon, Edit as EditIcon,} from "@material-ui/icons";
import useStyles from "../_helpers/use_styles/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import {scopeService} from "../_services/scope.service";
import {AlertType} from "../_services";

export default function AddEditFormDialogScope(props) {
    const setRowData = props.setRowData;
    const rowData = props.rowData;
    const filteredData = props.filteredData;

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const saveNew = (e) => {
        setLoading(true);

        const params = {
            name: e.target.Scope.value,
            index: e.target.index.value,
            filteredData: filteredData,
        }

        scopeService.create(params)
            .then(function (response) {
                let newRowData = {};
                newRowData.name = params.name;
                newRowData.id = filteredData[0].id;
                newRowData.user_id = filteredData[0].user_id
                newRowData.index = filteredData.length + 1;

                const newFilteredData = [...filteredData, newRowData];

                setLoading(false);
                // props.setAlertOpen(true);
                // props.setAlertType(AlertType.SUCCESS)
                alert(`${params.name} updated`);
                props.setData(newFilteredData);
                props.setFilteredData(newFilteredData);
                props.onClose();
            })
            .catch(function (error) {
                props.setAlertOpen(true);
                props.setAlertType(AlertType.ERROR)
                props.setAlertMessage(`UPDATE FAIL: ${params.name}`);
                setLoading(false);
                console.log(error);
            });
    };

    const edit = (e) => {
        setLoading(true);

        const params = {
            name: e.target.Scope.value,
            scope_id: e.target.id.value,
            index: e.target.index.value,
            filteredData: filteredData,
        }

        scopeService.update(params)
            .then(function (response) {
                setLoading(false);
                // alert(`${params.name} updated`);

                console.log(response.filteredData)

                // props.setAlertOpen(true);
                // props.setAlertType(AlertType.SUCCESS)
                alert(`${params.name} updated`);
                props.setData(response.filteredData);
                props.setFilteredData(response.filteredData);
                props.onClose();
            })
            .catch(function (error) {
                props.setAlertOpen(true);
                props.setAlertType(AlertType.ERROR)
                props.setAlertMessage(`UPDATE FAIL: ${params.name}`);
                setLoading(false);
                console.log(error);
            });
    };

    const dropDownData = () => {
        if (rowData && rowData.length > 0) {
            // <>	<option aria-label="None" value=""/>
            rowData && rowData.map(
                (rowData) => (
                    <option value={rowData["id"]}>{rowData["name"]}</option>
                )
            )
        }
    }

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
                        autoComplete="on"
                        onSubmit={(e) => {
                            e.preventDefault();
                            (props.addOrEdit === "Add") ? saveNew(e) : edit(e);
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                            justify="space-around"
                        >
                            <TextField
                                required
                                disabled
                                inputProps={{type: "hidden"}}
                                name="id"
                                value={
                                    rowData && rowData["id"]
                                        ? rowData["id"] : ""
                                }
                            />
                            <TextField
                                required
                                disabled
                                inputProps={{type: "hidden"}}
                                name="index"
                                value={
                                    rowData && rowData["index"]
                                        ? rowData["index"] : ""
                                }
                            />

                            {props.showDropDown &&
                            <Grid item xs={12} sm={12}>

                                <FormControl required className={classes.formControl} fullWidth>
                                    <InputLabel htmlFor="age-native-required">{props.showDropDown}</InputLabel>
                                    <Select
                                        native
                                        value={
                                            rowData && rowData["id"]
                                                ? rowData["id"] : ""
                                        }
                                        onChange={(e) => {
                                            const attribute = rowData["id"]
                                                ? {"id": e.target.value,}
                                                : {"id": e.target.value,};
                                            setRowData({...rowData, ...attribute,});
                                            console.log(rowData)
                                            console.log(attribute)
                                        }}
                                        name={props.showDropDown}
                                        inputProps={{
                                            id: 'age-native-required',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        {dropDownData()}


                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </Grid>}


                            {props.showTextField1 &&
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    label={props.showTextField1}
                                    color="primary"
                                    fullWidth
                                    autoComplete="name"
                                    name={props.showTextField1}
                                    inputProps={{
                                        className: classes.input,
                                    }}
                                    value={
                                        rowData && rowData["name"]
                                            ? rowData["name"] : ""
                                    }
                                    onChange={(e) => {
                                        const attribute = rowData["name"]
                                            ? {"name": e.target.value,}
                                            : {"name": e.target.value,};
                                        setRowData({...rowData, ...attribute,});
                                    }}
                                />
                            </Grid>}


                            {props.showTextField2 &&
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    label={props.showTextField2}
                                    color="primary"
                                    fullWidth
                                    autoComplete="keywords"
                                    name={props.showTextField2}
                                    inputProps={{
                                        className: classes.input,
                                        type: "hidden"
                                    }}
                                    multiline
                                    value={
                                        rowData && rowData["index"]
                                            ? rowData["index"]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const attribute = rowData["index"]
                                            ? {"index": e.target.value,}
                                            : {"index": e.target.value,};
                                        setRowData({
                                            ...rowData, ...attribute,
                                        });
                                    }}
                                />
                            </Grid>}

                            <Grid item xs={12} sm={9}>
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
