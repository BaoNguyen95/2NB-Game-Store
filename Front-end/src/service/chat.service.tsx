import { get, post } from "./app.service"
import { CHAT_API } from "../constants/api.constants"
import { STRING_REPLACE } from "../constants/common.constants"

export class ChatService {
    getConversationByUserId = async (id: string, callback: (data: any) => void) => {
        return callback(await get(CHAT_API.GET_CONVERSATION_BY_USER_ID.replace(STRING_REPLACE.REPLACE_0, id)));
    }

    getConversationById = async (id: string, callback: (data: any) => void) => {
        return callback(await get(CHAT_API.GET_CONVERSATION_BY_ID.replace(STRING_REPLACE.REPLACE_0, id)));
    }

    getMessage = async (body: any, callback: (data: any) => void) => {
        return callback(await post(CHAT_API.GET_MESSAGE, body));
    }
}