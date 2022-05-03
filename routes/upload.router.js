/**
 *  Uploads
 *  Router: /api/uploads
 */
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { jwtValidation } = require('../middlewares/jwt-validator');
const { fileUpload } = require('../controllers/upload.controller');

const router = Router();

router.use(expressfileUpload());

router.put(
    '/:type/:id',
    jwtValidation,
    fileUpload
);


module.exports = router;