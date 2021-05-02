import React, { Fragment } from "react";
import { Add } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import FilterComponent from "./FilterComponent";
import IconButton from "@material-ui/core/IconButton";

const ActionComponent = (props) => (
    <Fragment>
        <FilterComponent
            onFilter={props.onFilter}
            onClear={props.onClear}
            filterText={props.filterText}
            placeholder={props.placeholder}
        />
        <Tooltip title={props.tooltip}>
            <IconButton
                color={props.color || "secondary"}
                onClick={props.onClick}
            >
                <Add
                    fontSize={props.fontSize || "large"}
                    style={props.style || { fill: "#4CAF50" }}
                />
            </IconButton>
        </Tooltip>
    </Fragment>
);

export default ActionComponent;
