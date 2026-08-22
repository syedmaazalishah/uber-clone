import { model , Schema } from 'mongoose' ;
import { hash , compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { colors , types } from '../constants/vehicle.constants.js' ;

const CaptainSchema = new Schema({

    fullname : {

        firstname : {
            type : String ,
            required : [ true , 'Atleast First Name is Required for Createing an Captain Account.' ] ,
            minlength : [ 3 , 'First Name must be atleast 3 or More Characters.' ] 
        } ,

        lastname : {
            type : String ,
            minlength : [ 3 , 'Last Name must be atleast 3 or More Characters.' ] 
        }

    } ,
    
    email : {
        type : String ,
        required : [ true , 'Email is Required for Createing an Captain Account.' ] ,
        lowercase : true ,
        match : [ /^\S+@\S.\S+$/ , 'Please Enter Valid Email Address to Continue.' ] ,
        unique : true
    } ,

    password : {
        type : String ,
        required : [ true , 'Password is required for Creating an Captain Account.' ] ,
        select : false
    } ,

    socketid : {
        type : String
    } ,

    status : {
        type : String ,
        enum : [ 'active' , 'inactive' ] ,
        default : 'active'
    } ,

    vehicle : {

        color : {
            type : String ,
            enum : colors ,
            required : [ true , 'Color is Required for Vehicle.' ] ,
        } ,

        plate : {
            type : String ,
            required : [ true , 'Vehicle Plate Number is Required for Vehicle.' ] ,
            minlength : [ 3 , 'The Plate Number Must be 3 Characters Long.' ]
        } ,

        capacity : {
            type : Number ,
            required : [ true , 'The Capacity is Required For Vehicle.' ] ,
            min : [ 1 , 'The Minimum capacity of Vehicle must be 1 at Least.' ]
        } ,

        vehicletype : {
            type : String ,
            enum : types ,
            required : [ true , 'The Type is Required for Vehicle.' ]
        }

    } ,

    location : {
        
        lat : {
            type : Number
        } ,

        lng : {
            type : Number
        }

    }

} , { timestamps : true } ) ;

/**
 * functional Method for Generating Authentication Token for Indivisual Captain.
 * @returns { string } the generated security token.
 */
CaptainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign( { _id : this._id } , process.env.JWT_SECRET ) ;
    return token ;
}

/**
 * functional method for comparing the stored and given Passwords.
 * @param { string } password The Password from the Client Side to the Server.
 * @returns { boolean } return the value according to the condition is true or false.
 */
CaptainSchema.methods.comparePasswords = async function ( password ) {
    return await compare( password , this.password )
}

/**
 * static method for hashing the given password for Captain Account.
 * @param { string } password The Password String for Account
 * @returns { string } the one way secure password for the given password. 
 */
CaptainSchema.statics.hashPassword = async function ( password ) {
    return await hash( password , 10 ) ;
}

export default model( "Captain" , CaptainSchema ) ;