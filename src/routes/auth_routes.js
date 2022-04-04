const express = require("express");
const router = express.Router();

const auth_controller = require('../controllers/auth_controller');
const midd = require('../middleware/authMiddleware');

router.post('/register',auth_controller.registerUsers);
router.get('/login',auth_controller.loginUsers);
router.get('/todos',auth_controller.todos);
router.get('/me',midd.authMiddleware,auth_controller.userOn);

module.exports = router;