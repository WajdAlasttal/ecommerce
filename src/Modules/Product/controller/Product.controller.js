import slugify from "slugify";
import brandModel from "../../../../DB/model/Brand.model.js";
import subcategoryModel from "../../../../DB/model/SubCategory.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const createProduct = async(req,res,next)=>{
    const {name,price,discount,categoryId,subCategoryId,brandId}=req.body;
    const checkCategory = await subcategoryModel.findOne({_id:subCategoryId,categoryId});
    if(!checkCategory){
       return next(new Error("invalid category or subcategory",{cause:400}));
    }
    const checkBrand = await brandModel.findOne({_id:brandId});
    if(!checkBrand){
        return next(new Error("invalid brand id ",{cause:400}));
     }
    req.body.slug=slugify(name);
    req.body.finalPrice= price - (price*(discount || 0)/100);
    const{public_id,secure_url} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder: `${process.env.APP_NAME}/product`});
    req.body.mainImages={public_id,secure_url};
    
    if(req.files.subImages){
    req.body.subImages=[];
      for(const file of req.files.subImages){
        const{public_id,secure_url} = await cloudinary.uploader.upload(file.path,{folder: `${process.env.APP_NAME}/product/subImages`});
        req.body.subImages.push({public_id,secure_url});
      }  
    }
    console.log(req.body.subImages)
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;
    const product = await productModel.create(req.body);
    if(!product){
        return next(new Error("failed to create product",{cause:400}));
    }
   
    return res.json({message:"success",product})
    

}