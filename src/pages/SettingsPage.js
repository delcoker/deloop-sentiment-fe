import React, {useEffect, useState} from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DataTable from "react-data-table-component";
import {Card, CardContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axiosConfig from "../_helpers/axiosConfig";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import ScopesComponent from "../components/ScopesComponent";
import useStyles, {customDataTableStyles} from "../_helpers/use_styles/styles";

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
                <Box
                    display="flex"
                    alignItems="flex-start"
                >
                    <Box
                        // fontSize=".875rem"
                        component="span"
                    >
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

const SettingsPage = () => {
    const classes = useStyles();
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
            {/*<TabsComponent/>*/}

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
