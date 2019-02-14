require('dotenv').config()
const koa = require('koa');
const koaRouter = require('koa-router');
const mongoose = require('mongoose')
const port = process.env.PORT || 9000
const index = require('./routes/index');


const app = new koa();
const router = new koaRouter();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false }).then(() => console.log('MongoDB connected...')).catch(error => console.error(error));

app.use(require('@koa/cors')({ allowMethods: ["GET", "POST", "PUT", "DELETE"] }))
app.use(require('koa-respond')())
app.use(require('koa-body')())
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error("Error during request: ", error);
        ctx.internalServerError();
    }
});

index(router)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => console.log(`Koa server running on port ${port}`))