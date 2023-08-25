import cartModel from "../../../../DB/model/Cart.model.js";
import productModel from "../../../../DB/model/Product.model.js";

export const addProductToCart = async (req, res, next) => {
  const { productId, qty } = req.body;
  const product = await productModel.findById(productId);
  if (!product) {
    return next(new Error("failed there is no such a product", { cause: 400 }));
  }
  if (product.stock < qty) {
    return next(new Error("invalid product quantity", { cause: 400 }));
  }
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    const newCart = await cartModel.create({
      userId: req.user._id,
      products: [
        {
          productId,
          qty,
        },
      ],
    });
    return res.status(201).json({ message: "success", newCart });
  }
  let matchProducts = false;
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].productId.toString() === productId) {
      cart.products[i].qty = qty;
      matchProducts = true;
      break;
    }
    if (!matchProducts) {
      cart.products.push({ productId, qty });
    }
  }
  await cart.save();
  return res.status(200).json({ message: "success" });
};
