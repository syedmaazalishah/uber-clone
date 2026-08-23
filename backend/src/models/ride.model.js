import { Schema , model } from 'mongoose' ;


const RideSchema = new Schema({

    user : {
        type : Schema.Types.ObjectId ,
        ref : "User" ,
        required : true 
    } ,

    captain : {
        type : Schema.Types.ObjectId ,
        ref : "Captain" ,
    } ,

    pickup : {
        type : String ,
        required : [ true , "Pickup Point is Required." ]
    } ,

    destination : {
        type : String ,
        required : [ true , "Destination Point is Required." ]
    } , 

    fare : {
        type : Number ,
        required :true 
    } ,

    status : {
        type : String ,
        enum : [ "pending" , "accepted" , "ongoing" , "completed" , "cancelled" ] ,
        default : "pending"
    } , 

    duration : {
        type : Number ,
    } ,

    distance : {
        type : Number
    } ,
    
    paymentID : {
        type  : String 
    } ,

    orderID : {
        type : String 
    } ,

    signature : {
        type : String 
    } ,

    otp : {
        type : String ,
        select : false ,
        required : true 
    }

})

export default model( "Ride" , RideSchema )