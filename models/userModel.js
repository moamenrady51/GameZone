const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const countryList = require('country-list');
const validCountries = countryList.getData().map(country => country.code);

const userSchema = new mongoose.Schema({
    name: {
        type : String , 
        required : [true , 'you must enter your name '] ,
        trim: true,
    },
    email : {
        type : String ,
        required : true ,
        trim: true,
        unique: true
    },
    photo : String ,
    role :{
        type : String,
        enum : ['user' , 'developer' , 'admin'],
        required : true,
        default : 'user'
    },
    password : {
        type : String ,
        required : true 
    },
    passwordResetToken:String,
    country: {
        type: String,
        required: true
        // validate: {
        //   validator: function(value) {
        //     return validCountries.includes(value);
        //   }
        // }
    },
    age: {
        type:Number,
        required:true
    },
    passwordConfirm : {
        type : String ,
        required : true ,
        validate : {
            validator : function(el){
                return el === this.password;
            },
            message : " password and confirm password are not the same "
        }
    }
});



// pre is an EXPRESS middleware that runs when sending data to the database 

userSchema.pre('save' , async function(next){
    if(!this.isModified('password'))return next();
    console.log("password changed");
    this.password = await bcrypt.hash(this.password , 10); // 10 is a cost parameter referes to the strength of hashing 
    this.passwordConfirm = undefined;
    next(); 
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function(inputPassword , userPassword){
    return await bcrypt.compare(inputPassword , userPassword);
    
};

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    return resetToken;

};


const User =  mongoose.model( 'User' , userSchema);

module.exports = User ;
