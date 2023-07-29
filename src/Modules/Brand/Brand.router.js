import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as brandController from './controller/Brand.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './Brand.validation.js';
import validation from "../../Middleware/validation.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Brand.endPoint.js";
const router = Router();
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validators.createBrand),
asyncHandler(brandController.createBrand));
router.put('/update/:brandId',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),validation(validators.updateBrand)
,asyncHandler(brandController.updateBrand));
router.get('/:brandId',auth(endPoint.get),validation(validators.getBrandById),asyncHandler(brandController.getBrandById));
router.get('/',auth(endPoint.get),asyncHandler(brandController.getBrands));

export default router;