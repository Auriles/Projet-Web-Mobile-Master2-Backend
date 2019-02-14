const koa = require('koa');
const Router = require('koa-router');
const Items = require('../controllers/items-controller');

const router = new Router();

router.get('/', Items.getAllItems);
router.get('/test', (ctx)=>ctx.ok('Test route works!'));
router.get('/:id', Items.getItem);
router.post('/', Items.create);
router.patch('/:id', Items.update);
router.delete('/:id', Items.delete);

module.exports = router.routes();