import mongoose , {Schema,model,Types} from 'mongoose';
const productSchema = new Schema({
    name : {
        type:String,
        required : true,
        unique:true,
        trim:true
    },
    slug:{
        type: String,
        required:true
    },
    description:{
        type:String,
        stock:{
            type:Number,
            default:1,
        }
    },
    price:{
        type: Number,
        default:1, 
    },
    discount:{
        type: Number,
        default:0
    },
    finalPrice:{
        type: Number,
        default:1,  
    },
    colors:{
        type:[String],
    },
    sizes:{
        type:String,
        enum:['s','m','l','xl']    
    },
    mainImages : {
        type:Object,
        required : true,
    },
    subImages : [{
        type:Object,
    }],
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
    },
    subCategoryId:{
        type:Types.ObjectId,
        ref:'Subcategory',
        required:true,
    },
    brandId:{
        type:Types.ObjectId,
        ref:'Brand',
        required:true,
    },
    createdBy:{
        type:Types.ObjectId,
        ref : 'User',
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref : 'User',
        required:true
    },
    deleted:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps:true
});

const productModel = mongoose.models.Product || model('Product', productSchema);
export default productModel;