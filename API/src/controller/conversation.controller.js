

const ConversationService = require('../service/conversation.service');
const helper = require('../helper/service.helper');

SendMessage = async (req, res) => {
    const body = req.body;
    const result = await ConversationService.sendMessage(body);
    return result ? res.send(result) : helper.notFound(res, 'Conversation Id ' + body.id);
}

GetConversationByUserId = async (req, res) => {
    const { id } = req.params;

    if (!id) return helper.requireField(res, 'User Id');

    const result = await ConversationService.getConversationByUserId(id);

    result ? res.send(result) : helper.notFound(res, 'Conversation Of User Id: ' + id);

}

GetConversationById = async (req, res) => {
    const { id } = req.params;

    if (!id) return helper.requireField(res, 'Conversation Id');

    const result = await ConversationService.getConversationById(id);

    result ? res.send(result) : helper.notFound(res, 'Conversation Id: ' + id);

}

GetConversationMessage = async (req, res) => {
    const { id, gridSetting } = req.body;

    if (!id) return helper.requireField(res, 'Conversation Id');

    const result = await ConversationService.getMessage(id, gridSetting);

    return res.send(result);
}

GetAll = async (req, res) => {
    const result = await ConversationService.getAll();
    return res.send(result);
}

DeleteConversation = async (req, res) => {
    const { id } = req.body;
    const result = await ConversationService.deleteConversation(id);
    return res.send(result);
}

module.exports = {
    GetConversationByUserId,
    GetConversationById,
    SendMessage,
    GetAll,
    GetConversationMessage,
    DeleteConversation,
}