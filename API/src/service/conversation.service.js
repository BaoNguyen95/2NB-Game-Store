const Conversation = require('../model/conversation.model');
const UserService = require('./user.service');

const mongoose = require('mongoose');

const slice = -15;

const getAll = async () => {
    const conversations = await Conversation.find({ isActive: true }, { messages: { $slice: -1 } }).sort({ updateAt: -1 }).lean();
    if (conversations) {
        const users = await UserService.getUserForChatList();
        const result = conversations.map(con => {
            con.sender = users.find(user => user.id === con.sender.toString());
            con.participants = con.participants.map(s => {
                s.user = users.find(x => x.id === s.user.toString());
                return s;
            });
            return con;
        });
        return { length: result.length, result: result };
    }
    return conversations;
}

const getConversationByUserId = async (id) => {
    let conversation = await Conversation.findOne({ sender: id, isActive: true }, { messages: { $slice: slice } }).lean();
    if (conversation) {
        conversation = await formatUserForConversation(conversation);
    }
    return conversation;
}

const getConversationById = async (id) => {
    let conversation = await Conversation.findOne({ _id: id, isActive: true }, { messages: { $slice: slice } }).lean();
    if (conversation) {
        const con = await Conversation.findById(id);
        conversation.messagesLength = con.messages.length;
        conversation = await formatUserForConversation(conversation);
    }
    return conversation;
}

const formatUserForConversation = async (conversation) => {
    const users = await UserService.getUserForChatList();
    conversation.sender = users.find(user => user.id === conversation.sender.toString());
    conversation.participants = conversation.participants.map(s => {
        s.user = users.find(x => x.id === s.user.toString());
        return s;
    });
    conversation.messages = conversation.messages.map(s => {
        s.meta.user = users.find(x => x.id === s.meta.user.toString());
        return s;
    });
    return conversation;
}

const formatMessage = async (messages) => {
    const users = await UserService.getUserForChatList();
    messages = messages.map(s => {
        s.meta.user = users.find(x => x.id === s.meta.user.toString());
        return s;
    });
    return messages;
}

const sendMessage = async (body) => {
    const id = body.id;
    if (id) {
        return await onUpdateConversation(body);
    } else {
        return await onCreateConversation(body.messages);
    }
}

const getMessage = async (id, gridSetting) => {

    const conversation = await Conversation.findById(id, { isActive: true, messages: { $slice: slice - 10 - gridSetting.Slice } }).lean();
    if (conversation) {
        return await formatMessage(conversation.messages);
    } else {
        return conversation;
    }
}

const onUpdateConversation = async (body) => {
    const { id, messages: { message, meta }, } = body;
    const conversation = await Conversation.findById(id);

    if (conversation) {
        const isExistedUser = conversation.participants.map(s => s.toObject()).some(s => s.user.toString() === meta.user);
        if (!isExistedUser) {
            conversation.participants.push({ user: meta.user });
            conversation.isGroup = true;
        }
        conversation.messages.push({ message: message, meta: meta, time: new Date() });
        conversation.updateAt = new Date();
        const result = await conversation.save().then(res => { return res }).catch(res => { return res });
        return await formatUserForConversation(result.toObject());
    } else {
        return conversation;
    }
}

const onCreateConversation = async (messages) => {
    const { meta } = messages;
    const conversation = new Conversation();
    conversation._id = mongoose.Types.ObjectId();
    conversation.messages = messages;
    conversation.sender = meta.user;
    conversation.participants.push({ user: meta.user });
    let result = await conversation.save()
        .then(async con => { return await formatUserForConversation(con) })
        .catch(err => { return err });
    return await formatUserForConversation(result);
}

const deleteConversation = async (id) => {
    return await Conversation.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true });
}

module.exports = {
    getConversationByUserId,
    getAll,
    sendMessage,
    getMessage,
    deleteConversation,
    getConversationById
}