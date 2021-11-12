import { USER_API } from "../../../constants/api.constants"
import { post } from "../../../service/app.service"

export default class LoginService {

    signUpUser = async (body: any, callback: (response: any) => void) => {
        return callback(await post(USER_API.SIGN_UP, body));
    }

    checkExistUser = async (body: any, callback: (response: any) => void) => {
        return callback(await post(USER_API.CHECK_EXIST, body));
    }

    login = async (body: any, callback: (response: any) => void) => {
        return callback(await post(USER_API.LOGIN, body));
    }

    logout = async (body: any, callback: (response: any) => void) => {
        return callback(await post(USER_API.LOGOUT, body));
    }
}


