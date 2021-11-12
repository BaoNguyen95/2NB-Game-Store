import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { TextHoverStyle } from '../material-styles/styles';

interface Props {
    label: string,
    disabled?: boolean,
    checked: boolean,
    onChange: Function,
    id: string,
}

const MyCheckbox = (props: Props) => {
    const classes = styles();
    const { checked, onChange, id, label, disabled } = props
    return (
        <div className={classes.container}>
            <FormControlLabel
                label=''
                disabled={disabled}
                control={
                    <div>
                        <Typography className={classes.label} variant='caption'>
                            <Checkbox
                                className={checkBoxStyles().root}
                                checked={checked}
                                inputProps={{ 'aria-labelledby': id }}
                                onChange={c => onChange(id)}
                                style={{
                                    color: "#3f4d60",
                                }}
                            />
                            {label}
                        </Typography>

                    </div>
                }
            />
        </div>
    );
}

const checkBoxStyles = makeStyles({
    root: {
        '&$checked': {
            color: '#3f4d60',
        },
    },
    checked: {},
})


const styles = makeStyles({
    container: {
        display: 'flex',
    },
    label: {
        fontWeight: "bold",
        ...TextHoverStyle,
        userSelect: "none",
    },
})

export default MyCheckbox;