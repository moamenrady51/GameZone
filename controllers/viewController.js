const Game = require('./../models/gameModel');
const Review = require('./../models/reviewModel');
const userController = require('../controllers/userController');



exports.overview = async (req , res , next) =>{
    const games = await Game.find();
    res.status(200).render('base' , 
    {
        games
    })
}

exports.login = async (req , res , next) =>{
    res.status(200).render('login');
}

exports.forgetPassword = async (req , res , next) =>{
    res.status(200).render('forgetPassword');
}
exports.resetPassword = async (req , res , next) =>{
    res.status(200).render('resetPassword');
}

exports.submitdata = async (req , res , next) =>{
    const user = await userController.createUser({...req.body});
    res.status(200).render('login' ,{
        user
    });
}

exports.signup = async (req , res , next) =>{
    res.status(200).render('signup');
}
exports.profile = async (req , res , next) =>{
    res.status(200).render('profile');
}


exports.gameDetails = async (req , res , next) =>{
    const game = await Game.findById(req.params.id);
    const reviews = await Review.find({game : {_id : req.params.id}});
   res.status(200).render('gameDetails' , {
       game,
       reviews
   })
}