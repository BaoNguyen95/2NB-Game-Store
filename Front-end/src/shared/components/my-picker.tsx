import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const MyPicker = (props: any) => {

    const { value, onChange, className, label, id, format, max, min } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={className}
                margin="none"
                id={id}
                label={label}
                format={format || "MM/dd/yyyy"}
                value={value}
                onChange={onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                placeholder='MM/dd/yyyy'
                maxDate={max}
                minDate={min}
            />
        </MuiPickersUtilsProvider>
    );
}

export default MyPicker;