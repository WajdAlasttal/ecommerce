import cloudinary from "../../../Services/cloudinary.js";
import brandModel from "../../../../DB/model/Brand.model.js";

export const createBrand = async(req,res,next)=>{
    const {name}=req.body;
    const{categoryId}=req.body;

    if(await brandModel.findOne({name})){
        return next(new Error("Duplicated brand name",{cause:409}))
    }
    const{public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.APP_NAME}/brand`});
    const brand = await brandModel.create({name,image:{public_id,secure_url},categoryId});
    return res.status(201).json({message:'success',brand})
}
export const updateBrand = async(req,res,next)=>{
    const brand = await brandModel.findById(req.params.brandId);
    if(!brand){
        return next(new Error('invalid brand id',{cause:400}))
    }
    if(req.body.name){
        if(brand.name == req.body.name){
            return next(new Error("old name matches new name",{cause:400}))
        }
        if(await brandModel.findOne({name:req.body.name})){
            return next(new Error("Duplicated brand name",{cause:409}))
        }
        brand.name = req.body.name;
    }
    if(req.file){
        const{public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.APP_NAME}/brand`});
        await cloudinary.uploader.destroy(brand.image.public_id);
        brand.image={secure_url,public_id}
    }
    await brand.save();
    return res.json({message:"success",brand});
}
export const getBrands = async(req,res,next)=>{
    const brands = await brandModel.find();
    return res.status(200).json(brands);
}
export const getBrandById = async(req,res,next)=>{
    const brand = await brandModel.findById(req.params.brandId);
    return res.status(200).json({message:'success',brand});
}