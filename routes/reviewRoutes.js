const express = require('express');
const router = express.Router();


const reviewController = require('../controllers/reviewController')


router
    .route('/getAllReviews')
    .get(reviewController.getAllReviews)
router
    .route('/addReview')
    .post(reviewController.createOneReview)

module.exports = router;

