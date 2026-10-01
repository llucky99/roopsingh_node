function errorHandler(err, req, res, next) {
    if( err.code === 11000){
        return res.status(409).json({message:"Email already exists"});
    }
    if(err.name === "ValidationError"){
const details = Object.values(err.errors).map((error)=>error.message);
        return res.status(400).json({
            message:"Validation failed",
            errors:details
        })
    }

    console.error(err);
    return res.status(500).json({
       message:err.statusCode ? err.message : "Internal Server Error"
    })
}
module.exports = errorHandler;