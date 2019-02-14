const koa = require('koa');
const Router = require('koa-router');
const Users = require('../controllers/users-controller');
const Login = require('../controllers/auth-controller');
const utils = require("../utils");

const router = new Router();

router.get('/', Users.getAllUsers);
router.post('/register', Users.create);
router.post('/login', Login);
router.get('/:id', Users.getUser);
router.put('/:id', utils.validateToken, Users.update);
router.delete('/:id', utils.validateToken, Users.delete);

module.exports = router.routes();