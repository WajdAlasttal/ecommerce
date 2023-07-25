import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as categoryController from './controller/Category.controller.js';
import subCategory from '../SubCategory/SubCategory.router.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './Category.validation.js';
import validation from "../../Middleware/validation.js";
const router = Router();
router.use('/:categoryId/subCategory',subCategory);
router.post('/',fileUpload(fileValidation.image).single('image'),validation(validators.createCategory),asyncHandler(categoryController.createCategory));
router.put('/update/:categoryId',fileUpload(fileValidation.image).single('image'),validation(validators.updateCategory),asyncHandler(categoryController.updateCategory));
router.get('/:categoryId',validation(validators.getCategoryById),asyncHandler(categoryController.getCategoryById));
router.get('/',asyncHandler(categoryController.getCategories));

export default router;