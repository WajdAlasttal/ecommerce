import { Router } from "express";
import * as cartController from "./controller/Cart.controller.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Cart.endpoint.js";
import validation from "../../Middleware/validation.js";
import { asyncHandler } from "../../Services/errorHandling.js";
const router = Router();
router.post("/", auth(endPoint.create), cartController.addProductToCart);

export default router;
