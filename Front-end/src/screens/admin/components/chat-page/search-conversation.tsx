
import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const SearchConversation = (props: any) => {

    const classes = styles();

    return (
        <div>
            <TextField
                className={classes.text}
                variant='outlined'
                label='Search conversation...'
            />
        </div>
    )
}

const styles = makeStyles({
    text: {
        width: '100%'
    }
})

export default SearchConversation;
