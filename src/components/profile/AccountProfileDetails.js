import React, {useState} from 'react';
import {Card, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';
import {accountService} from "../../_services";

const states = [
    // {
    //     value: 'ghana',
    //     label: 'Ghana'
    // },
    {
        value: 'greater-accra',
        label: 'Greater Accra'
    },
    // {
    //     value: 'san-francisco',
    //     label: 'San Francisco'
    // }
];

const AccountProfileDetails = (props) => {
    // const classes = useStyles();

    const user = accountService.getUserSession();
    const [values, setValues] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        state: 'Greater-Accra',
        country: 'Ghana'
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form autoComplete="off" noValidate {...props}
        >
            <Card>
                <CardHeader subheader="View your profile details." />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth
                                       helperText="Please specify the first name"
                                       label="First name"
                                       name="firstName"
                                       onChange={handleChange}
                                       required
                                       value={values.firstName}
                                       variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth
                                       label="Last name"
                                       name="lastName"
                                       onChange={handleChange}
                                       required
                                       value={values.lastName}
                                       variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth
                                       label="Email Address"
                                       name="email"
                                       onChange={handleChange}
                                       required
                                       value={values.email}
                                       variant="outlined"
                                       disabled={true}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth
                                       label="Phone Number"
                                       name="phone"
                                       onChange={handleChange}
                                       type="number"
                                       value={values.phone}
                                       variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth
                                       label="Country"
                                       name="country"
                                       onChange={handleChange}
                                       required
                                       value={values.country}
                                       variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth
                                       label="Select State"
                                       name="state"
                                       onChange={handleChange}
                                       required
                                       select
                                       SelectProps={{native: true}}
                                       value={values.state}
                                       variant="outlined"
                            >
                                {states.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

                <Grid container spacing={0} direction="row" alignItems="center" justify="flex-end">
                    <Grid item xs={6}>
                        {/*<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>*/}
                        {/*    Save Details*/}
                        {/*</Button>*/}
                    </Grid>
                </Grid>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;
