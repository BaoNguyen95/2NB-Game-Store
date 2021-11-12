import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Backdrop, Fade, Typography, TextField, Icon, Fab, Badge } from '@material-ui/core';
import { COLORS } from '../../../constants/colors.constants';
import { MaterialBoxShadow } from '../../material-styles/styles';
import { MY_ICON } from '../../models/shared.component.model';
import ListChatBox from './list-chatbox';
import { ChatService } from '../../../service/chat.service';
import AuthorizedService from '../../../service/authorized.service';
import { onScrollToBottom } from '../../../helper/helper';
import { socket } from '../../../constants/config.constants';
import { SOCKET_EVENTS } from '../../../constants/common.constants';
interface Props {
    open: boolean,
    onOpen: Function,
}

class Message {
    message: string;
    meta: { user: string };
    constructor() {
        this.message = '';
        this.meta = { user: '' };
    }
}

const MyChatBox = (props: Props) => {

    const classes = useStyles();

    const { open, onOpen } = props;

    const [chat, setChat] = useState('');
    const [conversation, setConversation] = useState<any>();

    const chatService = new ChatService();
    const authorService = new AuthorizedService();

    const userInfo = authorService.getUserInfo();

    useEffect(() => {
        getConversation();
    }, [userInfo.id])

    const getConversation = () => {
        if (userInfo.id) {
            chatService.getConversationByUserId(userInfo.id, data => {
                if (data.success === false) {
                    connectConversation(SOCKET_EVENTS.INIT_CONVERSATION)
                } else {
                    setConversation(data);
                    connectConversation(data._id);
                    onScrollToBottom('chatbox');
                }
            });
        }
    }

    const handleOpen = () => {
        setChat('');
        onOpen()
    }

    const onChangeChatText = (e: any) => {
        setChat(e.target.value);
    }

    const onSendMessage = (e: any) => {
        if (chat && e.key === 'Enter') {
            const message: Message = { message: chat, meta: { user: userInfo.id } };
            socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { messages: message, id: conversation ? conversation._id : null });
            setChat('');
        }
    }

    const connectConversation = (conversationId: string) => {
        socket.on(SOCKET_EVENTS.CONNECT_SERVER, (data: any) => {
            socket.emit(SOCKET_EVENTS.JOIN_CONVERSATION, conversationId);
        });

        socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (data: any) => {
            if (data._id === conversationId || conversationId === SOCKET_EVENTS.INIT_CONVERSATION) {
                setConversation(data)
            }
        })
    }

    return (
        <div className={classes.content}>
            {open && <div className={classes.chatbox}>
                <div className={classes.headerContent}>
                    <Typography> Chat Box</Typography>
                </div>
                {
                    conversation &&
                    <ListChatBox
                        data={conversation.messages}
                        conversationId={conversation._id}
                        messagesLength={conversation.messagesLength}
                    />}
                <div className={classes.actionContent}>
                    <TextField
                        className={classes.textField}
                        placeholder='Write your message...'
                        // multiline={true}
                        variant='outlined'
                        value={chat}
                        onChange={onChangeChatText}
                        onKeyDown={onSendMessage}
                    />
                    <Icon className={classes.iconSend} onClick={onSendMessage}>{MY_ICON.SendIcon}</Icon>
                </div>
            </div>}
            <div className={classes.fabIcon} >
                <Badge badgeContent={0} color='secondary'>
                    <Fab onClick={handleOpen} color='primary'>{MY_ICON.ChatIcon}</Fab>
                </Badge>
            </div>
            <Backdrop open={open} onClick={handleOpen} />
        </div>
    )
}

const useStyles = makeStyles({
    content: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        justifyContent: 'flex-end',
    },
    chatbox: {
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        width: 320,
        right: 0,
        background: 'white',
        borderRadius: 4,
        ...MaterialBoxShadow,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerContent: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        color: 'white',
        ...MaterialBoxShadow,
        background: COLORS.MAIN_COLOR,
    },
    actionContent: {
        bottom: 0,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textField: {
        width: '100%',
        margin: 5,
    },
    fabIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    iconSend: {
        marginRight: 5,
    },
});

export default MyChatBox;