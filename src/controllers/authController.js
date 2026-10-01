const authService = require('../services/authService');
const { success } = require('../utils/apiResponse');

async function register(req,res){
    const data = await authService.register(req.body);
    return success(res,201,"User registered successfully",data);
}

async function login(req,res){
    const data = await authService.login(req.body);
    return success(res,200,"User logged in successfully",data);
}

async function me (req,res){

    return success(res,200,"User details fetched successfully",{
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    });
}

module.exports = {register,login,me};
