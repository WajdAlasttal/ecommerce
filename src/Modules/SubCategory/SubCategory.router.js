import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as subcategoryController from './controller/SubCategory.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './SubCategory.validation.js';
import validation from "../../Middleware/validation.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./SubCategory.endpoint.js";
const router = Router({mergeParams:true});
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validators.createSubCategory),
asyncHandler(subcategoryController.createSubCategory));
router.put('/update/:subcategoryId',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),validation(validators.updateSubCategory),
asyncHandler(subcategoryController.updateSubCategory));
router.get('/',auth(endPoint.get),asyncHandler(subcategoryController.getSubCategoryById));
router.get('/all',auth(endPoint.get),asyncHandler(subcategoryController.getSubCategories));

export default router;