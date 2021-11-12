import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MyAvatar from '../../../../shared/components/my-avatar';
import { MaterialBoxShadowHover } from '../../../../shared/material-styles/styles';

interface Props {
    data: any,
    onClick: Function,
}

const ListConversation = (props: Props) => {

    const classes = styles();

    const { data, onClick } = props;

    const onClickConversation = (id: string) => {
        onClick(id);
    }

    return (
        <div className={classes.list}>
            {data.result.map((s: any, i: number) => {
                const message = s.messages[0].message;
                const formatMsg = message.length > 25 ? message.substring(0, 25) + '...' : message;
                const displayName = s.sender.displayName;
                return (
                    <div key={i} className={classes.item} onClick={() => onClickConversation(s._id)}>
                        <MyAvatar data={s.sender} />
                        <div className={classes.content}>
                            <Typography>{displayName}</Typography>
                            <Typography variant='caption' >{formatMsg}</Typography>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

const styles = makeStyles({
    list: {

    },
    item: {
        padding: 10,
        marginTop: 5,
        borderRadius: 4,
        ...MaterialBoxShadowHover,
        display: 'flex',
        cursor: 'pointer',
    },
    content: {
        marginLeft: 10,
    }
})

export default ListConversation;
