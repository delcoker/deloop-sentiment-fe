import React, {useContext} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {ChartsContext} from "../contexts/context.charts";

export default function DateRangePickerComponent() {
    const {startDate, endDate, setStartDate, setEndDate} = useContext(ChartsContext);

    const onChange = (e) => {
        if (!e) return;
        setStartDate(e[0]);
        setEndDate(e[1]);
    }

    return (
        <div>
            <DateRangePicker
                onChange={onChange}
                value={[startDate, endDate]}
            />
        </div>
    );

}