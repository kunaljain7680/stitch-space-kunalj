import jwt from "jsonwebtoken";
const generateTokenAndSetCookie=(userId,res)=>{

    // create token

    const token=jwt.sign({userId},process.env.JWT_SECRET,{

        expiresIn:"15d",
    })

    // set as cookie

    res.cookie("jwt",token,{
        httpOnly:true,    // this cookie cannot be accessed by the browser which makes it more secure
        maxAge:15*24*60*60*1000,  // 15 days
        sameSite:"strict"  // CSRF (kind of secret vulnaribility i.e making it more secure)
    })

    return token;
}

export default generateTokenAndSetCookie;