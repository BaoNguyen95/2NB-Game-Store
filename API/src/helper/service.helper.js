
const fs = require('fs');
const object = {
    status: Number,
    message: String,
    response: Boolean,
}

deleteSuccess = (response) => {
    delete object.message;
    object.status = 200;
    object.response = true;
    response.status(object.status).send(object);
}

notFound = (response, id) => {
    delete object.response;
    object.message = 'Can not found ' + id;
    object['success'] = false;
    response.send(object);
}

found = (response, result) => {
    response.status(200).send(result);
}

uploadFail = (response) => {
    delete object.response;
    object.status = 404;
    object.message = 'Can not upload file';
    response.status(object.status).send(object);
}

uploadSuccess = (response, id) => {
    object.status = 200;
    object.message = 'Upload Success';
    object.response = id;
    response.status(object.status).send(object);
}

isExisted = async (response, model, findItem) => {
    let result;
    await model.find(findItem, (err, res) => {
        if (!res.length) {
            result = false;
        } else {
            delete object.response;
            object.status = 402;
            object.message = "Existed: " + findItem.name;
            // response.status(object.status).send(object);
            result = true;
        }
    })
    return result
}

requireField = (response, field) => {
    object.message = `Required field '${field}'`;
    object.response = false;
    return response.send(object)
}

alreadyExist = (res, name) => {
    return res.send({ message: 'Already exist: ' + name, success: false })
}

module.exports = {
    deleteSuccess,
    notFound,
    isExisted,
    found,
    uploadFail,
    uploadSuccess,
    requireField,
    alreadyExist
}