
const Role = require('../model/role.model');
const helper = require('../helper/service.helper');

add = async (name) => {
    const role = new Role();
    role.name = name;
    return await role.save()
        .then(role => { return role })
        .catch(err => { return err });;
}

update = async (id, name) => {
    return await Role.findByIdAndUpdate(id, { name: name }, { new: true }, (err, res) => {
        if (err) throw err;
        return res;
    });
}

getAll = async () => {
    return await Role.find()
        .then(roles => { return roles })
        .catch(err => { return err });
}

module.exports = {
    add,
    update,
    getAll
}