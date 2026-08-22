import { Schema , model } from 'mongoose' ;

const BlackListedTokenSchema = new Schema({
    
    token : {
        type : String ,
        required : true ,
        unique : true
    } ,

    createdAt : {
        type : Date ,
        default : Date.now ,
        expires : 259200
    }
})

export default model( 'BlackListedToken' , BlackListedTokenSchema ) ;