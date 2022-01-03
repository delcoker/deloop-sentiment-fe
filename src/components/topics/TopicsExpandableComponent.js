import React, {Fragment, useContext, useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {categoryService} from "../../_services/category.service";
import {AlertType} from "../../_services";
import {AlertContext} from "../../contexts/context.alert";
import TopicListItems from "./TopicListItems";


const TopicsExpandableComponent = (props) => {
    const {setAlertOpen, setAlertMessage, setAlertType} = useContext(AlertContext);
    const rowData = props.data;
    const [loading, setLoading] = React.useState(false);
    const [categoryPosts, setCategoryPosts] = useState([]);

    useEffect(() => {
        categoryService.getCategoryPosts(rowData.id)
            .then(function (response) {
                setLoading(false);
                setCategoryPosts(response);

                // setLoading(false);
                // setAlertOpen(true);
                // setAlertType(AlertType.SUCCESS)
                // console.log(params)
                // setAlertMessage(`${params.name} ADDED`);
                // props.setData(newFilteredData);
                // props.setFilteredData(newFilteredData);
                // props.onClose();
            })
            .catch(function (error) {
                setAlertOpen(true);
                setAlertType(AlertType.ERROR)
                setAlertMessage(`GET DETAIL FAIL` /*: ${params.name}*/);
                setLoading(false);
                console.log(error);
            });

    }, []);

    // console.log(getCategoryData(rowData.id));
    return (<Fragment>
        <br />
        <Grid container spacing={3}
              xs={12}
              direction="row"
              justify="center"
              alignItems="flex-start">

            <Grid item xs={9}>
                <TopicListItems posts={categoryPosts}/>
            </Grid>

        </Grid>
        <br />
    </Fragment>);

};

export default TopicsExpandableComponent;