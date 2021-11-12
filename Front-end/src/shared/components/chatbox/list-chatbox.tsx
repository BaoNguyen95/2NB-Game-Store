import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Tooltip } from '@material-ui/core';
import { COLORS } from '../../../constants/colors.constants';
import AuthorizedService from '../../../service/authorized.service';
import clsx from 'clsx';
import { onScrollToBottom, getDateTime, onScrollToTop } from '../../../helper/helper';
import { GridSetting } from '../../../models/common.model';
import { ChatService } from '../../../service/chat.service';

const ListChatBox = (props: any) => {
    const classes = useStyles();
    const { data, conversationId, messagesLength } = props;
    const authorService = new AuthorizedService();
    const chatService = new ChatService();

    const userInfo = authorService.getUserInfo();
    const [gridSetting, setGridSetting] = useState<GridSetting>(new GridSetting());
    const [messages, setMessages] = useState();

    useEffect(() => {
        onScrollToBottom('chatbox');
        setGridSetting(new GridSetting());
        setMessages(data);
    }, [data])

    const onScroll = (e: any) => {
        if (e.target.scrollTop < 100 && conversationId && (messages.length !== messagesLength)) {
            onLoadMessage();
        }
    }

    const onLoadMessage = () => {
        chatService.getMessage({ id: conversationId, gridSetting }, messages => {
            if (messages) {
                setMessages(messages);
                setGridSetting({ ...gridSetting, Slice: gridSetting.Slice + 15 });
            }
        })
    }

    const getFirstName = (name: string) => {
        if (name) {
            return name.split(' ')[0];
        }
    }

    const onCheckMessage = (meta: any) => {
        if (userInfo.id !== meta.user.id) {
            return { classes: classes.inboxMessage, myInbox: false }
        }
        return { classes: classes.myMessage, myInbox: true }
    }

    const renderMessage = () => {
        if (messages) {
            return (
                messages.map((s: any, i: number) => {
                    const style = onCheckMessage(s.meta);
                    const time = new Date(s.time).toLocaleTimeString();
                    const placement = style.myInbox ? 'left' : 'right';
                    const userRole = !style.myInbox ? authorService.getRoleName(s.meta.user.roleId) : '';
                    return (
                        <Fragment key={i}>
                            {
                                !style.myInbox &&
                                <div className={classes.userId}>
                                    <Typography variant='caption'>
                                        {getFirstName(s.meta.user.displayName) + ' - ' + userRole + ' - ' + getDateTime(s.time)}
                                    </Typography>
                                </div>
                            }
                            <div className={clsx(classes.region, style.classes)} >
                                <Tooltip title={time} placement={placement}>
                                    <Typography>{s.message}</Typography>
                                </Tooltip>
                            </div>
                        </Fragment>
                    );
                })
            )
        }
    }

    return (
        <div onScroll={onScroll} className={classes.container}>
            <div id='chatbox' className={classes.chatBoxContent} >
                {renderMessage()}
            </div>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        overflow: 'overlay',
        height: '100%',
    },
    chatBoxContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    region: {
        borderRadius: 14,
        padding: '6px 10px 6px 10px',
        wordBreak: 'break-all',
    },
    myMessage: {
        marginRight: 10,
        marginLeft: 100,
        background: COLORS.MY_MESSAGE,
        color: 'white',
        alignSelf: 'flex-end',
        marginTop: 3,
    },
    inboxMessage: {
        marginRight: 100,
        marginLeft: 10,
        background: COLORS.WHITE_SMOKE,
        alignSelf: 'flex-start',
    },
    userId: {
        marginTop: 3,
        marginRight: 100,
        marginLeft: 15,
        alignSelf: 'flex-start',
        color: COLORS.USER_ID,
    }
});

export default ListChatBox;