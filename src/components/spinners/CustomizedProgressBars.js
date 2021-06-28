import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearBuffer from "./LinearBuffer";
import Grid from "@material-ui/core/Grid";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#2548b8',
    },
}))(LinearProgress);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'sticky',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#e70808',
        animationDuration: '550ms',
        // position: 'inherit',
        // zIndex: 10,
        marginLeft: -40,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function FacebookCircularProgress(props) {
    const classes = useStylesFacebook();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} justify="space-between">

                <Grid item xs={12} style={{textAlign: "center"}}>

                    <CircularProgress
                        variant="determinate"
                        className={classes.bottom}
                        size={40}
                        thickness={4}
                        {...props}
                        value={100}
                    />

                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        className={classes.top}
                        classes={{
                            circle: classes.circle,
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                    />
                </Grid>
            </Grid>

        </div>
    );
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CustomizedProgressBars() {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => {
    });
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <FacebookCircularProgress />

            <LinearBuffer variant="buffer" value={progress} valueBuffer={buffer} color={"secondary"} />
            <BorderLinearProgress variant="determinate" value={progress} />
        </div>
    );
}
