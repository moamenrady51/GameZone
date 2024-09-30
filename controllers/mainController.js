const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const AppError = require('./../utils/appError')


exports.createOne = Model => catchAsyncErrors(async (req, res , next ) =>{
    console.log("hi")
    const newDocument = await Model.create(req.body);
    console.log("hi")

    res
    .status(200)
    .json(
    {
        status : "success",
        data : newDocument
    });
});


exports.getOne = Model => catchAsyncErrors(async(req, res , next ) =>{
    
    const document = await Model.findById(req.params.id);
    res
    .status(200)
    .json({status : "success" , 
         data: document
        });

});


exports.getAll = Model => catchAsyncErrors(async(req, res , next ) =>{

    const data = await Model.find();
    res
    .status(200)
    .json(
        {status : "success" , 
            data
        }
    )

});


exports.updateOne = Model => (req, res , next ) =>{
    res
    .status(200)
    .json({status : "success"})
}


exports.deleteOne = Model => catchAsyncErrors(async (req, res , next ) =>{
    console.log(req.params.id);
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    };

    res
    .status(200)
    .json({status : "success" , 
        message : " document deleted successfuly"
})

});