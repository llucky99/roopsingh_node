const User = require("../models/User");
const {verifyToken} = require("../utils/jwt");

async function authenticate(req, res, next) {
    const header =req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({message:"Authentication required"});
    }
    try{
        const payload =verifyToken(header.split(" ")[1]);
        const user = await User.findById(payload.userId).select('_id name email');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"});
    }
}

module.exports = authenticate;