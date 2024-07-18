const mongoose=require("mongoose")
const bookingSchema=new mongoose.Schema({
    tour:{
        type:mongoose.Schema.ObjectId,
        required:[true,"a booking must have a tour"],
        ref:"Tour"
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true,"a booking must have a user"],
        ref:"User"
    },
    price:{
        type:Number,
        required:[true,"a booking must have a price"]
    },
    createdAt:{
        type:String,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    }
})
const Booking=mongoose.model("Booking",bookingSchema)
module.exports=Booking