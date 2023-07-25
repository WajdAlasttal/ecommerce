import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as subcategoryController from './controller/SubCategory.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './SubCategory.validation.js';
import validation from "../../Middleware/validation.js";
const router = Router({mergeParams:true});
router.post('/',fileUpload(fileValidation.image).single('image'),validation(validators.createSubCategory),
asyncHandler(subcategoryController.createSubCategory));
router.put('/update/:subcategoryId',fileUpload(fileValidation.image).single('image'),validation(validators.updateSubCategory),
asyncHandler(subcategoryController.updateSubCategory));
router.get('/',asyncHandler(subcategoryController.getSubCategoryById));
router.get('/all',asyncHandler(subcategoryController.getSubCategories));

export default router;