import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Grid} from "@material-ui/core";
import {AddCircleOutline as AddIcon, Edit as EditIcon,} from "@material-ui/icons";
import useStyles from "../_helpers/use_styles/styles";
import {AlertType} from "../_services";
import {TopicsContext} from "../contexts/context.group.category";
import {groupCategoryService} from "../_services/group.category.service";
import {AlertContext} from "../contexts/context.alert";

export default function AddEditFormDialogGroupCategory(props) {
    const {setAlertOpen, setAlertMessage, setAlertType} = useContext(AlertContext);
    const {
        tab,
        groupCategoryData,
        setGroupCategoryData,
        groupCategoryDataEdits,
        setGroupCategoryDataEdits,
    } = useContext(TopicsContext);
    const group = (groupCategoryData.find(g => g.id === tab));
    const rowData = group && {name: group.group_category_name, id: group.id};
    const f_group = (groupCategoryDataEdits.find(g => g.id === tab));
    const f_rowData = f_group && {name: f_group.group_category_name, id: f_group.id};

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const saveNew = (e) => {
        setLoading(true);

        const params = {
            name: e.target.Group.value,
            group_category_id: 0,
        }

        groupCategoryService.create(params)
            .then(function (response) {
                setLoading(false);

                let newGroupCategoryData = [...groupCategoryData, response];
                setGroupCategoryData(newGroupCategoryData);

                setAlertOpen(true);
                setAlertMessage(`${params.name} ADDED`);
                setAlertType(AlertType.SUCCESS)
                props.onClose();
            })
            .catch(function (error) {
                setAlertOpen(true);
                setAlertType(AlertType.ERROR)
                setAlertMessage(`ADD FAIL: ${params.name}`);
                setLoading(false);
                console.log(error);
            });
    };

    const edit = (e) => {
        setLoading(true);

        const params = {
            name: e.target.Group.value,
            group_category_id: tab,
        }

        groupCategoryService.update(params)
            .then(function (response) {
                setLoading(false);

                updateGroupCategoryState(params.group_category_id, params.name, true)

                setAlertOpen(true);
                setAlertType(AlertType.SUCCESS)
                setAlertMessage(`${params.name} UPDATED`);
                props.onClose();
            })
            .catch(function (error) {
                setAlertOpen(true);
                setAlertType(AlertType.ERROR)
                setAlertMessage(`UPDATE FAIL: ${params.name}`);
                setLoading(false);
                console.log(error);
            });
    };

    function updateGroupCategoryState(group_category_id, new_group_name, shouldUpdateDB) {

        let newGroupCategoryData = [...groupCategoryData];

        for (let i = 0; i < newGroupCategoryData.length; i++) {
            if (newGroupCategoryData[i].id === group_category_id) {
                newGroupCategoryData[i] = JSON.parse(JSON.stringify(newGroupCategoryData[i]));
                newGroupCategoryData[i].group_category_name = new_group_name;
                break;
            }
        }

        if (shouldUpdateDB)
            setGroupCategoryData(newGroupCategoryData);
        else
            setGroupCategoryDataEdits(newGroupCategoryData);
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="form-dialog-title"
                maxWidth={"md"}
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
                                        f_rowData && f_rowData["name"]
                                            ? f_rowData["name"] : ""
                                    }
                                    onChange={(e) => {
                                        const attribute =  f_rowData && f_rowData["name"]
                                            ? {"name": e.target.value,}
                                            : {"name": e.target.value,};
                                        const newRowData = ({...f_rowData, ...attribute,});

                                        updateGroupCategoryState(newRowData["id"], attribute["name"], false);
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
