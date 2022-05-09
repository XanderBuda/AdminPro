/**
 *  Uploads
 *  Router: /api/uploads
 */
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { jwtValidation } = require('../middlewares/jwt-validator');
const { fileUpload, getImage } = require('../controllers/upload.controller');

const router = Router();

router.use(expressfileUpload());

router.put(
    '/:type/:id',
    jwtValidation,
    fileUpload
);

router.get(
    '/:type/:img',
    getImage
);


module.exports = router;