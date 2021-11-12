import React from 'react';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { RadioModel } from '../models/shared.component.model';

const MyRadioButtons = (props: any) => {

    const { value, onChange, className, label, data, direction } = props;

    const classes = useStyles();

    return (
        <FormControl component="fieldset" className={clsx(classes.formControl, className)}>
            <FormLabel component="legend">{label}</FormLabel>
            {
                data ?
                    <RadioGroup className={direction} aria-label={label} name={label} value={value} onChange={onChange}>
                        {data.map((s: RadioModel, i: number) => {
                            return <FormControlLabel
                                disabled={s.disabled || false}
                                key={i}
                                value={s.value}
                                control={<Radio className={classes.radio} color='primary' />}
                                label={s.label}
                            />
                        })}
                    </RadioGroup> : null
            }
        </FormControl>
    );
}
const useStyles = makeStyles({
    formControl: {
        display: 'flex',
    },
    radio: {
        // color: '#00a19c',
        // '&$checked': {
        //     backgroundColor: '#00a19c'
        // }
    }
});

export default MyRadioButtons;