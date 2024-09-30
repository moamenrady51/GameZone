const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
    .post('/forgotPassword' , authController.forgotPassword)
router    
    .route('/resetPassword/:token')
    .post(authController.resetPassword)
router    
    .route('/logout')
    .get( authController.logout)

router
    .route('/createUser')
    .post(userController.createOneUser)

router    
    .route('/login')
    .post(authController.login)
router    
    .route('/getAllUsers')
    .get(authController.isLoggedIn ,
        authController.restrictTo('admin') ,
        userController.getAllUsers)
router    
    .route('/:id')
    .get(authController.isLoggedIn ,
        authController.restrictTo('admin') ,
        userController.getOneUser)


module.exports = router;

