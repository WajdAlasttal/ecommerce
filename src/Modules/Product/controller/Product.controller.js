import slugify from "slugify";
import brandModel from "../../../../DB/model/Brand.model.js";
import subcategoryModel from "../../../../DB/model/SubCategory.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const createProduct = async (req, res, next) => {
  const { name, price, discount, categoryId, subCategoryId, brandId } =
    req.body;
  const checkCategory = await subcategoryModel.findOne({
    _id: subCategoryId,
    categoryId,
  });
  if (!checkCategory) {
    return next(new Error("invalid category or subcategory", { cause: 400 }));
  }
  const checkBrand = await brandModel.findOne({ _id: brandId });
  if (!checkBrand) {
    return next(new Error("invalid brand id ", { cause: 400 }));
  }
  req.body.slug = slugify(name);
  req.body.finalPrice = price - (price * (discount || 0)) / 100;
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.files.mainImage[0].path,
    { folder: `${process.env.APP_NAME}/product` }
  );
  req.body.mainImages = { public_id, secure_url };

  if (req.files.subImages) {
    req.body.subImages = [];
    for (const file of req.files.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/product/subImages` }
      );
      req.body.subImages.push({ public_id, secure_url });
    }
  }
  console.log(req.body.subImages);
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;
  const product = await productModel.create(req.body);
  if (!product) {
    return next(new Error("failed to create product", { cause: 400 }));
  }

  return res.json({ message: "success", product });
};
export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const newProduct = await productModel.findById(productId);
  if (!newProduct) {
    return next(new Error("Product ont found", { cause: 404 }));
  }
  const { name, price, discount, categoryId, subCategoryId, brandId } =
    req.body;
  if (categoryId && subCategoryId) {
    const checkSubCategory = await subcategoryModel.findOne({
      _id: subCategoryId,
      categoryId,
    });
    if (checkSubCategory) {
      newProduct.subCategoryId = subCategoryId;
      newProduct.categoryId = categoryId;
    } else {
      return next(
        new Error("category id or subcategory id not found", { cause: 400 })
      );
    }
  } else if (subCategoryId) {
    const checkSubCategory = await subcategoryModel.findOne({
      _id: subCategoryId,
    });
    if (checkSubCategory) {
      newProduct.subCategoryId = subCategoryId;
    } else {
      return next(new Error("subcategory id not found", { cause: 400 }));
    }
  }
  if (brandId) {
    const checkBrand = await brandModel.findOne({ _id: brandId });
    if (!checkBrand) {
      return next(new Error("invalid brand id ", { cause: 400 }));
    } else {
      newProduct.brandId = brandId;
    }
  }
  if (name) {
    newProduct.name = name;
    newProduct.slug = slugify(name);
  }
  if (req.body.description) {
    newProduct.description = req.body.description;
  }
  if (req.body.stock) {
    newProduct.stock = req.body.stock;
  }
  if (req.body.colors) {
    newProduct.colors = req.body.colors;
  }
  if (req.body.sizes) {
    newProduct.sizes = req.body.sizes;
  }
  if (price && discount) {
    newProduct.price = price;
    newProduct.discount = discount;
    newProduct.finalPrice = price - (price * (discount || 0)) / 100;
  } else if (price) {
    newProduct.price = price;
    newProduct.finalPrice = price - (price * newProduct.discount) / 100;
  } else if (discount) {
    newProduct.discount = discount;
    newProduct.finalPrice =
      newProduct.price - (newProduct.price * (discount || 0)) / 100;
  }
  if (req.files.mainImage.length) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.mainImage[0].path,
      { folder: `${process.env.APP_NAME}/product` }
    );
    await cloudinary.uploader.destroy(newProduct.mainImages.public_id);
    newProduct.mainImages.secure_url = secure_url;
    newProduct.mainImages.public_id = public_id;
  }
  if (req.files.subImages.length) {
    const subImages = [];
    for (const file of req.files.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/product/subImages` }
      );
      subImages.push({ public_id, secure_url });
    }
    newProduct.subImages = subImages;
  }
  newProduct.updatedBy = req.user._id;
  const product = await newProduct.save();
  if (!product) {
    return next(new Error("fail to update product", { cause: 400 }));
  } else {
    return res.json({ message: "success", product });
  }
};
export const softDelete = async (req, res, next) => {
  let { productId } = req.params;
  const product = await productModel.findOneAndUpdate(
    { _id: productId, deleted: false },
    { deleted: true },
    { new: true }
  );
  if (!product) {
    return next(new Error("No Product Found", { cause: 400 }));
  }
  return res.json({ message: "success", product });
};
export const forceDelete = async (req, res, next) => {
  let { productId } = req.params;
  const product = await productModel.findOneAndDelete({
    _id: productId,
    deleted: true,
  });
  if (!product) {
    return next(new Error("No Product Found", { cause: 400 }));
  }
  return res.json({ message: "success", product });
};
export const restore = async(req,res,next)=>{
  let { productId } = req.params;
  const product = await productModel.findOneAndUpdate(
    { _id: productId, deleted: true },
    { deleted: false },
    { new: true }
  );
  if (!product) {
    return next(new Error("No Product Found", { cause: 400 }));
  }
  return res.json({ message: "success", product }); 
}
export const getSoftDelete = async(req,res,next)=>{
  const product = await productModel.find({deleted:true});
  if (!product) {
    return next(new Error("No Product Found", { cause: 400 }));
  }
  return res.json({ message: "success", product }); 
}
export const getProduct = async(req,res,next)=>{
  const {productId} = req.params;
  const product = await productModel.findById(productId);
  if (!product) {
    return next(new Error("No Product Found", { cause: 400 }));
  }
  return res.json({ message: "success", product }); 
}
export const getProducts = async(req,res,next)=>{
  const products = await productModel.find();
  if (!products) {
    return next(new Error("No Product Found", { cause: 400 }));
  }
  return res.json({ message: "success", products }); 
}

