
const SERVER = {
    LOCALHOST: 'http://localhost:27017/',
    CLIENT: 'http://localhost:3000/,'
}

const APP_SECRET = 'AN DEMO APPLICATION';

const TOKEN_SECRET = '7c03373f-cf76-4ce2-9ed0-764c2c8e071d';

const baseURL = '/api/v1'

const DATABASE = {
    URL: 'mongodb://localhost:27017/mydb',
    NAME: 'mydb',
    MLAB: 'mongodb://ngocbao:EUZeZpMLax9W3FVh@ds263078.mlab.com:63078/2nbshop'
};

const CONNECT_OPTION = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const COLLECTION = {
    PRODUCTS: 'products',
    CATEGORY: 'category',
}

const SOCKET_EVENTS = {
    CONNECTION: 'connection',
    INIT_CONVERSATION: 'INIT_CONVERSATION',
    SEND_MESSAGE: 'SEND_MESSAGE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
    JOIN_CONVERSATION: 'JOIN_CONVERSATION',
    CONNECT_SERVER: 'CONNECT_SERVER',
    DISCONNECT_: 'disconnect',
    LEAVE_CONVERSATION: 'LEAVE_CONVERSATION',
}

const API = {
    // PRODUCT API
    PRODUCT_API: {
        GET_ALL: baseURL + '/product/all',
        ALL_PRODUCTS: baseURL + '/products',
        FIND_PRODUCT_BY_ID: baseURL + '/product/:id',
        PRODUCT_ADD: baseURL + '/product',
        PRODUCT_DELETE: baseURL + '/product/delete',
        FIND_RELATE_PRODUCT: baseURL + '/product/relate',
    },
    // CATEGORY API
    CATEGORY_API: {
        CATEGORY: baseURL + '/category',
        CATEGORY_DELETE: baseURL + '/category/:id',
    },

    // Photo
    PHOTO: {
        ADD: baseURL + '/photo',
        DELETE: baseURL + '/photo/delete',
        GET_ALL: baseURL + '/photos',
    },

    // ADMIN 
    ADMIN_PRODUCT: {
        ALL_PRODUCTS: baseURL + '/admin/products',
    },

    // TRAILER
    TRAILER: {
        ADD_TRAILER: baseURL + '/admin/trailer',
        GET_TRAILER_ADMIN: baseURL + '/admin/trailer/:productId',
        GET_TRAILER_PRODUCT: baseURL + '/trailer/:productId',
    },

    // USER
    USER_API: {
        ADD_USER: baseURL + '/user',
        UPDATE_USER: baseURL + '/user/update',
        CHECK_EXIST_USER: baseURL + '/user/checkExist',
        LOGIN: baseURL + '/user/login',
        LOGOUT: baseURL + '/user/logout',
        SEARCH_USER: baseURL + '/user/search',
        GET_USER_PROFILE: baseURL + '/user/:id',
        DELETE_USER: baseURL + '/user/delete',
        CHECK_EXPIRY_TOKEN: baseURL + '/user/checkToken',
    },

    // CART
    CART_API: {
        GET_ALL: baseURL + '/cart/all',
        GET_CART: baseURL + '/cart/:userId',
        ADD_CART: baseURL + '/cart/add',
        DECREASE_CART: baseURL + '/cart/decrease',
        REMOVE_ALL: baseURL + '/cart/removeAll',
        REMOVE_BY_PRODUCT: baseURL + '/cart/removeProduct',
    },

    // ROLE
    ROLE_API: {
        ADD: baseURL + '/role/add',
        UPDATE: baseURL + '/role/update',
        GET_ALL: baseURL + '/role/all',
    },

    // CONVERSATION

    CONVERSATION_API: {
        GET_ALL: baseURL + '/conversations',
        GET_CONVERSATION_BY_USER_ID: baseURL + '/conversation/sender/:id',
        GET_CONVERSATION_BY_ID: baseURL + '/conversation/:id',
        SEND_MESSAGE: baseURL + '/conversation/send',
        DELETE: baseURL + '/conversation/delete',
        GET_MESSAGE: baseURL + '/conversation/message',
    },
}

module.exports = {
    DATABASE,
    APP_SECRET,
    CONNECT_OPTION,
    COLLECTION,
    API,
    SERVER,
    TOKEN_SECRET,
    SOCKET_EVENTS
};
