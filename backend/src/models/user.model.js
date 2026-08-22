import { Schema , model } from 'mongoose'
import { hash , compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**
 * Mongoose Document Schema for The User/Customer.
 */
const UserSchema = new Schema({

    fullname : {
        firstname : {
            type : String ,
            required : [ true , 'Atleast First Name is Required for Createing an User Account.' ] ,
            minlength : [ 3 , 'First Name must be atleast 3 or More Characters.' ] 
        } ,
        lastname : {
            type : String ,
            minlength : [ 3 , 'Last Name must be atleast 3 or More Characters.' ] 
        }
    } ,
    
    email : {
        type : String ,
        required : [ true , 'Email is Required for Createing an User Account.' ] ,
        lowercase : true ,
        unique : true
    } ,

    password : {
        type : String ,
        required : [ true , 'Password is required for Creating an User Account.' ] ,
        select : false
    } ,

    socketid : {
        type : String
    }

}, { timestamps : true } )

/**
 * functional Method for Generating Authentication Token for Indivisual User.
 * @returns { string } the generated security token.
 */
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign( { _id : this._id } , process.env.JWT_SECRET ) ;
    return token ;
}

/**
 * functional method for comparing the stored and given Passwords.
 * @param { string } password The Password from the Client Side to the Server.
 * @returns { boolean } return the value according to the condition is true or false.
 */
UserSchema.methods.comparePasswords = async function ( password ) {
    return await compare( password , this.password )
}

/**
 * static method for hashing the given password for user Account.
 * @param { string } password The Password String for Account
 * @returns { string } the one way secure password for the given password. 
 */
UserSchema.statics.hashPassword = async function ( password ) {
    return await hash( password , 10 ) ;
}

export default model( "User" , UserSchema )