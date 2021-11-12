import React, { useState, useEffect } from 'react';
import { Box, Paper, makeStyles } from '@material-ui/core';
import SearchConversation from '../components/chat-page/search-conversation';
import AdminService from '../service/admin.service';
import { ChatService } from '../../../service/chat.service';
import ChatBox from '../components/chat-page/chat-box';
import AuthorizedService from '../../../service/authorized.service';
import { socket } from '../../../constants/config.constants';
import { SOCKET_EVENTS } from '../../../constants/common.constants';
import ListConversation from '../components/chat-page/list-conversation';

const AdminChatPage = (props: any) => {

    const classes = styles();

    const adminService = new AdminService();
    const chatService = new ChatService();
    const authorService = new AuthorizedService();

    const userInfo = authorService.getUserInfo();

    const [rooms, setRooms] = useState();
    const [conversation, setConversation] = useState();
    const [chat, setChat] = useState();

    useEffect(() => {
        getConversation();
    }, []);

    const getConversation = () => {
        adminService.getConversations(data => {
            if (data.length) {
                setRooms(data);
                onClickConversation(data.result[0]._id);
            } else {
                connectConversation(SOCKET_EVENTS.INIT_CONVERSATION);
            }
        })
    }

    const onClickConversation = (id: string) => {
        chatService.getConversationById(id, data => {
            if (data) {
                setConversation(data)
                connectConversation(data._id);
            }
        });
    }

    const onChangeTextField = (value: string) => {
        setChat(value);
    }

    const onSendText = (e: any) => {
        if (chat && e.key === 'Enter') {
            const emitMessage = { message: chat, meta: { user: userInfo.id } };
            socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { messages: emitMessage, id: conversation ? conversation._id : null });
            setChat('');
        }
    }

    const connectConversation = (conversationId: string) => {
        socket.on(SOCKET_EVENTS.CONNECT_SERVER, (data: any) => {
            socket.emit(SOCKET_EVENTS.JOIN_CONVERSATION, conversationId);
        });

        socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (data: any) => {
            if (data._id === conversationId || conversationId === SOCKET_EVENTS.INIT_CONVERSATION) {
                setConversation(data);
                reloadConversation();
            } else {
                reloadConversation();
            }
        })
    }

    const reloadConversation = () => {
        adminService.getConversations(data => {
            if (data) {
                setRooms(data)
            }
        })
    }

    return (
        <Box className={classes.container}>
            <Paper className={classes.listChat}>
                <SearchConversation />
                {rooms &&
                    <ListConversation
                        onClick={onClickConversation}
                        data={rooms}
                    />}
            </Paper>
            <Paper className={classes.chatBox}>
                {conversation &&
                    <ChatBox
                        data={conversation}
                        onChangeTextField={onChangeTextField}
                        onKeyDown={onSendText}
                        text={chat}
                    />
                }
            </Paper>
        </Box>
    );
};

const styles = makeStyles({
    container: {
        display: 'flex',
    },
    listChat: {
        flex: 1,
        padding: 20,
        margin: 5,
    },
    chatBox: {
        flex: 4,
        margin: 5
    }
});

export default AdminChatPage;
