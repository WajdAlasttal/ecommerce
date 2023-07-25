
import joi from 'joi'
import { Types } from 'mongoose';

const validationObjectId =(value,helper)=>{

    if(Types.ObjectId.isValid(value)){
        return true 
    }else {
        return helper.message("id is invalid")
    }
}

export const generalFeilds = {

    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:joi.string().min(3).required(),
    file:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
        size:joi.number().positive().required(),
        dest:joi.string(),
    }),
    id:joi.string().custom(validationObjectId).required(),
}

const validation = (schema)=>{
    return (req,res,next)=>{
        const inputsData = {...req.body,...req.params,...req.query};
        // return res.json(inputsData)
        if(req.file){
            inputsData.file=req.file;
        }
        const validationResult = schema.validate(inputsData,{abortEarly:false});
        // return res.json(validationResult)
        if(validationResult.error ?.details){
            return res.json({message:"valiation error",validationError:validationResult});
        }return next();
}
}

export default validation;