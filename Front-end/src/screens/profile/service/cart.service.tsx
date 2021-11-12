import { get, post } from "../../../service/app.service"
import { CART_API } from "../../../constants/api.constants"
import { STRING_REPLACE } from "../../../constants/common.constants"
import AuthorizedService from "../../../service/authorized.service"

const authorService = new AuthorizedService();
export default class CartService {

    getCarts = async (userId: string, callback: (carts: any) => void) => {
        return callback(await get(CART_API.GET_ALL_CART.replace(STRING_REPLACE.REPLACE_0, userId)));
    }

    addCart = async (id: string, callback: (carts: any) => void) => {
        const body = { productId: id, userId: authorService.getUserInfo().id }
        return callback(await post(CART_API.ADD_CART, body));
    }

    decreaseCart = async (id: string, callback: (carts: any) => void) => {
        const body = { productId: id, userId: authorService.getUserInfo().id }
        return callback(await post(CART_API.DECREASE_CART, body));
    }

    deleteProductCart = async (cartId: string, id: string, callback: (carts: any) => void) => {
        const body = { cartId: cartId, id: id }
        return callback(await post(CART_API.DELETE_PRODUCT_CART, body));
    }
}