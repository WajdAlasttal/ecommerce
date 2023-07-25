import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as subcategoryController from './controller/SubCategory.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './SubCategory.validation.js';
import validation from "../../Middleware/validation.js";
const router = Router({mergeParams:true});
router.post('/',fileUpload(fileValidation.image).single('image'),asyncHandler(subcategoryController.createSubCategory));
// router.put('/update/:categoryId',fileUpload(fileValidation.image).single('image'),validation(validators.updateCategory),asyncHandler(categoryController.updateCategory));
// router.get('/:categoryId',validation(validators.getCategoryById),asyncHandler(categoryController.getCategoryById));
// router.get('/',asyncHandler(categoryController.getCategories));

export default router;