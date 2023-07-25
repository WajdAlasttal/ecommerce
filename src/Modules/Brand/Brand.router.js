import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as brandController from './controller/Brand.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from './Brand.validation.js';
import validation from "../../Middleware/validation.js";
const router = Router();
router.post('/',fileUpload(fileValidation.image).single('image'),validation(validators.createBrand),
asyncHandler(brandController.createBrand));
router.put('/update/:brandId',fileUpload(fileValidation.image).single('image'),validation(validators.updateBrand)
,asyncHandler(brandController.updateBrand));
router.get('/:brandId',validation(validators.getBrandById),asyncHandler(brandController.getBrandById));
router.get('/',asyncHandler(brandController.getBrands));

export default router;