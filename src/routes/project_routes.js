const express = require("express");

const router = express.Router();

const project_controller = require('../controllers/project_controller');

const multer = require('../middleware/multerMiddleware');


router.get('/project', project_controller.projectAll);
router.post('/project',multer.single('image'), project_controller.projectNew);


module.exports = router;