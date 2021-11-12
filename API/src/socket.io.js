const ConversationService = require('./service/conversation.service');
const CONSTANTS = require('./constants/all.constants');
const EVENTS = CONSTANTS.SOCKET_EVENTS;

module.exports = (io) => {
    // Set socket.io listeners.
    io.on(EVENTS.CONNECTION, (socket) => {
        // console.log('a user connected');

        // On conversation entry, join broadcast channel
        socket.on(EVENTS.JOIN_CONVERSATION, (conversation) => {
            socket.join(conversation);
            // console.log('joined conversation id: ' + conversation);
        });

        socket.on(EVENTS.SEND_MESSAGE, async data => {
            const newConversation = await ConversationService.sendMessage(data);
            io.emit(EVENTS.RECEIVE_MESSAGE, newConversation);
        });

        socket.on(EVENTS.LEAVE_CONVERSATION, (conversation) => {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        })

        // socket.on('newMessage', (conversation) => {
        //     io.sockets.in(conversation).emit('refresh messages', conversation);
        // });

        socket.on('disconnect', () => {
            // console.log('user disconnected');
        });
    });
}