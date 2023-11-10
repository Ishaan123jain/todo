import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async(req,res,next) =>{
    const {token} = req.cookies;   //cookie parser has been used
    if(!token){
    return res.json({
        success : "true",
        message : "login first",
    })
     };
   const decode = jwt.verify(token, process.env.SECRET_KEY);
   req.user = await User.findById(decode._id);
   next();
}