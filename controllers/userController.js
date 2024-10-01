const User = require('./../models/userModel');
const mainController = require('./mainController')



exports.getOneUser = mainController.getOne(User);

exports.getAllUsers = mainController.getAll(User);

exports.createOneUser = mainController.createOne(User);

exports.updateOneUser = mainController.updateOne(User);

exports.deleteOneUser = mainController.deleteOne(User);


exports.createUser = async (re) =>{
    const newDocument = await User.create(re);

}