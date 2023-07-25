
import connectDB from '../../DB/connection.js';
import AuthRouter from './Auth/Auth.router.js';
import UserRouter from './User/User.router.js';
import CategoryRouter from './Category/Category.router.js';
import SubCategoryRouter from './SubCategory/SubCategory.router.js';
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

    app.use('/*', (req,res)=>{
        return res.json({messaga:"page not found"});
    })

    //global error handler
    app.use(globalErrorHandler)

}

export default initApp;