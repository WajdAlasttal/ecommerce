import joi from"joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const createBrand = joi.object({
    name :joi.string().min(2).max(20).required(),
    file:generalFeilds.file.required(),
    categoryId:generalFeilds.id.required(),
}).required();

export const updateBrand = joi.object({
    brandId: generalFeilds.id,
    name :joi.string().min(2).max(20),
    file:generalFeilds.file,
}).required();

export const getBrandById = joi.object({
    brandId: generalFeilds.id.required(),
}).required();