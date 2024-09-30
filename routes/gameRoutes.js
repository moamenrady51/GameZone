const express = require('express');
const router = express.Router();


const gameController = require('../controllers/gameController')
const authController = require('./../controllers/authController')

router
    .route('/getAllGames')
    .get(gameController.getAllGames)
router
    .route('/createNewGame')
    .post(gameController.createOneGame)

router
    .route('/:id')
    .get(gameController.getOneGame)
    .patch(authController.isLoggedIn ,
            authController.restrictTo('admin') ,
            gameController.updateOneGame)
    .delete(authController.isLoggedIn , 
            authController.restrictTo('admin') , 
            gameController.deleteOneGame)


module.exports = router;

