const mongoose = require('mongoose');

const Photo = mongoose.Schema({
    image: { data: Buffer, contentType: String },
    foreignId: String,
    uploadAt: String,
    path: String,
});

module.exports = mongoose.model('Photo', Photo);