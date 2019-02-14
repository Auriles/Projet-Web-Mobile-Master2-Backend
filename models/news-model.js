const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = mongoose.model('News', new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        description: { type: String, require: true },
        date: { type: Date, default: Date.now }
    }],
    date: { type: Date, default: Date.now }
}))