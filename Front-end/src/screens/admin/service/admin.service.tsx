import { post, get } from "../../../service/app.service"
import { CATEGORY_API, PRODUCT_API, ADMIN_API, CHAT_API } from "../../../constants/api.constants";
import { STRING_REPLACE } from "../../../constants/common.constants";

export default class AdminService {
    getAdminProducts = async (searchModel: any, callback: (result: any) => void) => {
        return callback(await post(ADMIN_API.GET_ALL_PRODUCT, searchModel));
    }

    addProduct = async (body: any, callback: (result: any) => void) => {
        return callback(await post(PRODUCT_API.ADD_PRODUCT, body));
    }

    deleteProduct = async (body: any, callback: (response: any) => void) => {
        return callback(await post(PRODUCT_API.DELETE_PRODUCT, body))
    }

    addCategory = async (body: any, callback: (response: any) => void) => {
        return callback(await post(CATEGORY_API.ADD, body));
    }

    deleteCategory = async (body: any, callback: (response: any) => void) => {
        const url = CATEGORY_API.DELETE.replace(STRING_REPLACE.REPLACE_0, body.id);
        return callback(await post(url, body))
    }

    addTrailer = async (body: any, callback: (response: any) => void) => {
        return callback(await post(ADMIN_API.ADD_TRAILER, body))
    }

    getTrailer = async (productId: any, callback: (response: any) => void) => {
        return callback(await get(ADMIN_API.GET_TRAILER.replace(STRING_REPLACE.REPLACE_0, productId)));
    }

    getConversations = async (callback: (data: any) => void) => {
        return callback(await get(CHAT_API.GET_CONVERSATIONS));
    }
}


