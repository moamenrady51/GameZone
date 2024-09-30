const Review = require('./../models/reviewModel');
const mainController = require('./mainController')



exports.getOneReview = mainController.getOne(Review);

exports.getAllReviews = mainController.getAll(Review);

exports.createOneReview = mainController.createOne(Review);

exports.updateOneReview = mainController.updateOne(Review);

exports.deleteOneReview = mainController.deleteOne(Review);









