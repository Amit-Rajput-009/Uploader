const jwt  = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req,res,next)=>{
    const token = req.body.token||req.headers.token;
    console.log("middleware token "+token)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,decoded) =>{
        if(err){
            // console.log("Your Error "+ err);
            return res.status(401).send({auth:false,message:"Failed to authenticated"});
        }else{
            req.user= decoded;                      
            next(); 
        };  
    });
}
module.exports = {verifyToken};