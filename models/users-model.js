const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, require: true, default: false },
    created_at: { type: Date, default: Date.now }
}))