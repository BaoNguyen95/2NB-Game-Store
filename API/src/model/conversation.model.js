const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meta = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    delivered: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
});

const participant = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    delivered: { type: Boolean, default: false },
    lastSeen: { type: Date, default: new Date },
})

const Conversation = mongoose.Schema({
    title: String,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    messages: [
        {
            message: String,
            time: { type: Date, default: new Date },
            meta: meta
        }],
    isGroup: { type: Boolean, default: false },
    participants: [participant],
    createAt: { type: Date, default: new Date },
    updateAt: { type: Date, default: new Date },
    isActive: { type: Boolean, default: true },
    messagesLength: Number,
});





module.exports = mongoose.model('Conversation', Conversation);