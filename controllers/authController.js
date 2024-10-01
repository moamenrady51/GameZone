const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')


const {promisify} = require('util');

const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const Email = require('./../utils/mail');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_TIME * 24 * 60 * 60 *1000
    });
  };

const createSendToken = (user, statusCode, res) => {

    const token = signToken({id: user._id});
    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_TIME * 24 * 60 * 60 *1000
        ),
        httpOnly: true,
        secure: true
    };

    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
          user
        }
      });
};



exports.login = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    };

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    };

    createSendToken(user, 200, res);

});


exports.isLoggedIn = async (req , res , next ) =>{
    let token;
    try{
    
        //check if token exists
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
            ) {
            token = req.headers.authorization.split(' ')[1];
            
        };

        // if token exists then find the user from it 
        if(token){
            const decoded = await promisify(jwt.verify)(token , process.env.JWT_SECRET_KEY);
            const currentUser = await User.findById(decoded.id.id);
            res.locals.user = currentUser;
            req.user  = currentUser;
        }
    }catch(err){
        return next();
    }
    next();


};



exports.logout = (req , res ) =>{
    res.cookie('jwt' , 'loggedout' , {
        expires: new Date( Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({status:'success'});
};




exports.forgotPassword = catchAsyncErrors(async (req , res , next ) =>{
    const user = await User.findOne({email : `${req.body.email}`});
    if(!user){
        return next(new AppError('email is invalid ' , 400));
    }
    const resetToken =  user.createPasswordResetToken();
    await user.save({validateBeforeSave : false});
    
    const resetUrl = `${req.protocol}://${req.get('host')}/Game_api/v1/Users/resetPassword/${resetToken}`;
    const message = `forgot your password ?? pres ${resetUrl} to reset `;

    await new Email(user , resetUrl).send('resetPassword' , 'reset password');


    res.status(200).json({
        status:"success"
    })
}
);



exports.resetPassword = catchAsyncErrors(async (req , res , next ) =>{

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({passwordResetToken:hashedToken});
    // if token has not expired and there is a user , set the new password 
    if(!user){
        next(new AppError("token is invalid " , 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    await user.save();
    // log the user in 
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY);

    res.status(200).json({
        status:"success",
        token,
        user
    })


});



// exports.protectGames = catchAsyncErrors(async (req, res, next) => {


//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     }
  
//     if (!token) {
//       return next(
//         new AppError('You are not logged in! Please log in to get access.', 401)
//       );
//     }

//     console.log('regola');

//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  
//     const currentUser = await User.findById(decoded.id.id);

//     if (!currentUser) {
//       return next(
//         new AppError(
//           'The user belonging to this token does no longer exist.',
//           401
//         )
//       );
//     }
  
//     req.user = currentUser;
//     res.locals.user = currentUser;
//     next();
// });
  
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission', 403)
        );
      }
  
      next();
    };
};