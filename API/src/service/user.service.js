const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const mw = require('../middleware/authentication');

login = async (userId, password) => {
    const user = await User.findOne({ userId: userId });
    if (user === null) return { success: false, message: `Can not found user ${userId}` };
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (isCorrectPassword === true) {
        return setUserInfo(user);
    } else {
        return { success: false, message: `Password is not correct, please try again !` }
    }
}

loginBy3rdParty = async (user) => {
    const userInfo = await User.findOne({ userId: user.userID });

    if (userInfo === null) {
        const newUser = new User(user);
        newUser.userId = user.userID;
        newUser.displayName = user.name;
        newUser.is3rdPartyUser = true;
        const result = await newUser.save().then(user => { return user }).catch(err => { return err });
        return setUserInfo(result)
    } else {
        return setUserInfo(userInfo);
    }
}

setUserInfo = (user) => {
    const token = mw.generateToken({ id: user.id, password: user.password });
    return {
        id: user.id,
        userId: user.userId,
        address: user.address,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        displayName: user.displayName,
        gender: user.gender,
        lastLogin: user.lastLogin,
        token: token,
        roleId: user.roleId,
        is3rdPartyUser: user.is3rdPartyUser,
    }
}

getUserForChatList = async () => {
    const users = await getUsers();
    return users.map(user => ({
        id: user.id,
        userId: user.userId,
        displayName: user.displayName,
        roleId: user.roleId,
    }));
}

const getUsers = async (params) => {
    const users = await User.find({}, (err, user) => {
        if (err) return err;
        return {
            count: user.length,
            result: user
        };
    });

    return users.map(u => setUserInfo(u));
}

module.exports = {
    login,
    loginBy3rdParty,
    getUsers,
    getUserForChatList,
}