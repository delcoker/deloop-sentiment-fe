import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    customDataTableStyles: {
        cells: {
            style: {
                fontSize: "20px",
            },
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const customDataTableStyles = {
    cells: {
        style: {
            fontSize: "18px",
        },
    },
}

export default useStyles;