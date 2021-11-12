export class User {
    id: string;
    displayName: string;
    userId: string;
    password: string;
    confirmPassword: string;
    hidePassword: boolean;
    picture: any;
    email: string;
    dateOfBirth: any;
    gender: boolean;
    address: string;
    phoneNumber: string;
    lastLogin: any;
    token?: string;
    roleId?: string;
    is3rdPartyUser?: boolean;

    constructor() {
        this.id = '';
        this.confirmPassword = '';
        this.displayName = '';
        this.password = '';
        this.userId = '';
        this.gender = true;
        this.email = '';
        this.address = '';
        this.dateOfBirth = null;
        this.hidePassword = true;
        this.phoneNumber = '';
        this.picture = null;
        this.lastLogin = null;
        this.token = '';
        this.roleId = '';
    }
}