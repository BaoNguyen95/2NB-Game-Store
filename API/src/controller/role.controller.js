

const Role = require('../model/role.model');
const helper = require('../helper/service.helper');
const RoleController = require('../service/role.service');

AddRole = (req, res) => {
    const { name } = req.body;
    if (!name) return helper.requireField(res, 'name');
    Role.findOne({ name: name }, async (err, role) => {
        if (err) throw err;
        if (role === null) {
            const result = await RoleController.add(name);
            return res.send(result);
        } else {
            return helper.alreadyExist(res, name);
        }
    });
}

UpdateRole = async (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) return res.send('Missing Field');
    const result = await RoleController.update(id, name);
    return res.send(result);
}

GetAllRoles = async (req, res) => {
    const result = await RoleController.getAll();
    return res.send(result);
}

module.exports = {
    AddRole,
    UpdateRole,
    GetAllRoles
}