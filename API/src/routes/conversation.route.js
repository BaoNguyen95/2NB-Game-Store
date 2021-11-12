
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var router = express.Router();

const URL = CONSTANTS.API.CONVERSATION_API;

const Conversation = require('../controller/conversation.controller');

router.post(URL.SEND_MESSAGE, Conversation.SendMessage);
router.get(URL.GET_CONVERSATION_BY_USER_ID, Conversation.GetConversationByUserId);
router.get(URL.GET_CONVERSATION_BY_ID, Conversation.GetConversationById);
router.get(URL.GET_ALL, Conversation.GetAll);
router.post(URL.GET_MESSAGE, Conversation.GetConversationMessage);
router.post(URL.DELETE, Conversation.DeleteConversation);

module.exports = router;