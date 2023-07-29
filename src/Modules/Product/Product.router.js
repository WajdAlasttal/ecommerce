import { Router } from "express";
import * as productController from './controller/Product.controller.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Product.endpoint.js";

const router = new Router();
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5}
]),asyncHandler(productController.createProduct));
export default router;