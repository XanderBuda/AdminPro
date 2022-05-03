/**
 *  All
 *  Router: /api/all/:search
 */
 const { Router } = require('express');
 
 const { jwtValidation } = require('../middlewares/jwt-validator');
 const { getAll, getAllOfACollection } = require('../controllers/searches.controller');
 
 const router = Router();
 
 router.get(
     '/:search',
     jwtValidation,
     getAll
 );

 router.get(
    '/collection/:table/:search',
    jwtValidation,
    getAllOfACollection
);
 
 module.exports = router;