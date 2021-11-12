import { LOCAL_STORAGE, ROLE, ROLE_NAME } from "../constants/common.constants"
import { User } from "../screens/login/model/login.model";
import { USER_API } from "../constants/api.constants";
import { post } from "./app.service";
import jwt_decode from "jwt-decode";

export default class AuthorizedService {
    getUserInfo(): User {
        let user = localStorage.getItem(LOCAL_STORAGE.USER_INFO);
        return user ? JSON.parse(user) : new User();
    }

    getToken(): string {
        let user = localStorage.getItem(LOCAL_STORAGE.USER_INFO);
        return user ? JSON.parse(user).token : '';
    }

    setUserInfo(data: User): void {
        let user = JSON.stringify(data);
        localStorage.setItem(LOCAL_STORAGE.USER_INFO, user);
    }

    checkExpiryToken = (token: any): boolean => {
        const claims = jwt_decode<any>(token);
        if (Date.now() >= claims.exp * 1000) {
            return true;
        }
        return false
    }

    isAdmin = (): boolean => {
        const userInfo = this.getUserInfo();
        return userInfo.roleId === ROLE.ADMINISTRATOR || userInfo.roleId === ROLE.SUPER_ADMIN;
    }

    isEditor = (): boolean => {
        const userInfo = this.getUserInfo();
        return userInfo.roleId === ROLE.EDITOR;
    }

    getRoleName = (roleId?: string): string => {
        const userInfo = this.getUserInfo();
        const role = roleId ? roleId : userInfo.roleId;
        switch (role) {
            case ROLE.ADMINISTRATOR:
                return ROLE_NAME.ADMINISTRATOR;
            case ROLE.CUSTOMER:
                return ROLE_NAME.CUSTOMER;
            case ROLE.EDITOR:
                return ROLE_NAME.EDITOR;
            case ROLE.SALES_MANAGER:
                return ROLE_NAME.SALES_MANAGER;
            case ROLE.SUPER_ADMIN:
                return ROLE_NAME.SUPER_ADMIN;
            default:
                return ''
        }
    }
}