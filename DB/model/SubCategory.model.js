import mongoose , {Schema,model,Types} from 'mongoose';
const subcategorySchema = new Schema({
    name : {
        type:String,
        required : true,
        unique:true
    },
    slug : {
        type:String,
        required : true,
    },
    image : {
        type:Object,
        required : true,
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
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
    }
},
{
    timestamps:true
});

const subcategoryModel = mongoose.models.Subcategory || model('Subcategory', subcategorySchema);
export default subcategoryModel;