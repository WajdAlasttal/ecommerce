import couponModel from "../../../../DB/model/Coupon.model.js";

export const createCoupon = async(req,res,next)=>{
    const {name}=req.body;

    if(await couponModel.findOne({name})){
        return next(new Error("Duplicated coupon name",{cause:409}))
    }
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;
    const coupon = await couponModel.create(req.body);
    return res.status(201).json({message:'success',coupon})
}
export const updateCoupon = async(req,res,next)=>{
    const coupon = await couponModel.findById(req.params.couponId);
    if(!coupon){
        return next(new Error('invalid coupon id',{cause:400}))
    }
    if(req.body.name){
        if(coupon.name == req.body.name){
            return next(new Error("old name matches new name",{cause:400}))
        }
        if(await couponModel.findOne({name:req.body.name})){
            return next(new Error("Duplicated coupon name",{cause:409}))
        }
        coupon.name = req.body.name;
    }
    if(req.body.amount){
        coupon.amount = req.body.amount; 
    }
    coupon.updatedBy=req.user._id;
    await coupon.save();
    return res.json({message:"success",coupon});
}
export const getCoupon = async(req,res,next)=>{
    const coupons = await couponModel.find();
    return res.status(200).json({coupons});
}
export const getCouponById = async(req,res,next)=>{
    const {couponId}=req.params;
    const coupon = await couponModel.findById(couponId);
    if(!coupon){
        return next(new Error(`Invalid Coupon Id ${couponId}`,{cause: 404}));
    }
    return res.status(200).json({message:'success',coupon});
}

