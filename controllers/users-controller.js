const User = require('../models/users-model')
const utils = require('../utils')
exports.getAllUsers = async ctx => {
    const users = await User.find();
    ctx.ok(users)
}

exports.getUser = async ctx => {
    const { id } = ctx.params;
    const user = await User.findById(id);
    ctx.ok(user);
}
exports.create = async ctx => {
    let { firstname, lastname, email, password } = ctx.request.body;
    password = utils.hashPassword(password);
    const user = await User.findOne({ email });
    if (user) return ctx.badRequest({ success: false, message: 'User already exists' })
    const newUser = new User({
        firstname, lastname, email, password
    });
    const userSaved = await newUser.save();
    ctx.ok(userSaved)
}
exports.update = async ctx => {
    const { id } = ctx.user;
    let { firstname, lastname, password, admin } = ctx.request.body;
    password = utils.hashPassword(password);
    const userUpdated = await User.findByIdAndUpdate({ _id: id }, { $set: { firstname, lastname, password, admin } }, { new: true })
    ctx.ok({ success: true, message: "User updated" });
}
exports.delete = async ctx => {
    await User.findByIdAndRemove({ _id: ctx.params.id })
    ctx.ok({ success: true, message: 'User deleted' });
}