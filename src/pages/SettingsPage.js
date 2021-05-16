import React, {useState} from "react";
import DataTable from "react-data-table-component";
import {Avatar, Box, Button, CardHeader, Card, CardContent, FormControlLabel, Grid, Switch} from "@material-ui/core";
import axiosConfig from "../_helpers/axiosConfig";
import ScopesComponent from "../components/ScopesComponent";
import {customDataTableStyles} from "../_helpers/use_styles/styles";

// export these to .env
const data = [{
    id: 1,
    name: 'Twitter',
    is_authorized: false,
},
    {
        id: 2,
        name: 'Facebook',
        is_authorized: true,
    },
    {
        id: 3,
        name: 'Github',
        is_authorized: true,
    },
    {
        id: 4,
        name: 'Google',
        is_authorized: true,
    },
    {
        id: 5,
        name: 'Reddit',
        is_authorized: true,
    },
];

const columnsPlatform = [
    {
        name: "id",
        selector: (id) => id,
        sortable: true,
        omit: true,
    },
    {
        name: "Platform",
        selector: row =>

            <Box alignItems="center" display="flex">
                <Box
                    component={Avatar}
                    marginRight="1rem"
                    alt="..."
                    src={require(`../assets/icons/${row['name'].toLowerCase()}.svg`).default}
                />
                <Box display="flex" alignItems="flex-start">
                    <Box component="span">
                        {row['name']}
                    </Box>
                </Box>
            </Box>,
        wrap: true,
        maxWidth: "60%"
    },
    {
        name: "Allow / Revoke",
        cell: (row) => <Grid item xs={12}>
            <Button onClick={() => platform_redirect(row['name'])} fullWidth variant="contained"
                    color="primary">{(row['is_authorized'] && "COMING SOON") || "ALLOW"}</Button>
        </Grid>,
        button: true,
        sortable: true,
        minWidth: "20%",
    },
];


const platform_redirect = (platform) => {
    if (platform.toLowerCase() === "twitter") {
        const url = "/login/twitter";

        axiosConfig.get(url)
            .then(function (response) {
                window.location = response.data.url;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

const SettingsPage = (props) => {
    const [theme, setTheme] = useState("dark");
    const [theme2, setTheme2] = useState("default");


    const handleChange = () => {
        if (theme === "dark") {
            setTheme("default");
            setTheme2("dark");
        } else {
            setTheme("dark");
            setTheme2("default");
        }
    };

    return (
        <>
            <br/>
            <Card>
                <CardHeader
                    title="Settings"
                    titleTypographyProps={{
                        component: Box,
                        marginBottom: "0!important",
                        variant: "h5",
                    }}
                />
                <CardContent>
                    <Grid container spacing={3} justify="space-between">

                        <Grid item xs={7}>
                            <FormControlLabel
                                label="Dark Mode"
                                control={
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={handleChange}
                                    />}
                            />
                            <DataTable
                                title="Authorize Platforms 👍🏿"
                                columns={columnsPlatform}
                                data={data}
                                theme={theme}
                                highlightOnHover
                                pointerOnHover
                                pagination
                                // selectableRows
                                expandableRows
                                expandOnRowClicked={false}
                                expandableRowsComponent={<></>}
                                customStyles={customDataTableStyles}
                                striped
                            />
                        </Grid>

                        <Grid item xs={5}>

                            <ScopesComponent
                                {...props}
                                theme={theme2}
                                customStyles={customDataTableStyles}
                            />

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};
export default SettingsPage;
