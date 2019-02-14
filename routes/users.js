const koa = require('koa');
const Router = require('koa-router');
const Users = require('../controllers/users-controller');
const Login = require('../controllers/auth-controller');
const utils = require("../utils");

const router = new Router();

router.get('/', Users.getAllUsers);
router.post('/', Users.create);
router.put('/', utils.validateToken, Users.update);
router.post('/login', Login);
router.get('/:id', Users.getUser);
router.delete('/:id', utils.validateToken, Users.delete);

module.exports = router.routes();