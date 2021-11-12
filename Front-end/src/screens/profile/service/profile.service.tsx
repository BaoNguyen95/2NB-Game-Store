import { User } from "../../login/model/login.model"
import { get, post } from "../../../service/app.service"
import { USER_API } from "../../../constants/api.constants"
import { STRING_REPLACE } from "../../../constants/common.constants"

export default class ProfileService {
    getUserInfo = async (id: string, callback: (user: User) => void) => {
        return callback(await get(USER_API.GET_USER_INFO.replace(STRING_REPLACE.REPLACE_0, id)));
    }

    updateUser = async (body: any, callback: (response: any) => void) => {
        return callback(await post(USER_API.UPDATE_USER, body));
    }
}