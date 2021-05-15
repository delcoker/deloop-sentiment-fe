import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import React, {useMemo, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {accountService, AlertType} from "../_services";
import {history} from '../_helpers';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        width: 192,
        height: 192,
        color: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `100%`,
    },
}))

const SignIn = (props) => {
    const classes = useStyles()
    // const intl = useIntl()
    const [username, setUsername] = useState('jude@gmail.com')
    const [password, setPassword] = useState('123456');

    // useMemo(setUsername,[username]);

    function handleSubmit(event) {
        event.preventDefault();
        authenticate({username, password});
    }

    const authenticate = () => {
        accountService.login(username, password).then(user => {
            let _location = history.location
            let _route = '/home'
            if (user) {
                history.push(_route)
            } else {
                history.push(_location)
            }
        }).catch(error => {
            props.setAlertOpen(true);
            error.response && props.setAlertMessage(`${error.response.data.detail}`);
            props.setAlertType(AlertType.ERROR);
        });
    }

    return (
        // <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
        <Paper className={classes.paper} elevation={6}>
            <div className={classes.container}>
                <Typography component="h1" variant="h5">
                    {/*{intl.formatMessage({ id: 'sign_in' })}*/}
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        value={username}
                        onInput={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        // label={intl.formatMessage({ id: 'username' })}
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        // label={intl.formatMessage({ id: 'password' })}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                        {/*{intl.formatMessage({ id: 'sign_in' })}*/}
                    </Button>
                </form>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to="/password_reset">
                        Forgot Password
                        {/*{intl.formatMessage({ id: 'forgot_password' })}?*/}
                    </Link>
                    <Link to="/signup">
                        Register
                        {/*{intl.formatMessage({ id: 'registration' })}*/}
                    </Link>
                </div>
            </div>
        </Paper>
        // </Page>
    )
}

export default SignIn
