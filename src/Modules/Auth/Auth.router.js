import {Router} from 'express';
import * as AuthController from './controller/Auth.controller.js';
import { asyncHandler } from '../../Services/errorHandling.js';
import validation from '../../Middleware/validation.js';
import * as validators from './Auth.validation.js';
const router =Router();

router.post('/signup',asyncHandler(AuthController.signup))
router.post('/login',asyncHandler(AuthController.login))
router.get('/confirmEmail/:token',AuthController.confirmEmail)
router.get('/NewconfirmEmail/:token',AuthController.confirmEmail)


export default router;