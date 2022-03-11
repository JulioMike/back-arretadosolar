const express = require("express");

const router = express.Router();

const project_controller = require('../controllers/project_controller');

const multer_midd = require('../middleware/multerMiddleware');


router.get('/project', project_controller.projectAll);
router.post('/project',multer_midd, project_controller.projectAll);


module.exports = router;