import { Router } from "express";
import * as orderController from "./controller/Order.controller.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import { endPoint } from "./Order.endpoint.js";
import { auth } from "../../Middleware/auth.middleware.js";

const router = new Router();
router.post(
  "/",
  auth(endPoint.create),
  asyncHandler(orderController.createOrder)
);
router.post(
  "/allItemsFromCart",
  auth(endPoint.create),
  asyncHandler(orderController.createOrderallItemsFromCart)
);
router.patch(
  "/cancel/:orderId",
  auth(endPoint.cancel),
  asyncHandler(orderController.cancelOrder)
);
router.patch(
  "/update/:orderId",
  auth(endPoint.update),
  asyncHandler(orderController.updateOrderStatusFromAdmin)
);

export default router;
