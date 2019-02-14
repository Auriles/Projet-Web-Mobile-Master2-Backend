const koa = require('koa');
const Router = require('koa-router');
const News = require('../controllers/news-controller');
const utils = require("../utils");

const router = new Router();

router.get('/', News.getAllNews);
router.post('/', utils.validateToken, News.create);
router.get('/:id', News.getNews);
router.put('/:id', utils.validateToken, News.update);
router.delete('/:id', utils.validateToken, News.delete);
router.post('/comment/:id', utils.validateToken, News.addComment);

module.exports = router.routes();