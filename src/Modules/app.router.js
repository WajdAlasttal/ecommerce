import connectDB from '../../DB/connection.js';
import AuthRouter from './Auth/Auth.router.js';
import UserRouter from './User/User.router.js';
import CategoryRouter from './Category/Category.router.js';
import SubCategoryRouter from './SubCategory/SubCategory.router.js';
import CouponRouter from './Coupon/Coupon.router.js';
import BrandRouter from './Brand/Brand.router.js';
import ProductRouter from './Product/Product.router.js';
import CartRouter from './Cart/Cart.router.js';
import OrderRouter from './Order/Order.router.js';

import path from 'path'; 
import {fileURLToPath} from 'url';
import { globalErrorHandler } from '../Services/errorHandling.js';
 const __dirname = path.dirname(fileURLToPath(import.meta.url));
 const fullPath=path.join(__dirname,'../upload');

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/upload',express.static(fullPath));
    app.use("/auth", AuthRouter);
    app.use('/user', UserRouter);
    app.use('/category',CategoryRouter);
    app.use('/subcategory',SubCategoryRouter);
    app.use('/coupon',CouponRouter);
    app.use('/brand',BrandRouter);
    app.use('/product',ProductRouter);
    app.use('/cart',CartRouter);
    app.use('/order',OrderRouter);


    app.use('/*', (req,res)=>{
        return res.json({messaga:"page not found"});
    })

    //global error handler
    app.use(globalErrorHandler)

}

export default initApp;