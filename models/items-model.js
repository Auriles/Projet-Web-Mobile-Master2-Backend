const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({
    name:{type:String, require:true},
    date:{type:Date, default:Date.now}
}))