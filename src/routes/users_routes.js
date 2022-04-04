const express = require("express");
const router = express.Router();

const users_controller = require('../controllers/user_controller');
const midd = require('../middleware/authMiddleware');

router.get('/users', users_controller.getAllUsers);
router.get('/users/:id', users_controller.findUsersById);
router.put('/users/:id', midd.authMiddleware, users_controller.updateUsers);
router.delete('/users/:id', midd.authMiddleware, users_controller.deleteUsers);

module.exports = router;