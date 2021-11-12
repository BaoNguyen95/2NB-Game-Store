import { baseURL } from "./config.constants";
import { STRING_REPLACE } from "./common.constants";

export const CATEGORY_API = {
    GET_ALL: baseURL + '/category',
    ADD: baseURL + '/category',
    DELETE: baseURL + `/category/${STRING_REPLACE.REPLACE_0}`
}

export const PRODUCT_API = {
    GET_ALL: baseURL + '/product/all',
    SEARCH_PRODUCTS: baseURL + '/products',
    ADD_PRODUCT: baseURL + '/product',
    DELETE_PRODUCT: baseURL + `/product/delete`,
    GET_PRODUCT_DETAIL: baseURL + `/product/${STRING_REPLACE.REPLACE_0}`,
    GET_RELATE_PRODUCT: baseURL + `/product/relate`,
    GET_TRAILER: baseURL + `/trailer/${STRING_REPLACE.REPLACE_0}`,
}

export const CART_API = {
    GET_ALL_CART: baseURL + `/cart/${STRING_REPLACE.REPLACE_0}`,
    ADD_CART: baseURL + `/cart/add`,
    DECREASE_CART: baseURL + `/cart/decrease`,
    DELETE_PRODUCT_CART: baseURL + `/cart/removeProduct`,
}

export const FILE_API = {
    ADD_IMAGE: baseURL + '/photo',
    DELETE_PHOTO: baseURL + '/photo/delete',
}

export const ADMIN_API = {
    GET_ALL_PRODUCT: baseURL + '/admin/products',
    ADD_TRAILER: baseURL + '/admin/trailer',
    GET_TRAILER: baseURL + `/admin/trailer/${STRING_REPLACE.REPLACE_0}`,
}

export const USER_API = {
    SIGN_UP: baseURL + `/user`,
    CHECK_EXIST: baseURL + `/user/checkExist`,
    LOGIN: baseURL + `/user/login`,
    LOGOUT: baseURL + `/user/logout`,
    UPDATE_USER: baseURL + `/user/update`,
    GET_USER_INFO: baseURL + `/user/${STRING_REPLACE.REPLACE_0}`,
    CHECK_EXPIRY_TOKEN: baseURL + `/user/checkToken`,
}

export const CHAT_API = {
    GET_CONVERSATION_BY_ID: baseURL + `/conversation/${STRING_REPLACE.REPLACE_0}`,
    GET_CONVERSATION_BY_USER_ID: baseURL + `/conversation/sender/${STRING_REPLACE.REPLACE_0}`,
    GET_MESSAGE: baseURL + `/conversation/message`,
    GET_CONVERSATIONS: baseURL + '/conversations',
}