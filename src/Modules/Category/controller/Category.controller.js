import slugify from "slugify";
import cloudinary from "../../../Services/cloudinary.js";
import categoryModel from "../../../../DB/model/Category.model.js";

export const getCategories = async(req,res,next)=>{
    const categories = await categoryModel.find().populate('subcategory');
    return res.status(200).json({categories});
}
export const getCategoryById = async(req,res,next)=>{
    const category = await categoryModel.findById(req.params.categoryId);
    return res.status(200).json({message:'success',category});
}
export const createCategory = async(req,res,next)=>{
    const name = req.body.name.toLowerCase();
    const slug = slugify(name);
    // return res.json(slug)
    if(await categoryModel.findOne({name})){
        return next(new Error("Duplicated category name",{cause:409}))
    }
    const{public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.APP_NAME}/category`});
    const category = await categoryModel.create({name,slug,image:{public_id,secure_url},createdBy:req.user._id,updatedBy:req.user._id});
    return res.status(201).json({message:'success',category})
}
export const updateCategory = async(req,res,next)=>{
    const category = await categoryModel.findById(req.params.categoryId);
    if(!category){
        return next(new Error('invalid category id',{cause:400}))
    }
    if(req.body.name){
        if(category.name == req.body.name){
            return next(new Error("old name matches new name",{cause:400}))
        }
        if(await categoryModel.findOne({name:req.body.name})){
            return next(new Error("Duplicated category name",{cause:409}))
        }
        category.name = req.body.name;
        category.slug = slugify(req.body.name);
    }
    if(req.file){
        const{public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.APP_NAME}/category`});
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image={secure_url,public_id}
    }
    category.updatedBy=req.user._id;
    await category.save();
    return res.json({message:"success",category});
}
