import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const DashboardItem = ({children, title}) => (
    <Card>
        <CardContent>
            {title && (
                <Typography component="h1" variant="h6" color="primary" gutterBottom key={"typo1"}>
                    {title}
                </Typography>
            )}
            <Typography component="h3" variant="h4" color="secondary" key={"typo2"}>
                {children}
            </Typography>
        </CardContent>
    </Card>
);

export default DashboardItem;
