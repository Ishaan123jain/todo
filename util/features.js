import jwt from "jsonwebtoken";

export const sendCookie = (user,res, message)=>{
    const token = jwt.sign({_id : user._id}, process.env.SECRET_KEY);

   res.cookie("token", token, {
    httpOnly : true,
    maxAge  : 15*60*1000,
    //we have backend on different URL and frontend on different, so to send cookies across URL 
    //we use samesite(default : lax) and none simultaneously
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
   })
   .json({
    success : true,
    message,
   })
}