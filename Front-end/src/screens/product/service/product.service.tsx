import { post, get } from "../../../service/app.service"
import { PRODUCT_API } from "../../../constants/api.constants"

export default class ProductService {
    getProducts = async (searchModel: any, callback: (result: any) => void) => {
        return callback(await post(PRODUCT_API.SEARCH_PRODUCTS, searchModel));
    }

    getRelateProducts = async (searchModel: any, callback: (result: any) => void) => {
        return callback(await post(PRODUCT_API.GET_RELATE_PRODUCT, searchModel));
    }

    getAllProduct = async (callback: (result: any) => void) => {
        return callback(await get(PRODUCT_API.GET_ALL));
    }
}