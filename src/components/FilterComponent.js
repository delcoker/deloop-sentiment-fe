import React, { Fragment } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

const FilterComponent = (props) => (
    <Fragment>
        <TextField
            id="search"
            type="text"
            variant="standard"
            value={props.filterText}
            onChange={props.onFilter}
            placeholder={props.placeholder}
            // styling={props.styling}
        />
        <Tooltip title="Clear Text">
            <IconButton onClick={props.onClear}>
                <Close fontSize={"large"} style={{ fill: "red" }} />
            </IconButton>
        </Tooltip>
    </Fragment>
);

export default FilterComponent;
