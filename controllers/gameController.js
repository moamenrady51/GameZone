const Game = require('./../models/gameModel');
const mainController = require('./mainController')



exports.getOneGame = mainController.getOne(Game);

exports.getAllGames = mainController.getAll(Game);

exports.createOneGame = mainController.createOne(Game);

exports.updateOneGame = mainController.updateOne(Game);

exports.deleteOneGame = mainController.deleteOne(Game);









