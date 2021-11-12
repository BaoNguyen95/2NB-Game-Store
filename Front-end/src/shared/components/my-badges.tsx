import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { COLORS } from '../../constants/colors.constants';

interface Props {
    className?: any,
    value: string,
}

const MyBadges = (props: Props) => {

    const { className, value } = props;

    const classes = styles();

    return (
        <div className={clsx(classes.content, className)}>
            <Typography className={classes.value}>{value}</Typography>
        </div>
    );
}

const styles = makeStyles({
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: COLORS.RED,
        padding: 8,
        width: 10,
        height: 10,
        borderRadius: 1000,
    },
    value: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default MyBadges;