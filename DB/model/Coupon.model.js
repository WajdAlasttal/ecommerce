import mongoose , {Schema,model,Types} from 'mongoose';
const couponSchema = new Schema({
    name : {
        type:String,
        required : true,
        unique:true
    },
    amount :{
        type:Number,
        default:1,
    },
    expireDate:Date,
    usedBy:[
        {
        type:Types.ObjectId,
        ref:'User'
        },
    ],
    createdBy:{
        type:Types.ObjectId,
        ref : 'User'
    }
},
{
    timestamps:true
});

const couponModel = mongoose.models.Coupon || model('Coupon', couponSchema);
export default couponModel;