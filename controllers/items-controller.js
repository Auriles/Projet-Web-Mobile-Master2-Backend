const Item = require('../models/items-model')

exports.getAllItems = async ctx =>{
    const items = await items.find();
    ctx.ok(items)
}

exports.getItem = async ctx =>{}
exports.create = async ctx =>{
    const {name}=ctx.request.body;
    const newItem = new Item({
        name,
    });
    const itemSaved = await newItem.save();
    ctx.ok(itemSaved)
}
exports.update = async ctx =>{}
exports.delete = async ctx =>{}