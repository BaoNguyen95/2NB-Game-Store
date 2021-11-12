import React, { Fragment } from 'react'
import { makeStyles, Typography, InputBase } from '@material-ui/core';
import MyAvatar from '../../../../shared/components/my-avatar';
import ListChatBox from '../../../../shared/components/chatbox/list-chatbox';
import { COLORS } from '../../../../constants/colors.constants';

const ChatBox = (props: any) => {

    const classes = styles();

    const { data, onChangeTextField, onKeyDown, text } = props;

    const renderAvatar = () => {
        return (
            <Fragment>
                {data.participants.map((s: any, i: number) => {
                    return (
                        <div key={i} className={classes.user}>
                            <MyAvatar data={s.user} pixel={35} />
                            <Typography className={classes.title}>{s.user.displayName}</Typography>
                        </div>
                    )
                })}
            </Fragment>
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                {renderAvatar()}
            </div>
            <div className={classes.content}>
                <ListChatBox
                    data={data.messages}
                    conversationId={data._id}
                    messagesLength={data.messagesLength}
                />
            </div>
            <div className={classes.action}>
                <InputBase
                    className={classes.input}
                    value={text}
                    onChange={e => onChangeTextField(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder='Type a message'
                />
            </div>
        </div>
    )
};

const styles = makeStyles({
    container: {

    },
    header: {
        display: 'flex',
        borderBottom: `1px solid #e8e8e8`,
        padding: 10,
    },
    user: {
        display: 'flex',
        marginRight: 4,
        borderRadius: 100,
        background: COLORS.MY_MESSAGE,
        color: 'white',
        padding: '4px 7px 4px 5px',
    },
    title: {
        marginLeft: 10,
        alignSelf: 'center'
    },
    content: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 500,
    },
    action: {
        display: 'flex',
        borderTop: `1px solid #e8e8e8`,
        padding: 10,
    },
    input: {
        background: COLORS.WHITE_SMOKE,
        paddingLeft: 10,
        borderRadius: 20,
    }
});

export default ChatBox;