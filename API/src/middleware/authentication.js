const jwt = require('jsonwebtoken');
const CONSTANT = require('../constants/all.constants');
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

requiresLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}

generateToken = ({ id, password }) => jwt.sign({ id: id, password: password }, CONSTANT.TOKEN_SECRET, { expiresIn: '4h' });

auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, CONSTANT.TOKEN_SECRET);
        if (req.method === 'get') {
            const { id } = req.params;
            if (id !== data.id) {
                throw new Error();
            }
        }
        await User.findOne({ _id: data.id, password: data.password }, (err, user) => {
            if (err) return next(err);
            req.user = user
            req.token = token
            return next()
        })
    } catch (error) {
        // res.status(401).send({ success: false, message: 'Not authorized to access this resource' })
        res.status(401).send(error.message)
    }

}

module.exports = {
    requiresLogin,
    generateToken,
    auth
}