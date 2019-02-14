const jwt = require("jsonwebtoken");
const User = require("../models/users-model");
const utils = require("../utils");
const { JWTSECRET } = process.env;

module.exports = async ctx => {
    let { email, password } = ctx.request.body;
    password = utils.hashPassword(password);
    const user = await User.findOne({ email, password });
    if (!user) return ctx.notFound({ success: false, message: "Login or Password invalid" });
    const { _id, mail, admin } = user;
    let token = jwt.sign({ id: _id, mail: email, admin }, JWTSECRET, {
        expiresIn: 1440
    });
    ctx.ok({ success: true, message: "Login OK", token });
};
