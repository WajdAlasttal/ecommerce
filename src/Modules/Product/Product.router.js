import { Router } from "express";
import * as productController from "./controller/Product.controller.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Product.endpoint.js";

const router = new Router();
router.post(
  "/",
  auth(endPoint.create),
  fileUpload(fileValidation.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  asyncHandler(productController.createProduct)
);
router.put(
  "/update/:productId",
  auth(endPoint.update),
  fileUpload(fileValidation.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  asyncHandler(productController.updateProduct)
);
router.patch('/softDelete/:productId',auth(endPoint.softDelete),productController.softDelete);
router.delete('/forcedelete/:productId',auth(endPoint.forceDelete),asyncHandler(productController.forceDelete));
router.patch('/restore/:productId',auth(endPoint.restore),asyncHandler(productController.restore));
router.get('/softDelete',auth(endPoint.softDelete),asyncHandler(productController.getSoftDelete));
router.get('/:productId',asyncHandler(productController.getProduct));
router.get('/',asyncHandler(productController.getProducts));
export default router;
