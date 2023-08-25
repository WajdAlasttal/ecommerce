import slugify from "slugify";
import cloudinary from "../../../Services/cloudinary.js";
import subcategoryModel from "../../../../DB/model/SubCategory.model.js";

export const getSubCategories = async (req, res, next) => {
  const subcategories = await subcategoryModel.find().populate({
    path: "categoryId",
    select: "-_id name",
  });
  return res.status(200).json({ subcategories });
};
export const getSubCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;
  const subcategory = await subcategoryModel.find({ categoryId });
  return res.status(200).json({ message: "success", subcategory });
};
export const createSubCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const slug = slugify(name);
  // return res.json(slug)
  if (await subcategoryModel.findOne({ name })) {
    return next(new Error("Duplicated Sub Category name", { cause: 409 }));
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/subcategory` }
  );
  const subcategory = await subcategoryModel.create({
    name,
    slug,
    categoryId,
    image: { public_id, secure_url },
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });
  return res.status(201).json({ message: "success", subcategory });
};
export const updateSubCategory = async (req, res, next) => {
  const { subcategoryId, categoryId } = req.params;
  const subcategory = await subcategoryModel.findOne({
    _id: subcategoryId,
    categoryId,
  });
  if (!subcategory) {
    return next(new Error("invalid sub category id", { cause: 400 }));
  }
  if (req.body.name) {
    if (subcategory.name == req.body.name) {
      return next(new Error("old name matches new name", { cause: 400 }));
    }
    if (await subcategoryModel.findOne({ name: req.body.name })) {
      return next(new Error("Duplicated sub category name", { cause: 409 }));
    }
    subcategory.name = req.body.name;
    subcategory.slug = slugify(req.body.name);
  }
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/subcategory` }
    );
    await cloudinary.uploader.destroy(subcategory.image.public_id);
    subcategory.image = { secure_url, public_id };
  }
  subcategory.updatedBy = req.user._id;
  await subcategory.save();
  return res.json({ message: "success", subcategory });
};
export const getProducts = async (req, res, next) => {
  const { subCategoryId } = req.params;
  const products = await subcategoryModel.findById(subCategoryId).populate({
    path: "products",
    match: { deleted: { $eq: false } },
  });
  return res.status(200).json({ messsage: "success", products });
};
