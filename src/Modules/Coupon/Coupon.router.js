import { Router } from "express";
import * as couponController from './controller/Coupon.controller.js';
import * as validators from './Coupon.validation.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import validation from "../../Middleware/validation.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Coupon.endpoint.js";
const router = Router();
router.post('/',auth(endPoint.create),validation(validators.createCoupon),
asyncHandler(couponController.createCoupon));
router.get('/',auth(endPoint.get),couponController.getCoupon);
router.put('/update/:couponId',auth(endPoint.update),validation(validators.updateCoupon),
asyncHandler(couponController.updateCoupon));
router.get('/:couponId',auth(endPoint.get),validation(validators.getCouponById),asyncHandler(couponController.getCouponById));

export default router;