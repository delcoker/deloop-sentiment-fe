import React, {forwardRef, useContext, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Button from "@material-ui/core/Button";
import {CalendarToday} from '@material-ui/icons';

import {ChartsContext} from "../contexts/context.charts";
// https://v4-0-0-alpha-12.material-ui-pickers.dev/demo/daterangepicker    //- check this later

// const useStyles = makeStyles((theme) => ({
//     button: {
//         margin: theme.spacing(1),
//     },
// }));

const ExampleCustomInput = forwardRef(({value, onClick}, ref) => (
    <Button fullWidth variant="contained" color="primary"
        // className={classes.button}
            endIcon={<React.Fragment>&nbsp; &nbsp;<CalendarToday /></React.Fragment>}
            onClick={onClick} ref={ref} size="medium">
        {value}
    </Button>
));

const years = range(2019, (new Date()).getFullYear() + 1, 1);
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    let result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}


export default function DateRangePickerComponent() {
    const {startDate, endDate, setStartDate, setEndDate} = useContext(ChartsContext);

    // const [calStart, calEnd] = useState([]) // make request only after start day and endDate have been set

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate1, endDate1] = dateRange;

    const onChange = (e) => {
        setDateRange(e)
        if (!e) return;
        // console.log(startDate1, endDate1)
        // if (!startDate1 || !endDate1) return;

        setStartDate(e[0]);
        setEndDate(e[1]);
    }
    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            dateFormat={'dd-MM-yyyy'}
            customInput={<ExampleCustomInput />}
            // withPortal

            renderCustomHeader={({
                                     date,
                                     changeYear,
                                     changeMonth,
                                     decreaseMonth,
                                     increaseMonth,
                                     prevMonthButtonDisabled,
                                     nextMonthButtonDisabled,
                                 }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={(date).getFullYear()}
                        onChange={({target: {value}}) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={months[(date).getMonth()]}
                        onChange={({target: {value}}) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
        />
    );
}



