const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'A tour must have a name'],
          unique: true,
          trim: true,
          maxlength: [40, 'A tour name must have less or equal then 40 characters'],
          minlength: [2, 'A tour name must have more or equal then 2 characters'],
        //   validate: [validator.isAlpha, 'game name must only contain characters']
        },
        downloads: {
          type: Number,
        },
        activePlayers: {
          type: Number,
        },
        category: {
          type: String,
          enum: {
            values: ['adventure', 'sports', 'action','fighting' , 'puzzle' , 'racing','wargame'],
            message: 'Difficulty is either: adventure, sports, action,fighting,puzzle,racing,wargame'
          }
        },
        rating: {
          type: Number,
          default: 4.5,
          min: [1, 'Rating must be above 1.0'],
          max: [5, 'Rating must be below 5.0']
        },
        price: {
          type: Number,
        },
        priceDiscount: {
          type: Number,
          validate: {
            validator: function(val) {
              return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price'
          }
        },
        summary: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true
        },
        imageCover: {
          type: String,
        },
        images: [String],
        releaseDate: Date
      },
      {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
      }
    )


const Game = mongoose.model('Game' , gameSchema);

module.exports = Game;

