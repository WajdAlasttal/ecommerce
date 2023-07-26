import userModel from "../../../../DB/model/User.model.js";
import { generateToken, verifyToken } from "../../../Services/generateAndVerifyToken.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";
import { sendEmail } from "../../../Services/sendEmail.js";
import { loginSchema, signupSchema } from "../Auth.validation.js";


export const signup= async (req,res,next)=>{   
    const {userName,email,password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
   //     return res.status(409).json({message:"email already exists"});
        return next(new Error("email already exists",{cause:409}));
    }
    const token = generateToken({email},process.env.SIGNUP_TOKEN,60*5);
    const refreshToken = generateToken({email},process.env.SIGNUP_TOKEN,60*60*24);

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const Rlink = `${req.protocol}://${req.headers.host}/auth/NewconfirmEmail/${refreshToken}`;

    const html=`<a href="${link}">Verify Email</a><br/> <br/> <br/> <a href="${Rlink}">Send new email</a> `;
    await sendEmail(email,`confirm email`,html);
    const hashedPassword = hash(password);
    const createUser = await userModel.create({userName,email,password:hashedPassword}) 
    return res.status(201).json({message:"success",user:createUser._id});

}

export const confirmEmail = async(req,res)=>{
    const {token} = req.params;
    const decoded = verifyToken(token,process.env.SIGNUP_TOKEN);
    const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return res.redirect('https://www.facebook.com')
}

export const NewconfirmEmail = async(req,res,next)=>{
    let {token} = req.params;
    const {email} = verifyToken(token,process.env.SIGNUP_TOKEN);
    if(!email){
        return next(new Error("invalid token payload",{cause:400}))
    }
    const user = await userModel.findOne({email});
    if(!user){
        return next(new Error("not registered account",{cause:404}))
    }
    if(user.confirmEmail){
        return res.status(200).redirect(`${process.env.FE_URL}`);
    }
    token = generateToken({email},process.env.SIGNUP_TOKEN,60*5);
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;

    const html=`<a href="${link}">Verify Email</a><br/> <br/> <br/> <a href="${Rlink}">Send new email</a> `;
    await sendEmail(email,`confirm email`,html);
    return res.status(200).send('<p>new confirm email is send to your inbox</p>');

}

export const login = async(req,res,next)=>{
        const {email,password} = req.body;
      
        const user = await userModel.findOne({email});
        if(!user){
            return next(new Error("email not exists"));
        }else {
            if(!user.confirmEmail){
                return next(new Error("plz verify your email"));
            }
            const match = compare(password,user.password);
            if(!match){
                return next(new Error("in valid password"));
            }else {
                const token =generateToken({id:user._id});
                return res.status(200).json({message:"Done",token});
            }
        
    }
    
}