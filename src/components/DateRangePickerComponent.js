import React, {useContext, useState} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from "moment";
import {TopicsContext} from "../contexts/context.group.category";
import {ChartsContext} from "../contexts/context.charts";

const dateFormat = "DD-MM-YYYY HH:mm"

export default function DateRangePickerComponent() {
    const {startDate, endDate, setStartDate, setEndDate} = useContext(ChartsContext);
    // console.log(startDate, endDate)

    const start_date = moment().format(dateFormat);
    const end_date = moment().format(dateFormat);

    // const [value, onChange] = useState([new Date(), new Date()]);

    // console.log('value', value.format(dateFormat));
    // console.log('end', start_date, end_date);

    const onChange = (e) => {
        setStartDate(e[0])
        setEndDate(e[1]);
        console.log(e);
    }

    return (
        <div>
            <DateRangePicker
                onChange={onChange}
                value={[startDate, endDate]}
                // value={value}
            />
        </div>
    );

}