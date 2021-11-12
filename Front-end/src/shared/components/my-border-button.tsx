import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { AppStyleMainLinear } from '../material-styles/styles';

const MyBorderButton = (props: any) => {
    const classes = styles();
    const { label, className, onClick, disabled, noneRadius } = props;
    if (noneRadius) {
        return (
            <Button
                variant='contained'
                className={clsx(disabled ? classes.disable : classes.buttonNoneRadius, className)}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </Button>
        )
    } else {
        return (
            <Button
                variant='contained'
                className={clsx(disabled ? classes.disable : classes.button, className)}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </Button>
        )
    }
}

const styles = makeStyles({
    button: {
        borderRadius: 20,
        color: 'white',
        ...AppStyleMainLinear,
        padding: 10,
        display: 'flex',
    },
    disable: {
        borderRadius: 20,
        color: 'white',
        padding: 10,
        display: 'flex',
    },
    buttonNoneRadius: {
        color: 'white',
        ...AppStyleMainLinear,
        display: 'flex',
    },
    disableNoneRadius: {
        color: 'white',
        display: 'flex',
    }
});

export default MyBorderButton