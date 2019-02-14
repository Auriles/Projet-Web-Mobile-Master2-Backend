const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = process.env;
exports.hashPassword = text => {
    let generator = crypto.createHash("sha1");
    generator.update(text);
    return generator.digest("hex");
};

exports.validateToken = async (ctx, next) => {
    const { headers } = ctx;
    if (headers["authorization"]) {
        let token = headers["authorization"] || headers["x-access-token"];
        if (token) {
            await jwt.verify(token, JWTSECRET, async (err, decoded) => {
                if (err)
                    return ctx.badRequest({
                        status: "error",
                        message: err.message
                    });
                ctx.user = decoded;
                await next();
            });
        } else {
            ctx.throw(403, { status: "error", message: "token required" });
        }
    } else {
        ctx.throw(403, { status: "error", message: "token required" });
    }
};
