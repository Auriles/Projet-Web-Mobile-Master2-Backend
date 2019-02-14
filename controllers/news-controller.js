const News = require('../models/news-model')
const utils = require('../utils')
exports.getAllNews = async ctx => {
    const news = await News.find();
    ctx.ok(news)
}

exports.getNews = async ctx => {
    const { id } = ctx.params;
    const news = await News.findById(id);
    ctx.ok(news);
}
exports.create = async ctx => {
    if (!ctx.user.admin) return ctx.badRequest({ success: false, message: 'Not admin user' })
    let { name, description } = ctx.request.body;
    const newNews = new News({ name, description, user: ctx.user.id });
    const newsSaved = await newNews.save();
    ctx.ok(newsSaved);
}
exports.update = async ctx => {
    if (!ctx.user.admin) return ctx.badRequest({ success: false, message: 'Not admin user' })
    const { id } = ctx.params;
    const { name, description } = ctx.request.body;
    const newsUpdated = await News.findByIdAndUpdate({ _id: id }, { name, description }, { new: true })
    ctx.ok({ success: true, newsUpdated });
}
exports.delete = async ctx => {
    if (!ctx.user.admin) return ctx.badRequest({ success: false, message: 'Not admin user' })
    await News.findByIdAndRemove({ _id: ctx.params.id });
    ctx.ok({ success: true, message: 'News deleted' });
}

exports.addComment = async ctx => {
    const { id } = ctx.params;
    const { description } = ctx.request.body;
    const news = await News.findById(ctx.params.id);
    news.comments.push({ user: id, description, });
    const newsUpdated = await news.save();
    ctx.ok({ success: true, newsUpdated })
}