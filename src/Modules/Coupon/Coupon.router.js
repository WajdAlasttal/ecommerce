import { Router } from "express";
import * as couponController from './controller/Coupon.controller.js';
import * as validators from './Coupon.validation.js';
import { asyncHandler } from "../../Services/errorHandling.js";
import validation from "../../Middleware/validation.js";
const router = Router();
router.post('/',validation(validators.createCoupon),
asyncHandler(couponController.createCoupon));
router.get('/',couponController.getCoupon);
router.put('/update/:couponId',validation(validators.updateCoupon),
asyncHandler(couponController.updateCoupon));
router.get('/:couponId',validation(validators.getCouponById),asyncHandler(couponController.getCouponById));

export default router;