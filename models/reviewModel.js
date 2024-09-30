const mongoose = require('mongoose');

const Game = require('./gameModel');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
    {
      review: {
        type: String,
        required: [true, 'Review can not be empty!']
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      game: {
        type: mongoose.Schema.ObjectId,  // Reference to Game model
        ref: 'Game',
        required: [true, 'Review must belong to a game.']
      },
      user: {
        type: mongoose.Schema.ObjectId,  // Reference to User model
        ref: 'User',
        required: [true, 'Review must belong to a user.']
      }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );


reviewSchema.pre(/^find/, function(next) {

    this.populate({
      path: 'game',
      select: 'name'
    }).populate({
      path: 'user',
      select: 'name photo'
    });
  
    // this.populate({
    //   path: 'user',
    //   select: 'name photo'
    // });
    next();
  });
  


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;