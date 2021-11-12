const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CONSTANTS = require('../constants/common.constants');

const User = mongoose.Schema({
    displayName: String,
    userId: String,
    password: String,
    phoneNumber: String,
    address: String,
    dateOfBirth: Date,
    createAt: { type: Date, default: new Date() },
    email: String,
    lastLogin: Date,
    gender: Boolean,
    roleId: { type: String, default: CONSTANTS.USER_ROLE.CUSTOMER },
    is3rdPartyUser: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
});

User.pre('save', function (next) {
    const user = this;
    if (!user.is3rdPartyUser) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    } else {
        next();
    }
})

module.exports = mongoose.model('User', User);