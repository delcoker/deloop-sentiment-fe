import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
// import Button from "@material-ui/core/Button";
// import {groupCategoryService} from "../../_services/group.category.service";
// import {AlertType} from "../../_services";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AlertPopUp(props) {
    const classes = useStyles();
    const alertOpen = props.alertOpen;
    const setAlertOpen = props.setAlertOpen;
    const alertMessage = props.alertMessage;
    const alertType = props.alertType;
    // const alertConfirm = props.alertConfirm;
    // const confirmMessage = props.alertConfirmMessage;
    // const setAlertConfirmed = props.setAlertConfirmed;
    // const setAlertConfirm = props.setAlertConfirm;
    // const alertActionHandler = props.alertActionHandler;

    // console.log(alertActionHandler)
    //
    // const alertActionHandler = (params) => {
    //     groupCategoryService.delete(params)
    //         .then((response) => {
    //             // updateGroupCategoryState(params);
    //             // setAlertOpen(true);
    //             // setAlertMessage(`${response.message}`);
    //             // setAlertType(AlertType.WARNING);
    //
    //             // setAlertConfirmed(false);
    //             // setAlertConfirm(false);
    //             // setAlertConfirmMessage();
    //         })
    //         .catch(error => {
    //
    //         })
    // }

    // const handleClick = () => {
    //     setAlertOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    // const deleteGroup = (e) => {
    //
    //     // setAlertConfirm(false);
    //     // setAlertConfirmed(true);
    //     setAlertOpen(false);
    // }

    return (
        <div className={classes.root}>

            <Snackbar open={alertOpen}
                      anchorOrigin={{vertical: "top", horizontal: "center"}}
                      autoHideDuration={6000}
                      onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={alertType}>
                    {alertMessage}
                    {/*{alertConfirm && <Button color="inherit" size="small" onClick={() => deleteGroup}>*/}
                    {/*    {confirmMessage}*/}
                    {/*</Button>}*/}
                </Alert>
            </Snackbar>

            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </div>
    );
}
