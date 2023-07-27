import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as categoryController from './controller/Category.controller.js';
import subCategory from '../SubCategory/SubCategory.router.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './Category.validation.js';
import validation from "../../Middleware/validation.js";
import { auth} from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Category.endpoint.js";
const router = Router();
router.use('/:categoryId/subCategory',subCategory);
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validators.createCategory),asyncHandler(categoryController.createCategory));
router.put('/update/:categoryId',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),validation(validators.updateCategory),asyncHandler(categoryController.updateCategory));
router.get('/:categoryId',auth(endPoint.get),validation(validators.getCategoryById),asyncHandler(categoryController.getCategoryById));
router.get('/',auth(endPoint.get),asyncHandler(categoryController.getCategories));

export default router;