const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const viewController = require('../controllers/viewController');


router
    .route('/')
    .get(authController.isLoggedIn , viewController.overview)
router
    .get('/login' ,viewController.login)
router
    .get('/forgetPassword' ,viewController.forgetPassword)
router
    .get('/resetPassword' ,viewController.resetPassword)
router
.get('/signup' ,viewController.signup)
router
    .get('/logout' ,authController.logout)
router
    .get('/profile' , authController.isLoggedIn ,viewController.profile)
router
    .post('/submit-data' ,viewController.submitdata)
router
    .get('/gameDetails/:id' , authController.isLoggedIn ,viewController.gameDetails)
    

module.exports = router;

