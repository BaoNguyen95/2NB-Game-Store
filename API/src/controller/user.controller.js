const User = require('../model/user.model');
const helper = require('../helper/service.helper');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants/all.constants');
const UserService = require('../service/user.service');

createUser = (req, res) => {
    const _userId = req.body.userId;
    if (!_userId) return helper.requireField(res, 'User Id');
    User.findOne({ userId: _userId }, (err, user) => {
        if (err) return res.send(err);
        const newUser = {
            displayName: req.body.displayName,
            userId: _userId,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : '',
            address: req.body.address ? req.body.address : '',
            dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : '',
            createAt: new Date(),
            lastLogin: null,
            gender: true,
        };
        if (user == null) {
            new User(newUser).save()
                .then((result) => {
                    res.send(result.id);
                }).catch((err) => {
                    res.send({ message: err.message });
                });
        } else { // update
            res.send({ message: `ID ${_userId} is existed` })
        }
    })
}

login = async (req, res) => {
    let { userId, password, user3rdParty } = req.body;
    if (user3rdParty) {
        const result = await UserService.loginBy3rdParty(user3rdParty);
        return res.send(result);
    } else {
        if (!userId || !password) return helper.requireField(res, 'ID & password');
        const result = await UserService.login(userId, password);
        return res.send(result);
    }
}

logout = (req, res) => {
    const { id } = req.body;
    User.findById(id, (err, user) => {
        if (err) throw err;
        if (user === null) {
            return helper.notFound(res, 'User ' + id);
        } else {
            User.findByIdAndUpdate(id, { lastLogin: new Date() }, { new: true }, (err, result) => {
                if (err) throw err;
                req.session && req.session.destroy();
                return res.send({ success: true });
            });
        }
    })
}

checkExpireToken = (req, res) => {
    const { token } = req.body;
    if (token) {
        jwt.verify(token, CONSTANTS.TOKEN_SECRET, (err, decoded) => {
            res.send({ expired: err ? true : false });
        });
    } else {
        helper.requireField(res, 'Token');
    }
}

updateUser = (req, res) => {
    const _userId = req.body.userId;
    if (!_userId) return helper.requireField(res, 'User Id');
    User.findOne({ userId: _userId }, (err, user) => {
        if (err) return res.send(err);
        if (user == null) {
            helper.notFound(res, 'User: ' + _userId);
        } else { // update
            const updateUser = req.body;
            User.findByIdAndUpdate(user.id, updateUser, { projection: { password: 0 }, new: true }, (err, user) => {
                if (err) return res.send(err);
                res.send(user);
            });
        }
    })
}

checkExistUser = (req, res) => {
    const userId = req.body.userId;
    User.findOne({ userId: userId }, (err, user) => {
        if (err) return res.send(err);
        if (user === null) {
            res.send({ existed: false });
        } else {
            res.send({ existed: true });
        }
    });
}

searchUsers = async (req, res) => {
    const result = await UserService.getUsers();
    return res.send(result);
}

getUserProfile = (req, res) => {
    const { id } = req.params;
    User.findOne({ _id: id }, { password: 0, createAt: 0 }, (err, user) => {
        if (err) return res.send(err);
        if (user === null) {
            res.status(401).send({ success: false, message: `Can not found user id: ${id}` })
        } else {
            res.send(user)
        }
    });
}

deleteUser = (req, res) => {
    User.findByIdAndRemove(req.body.id, (err, result) => {
        if (err) throw err;
        if (result !== null) {
            res.send({ success: true, id: result.id });
        } else {
            helper.notFound(res, req.body.id)
        }
    })
}

module.exports = {
    createUser,
    checkExistUser,
    login,
    logout,
    updateUser,
    searchUsers,
    getUserProfile,
    deleteUser,
    checkExpireToken
}