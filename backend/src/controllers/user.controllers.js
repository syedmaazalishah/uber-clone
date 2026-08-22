import User from '../models/user.model.js' ;
import BlackListedToken from '../models/blacklist.token.model.js'

/**
 * Controller Function for Registeration of User.
 */
export async function Register ( req , res ) {

    const { fullname , password , email } = req.body ;
    
    const hashedPassword = await User.hashPassword( password ) ;
    
    const isExist = await User.findOne({ email }) ;

    if ( isExist ) {
        return res.json({
            success : false ,
            message : "Account with (" + email.trim() + ") already exists."
        })
    }

    const user = await User.create({
        fullname , email , password : hashedPassword
    }) ;

    const token = user.generateAuthToken() ;

    res.cookie( 'token' , token )
    
    return res.status(201).json({success:true , token , user })
}

/**
 * Controller Function for Logging User In.
 */
export async function Login ( req , res ) {

    const { email , password } = req.body ;

    const user = await User.findOne({ email }).select("+password") ;

    const isPasswordCorrect = await user.comparePasswords( password ) ;

    if ( !user || !isPasswordCorrect ) {
        return res.json({
            success : false ,
            message : "Invalid Credentials!"
        })
    }

    const token = user.generateAuthToken() ;

    res.cookie( 'token' , token )

    return res.json({ success : true , user , token })

}

/**
 * Controller Funcyion for Logging User Out.
 */
export async function Logout ( req , res ) {

    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1] ;

    await BlackListedToken.create({ token }) ;
    res.clearCookie( 'token' )

    res.json( { success : true , message : "Logout Successfully." } )

}

/**
 * Controller Function for Getting Active User Profiles Data.
 */
export async function GetProfileData ( req , res ) {
    return res.json({ success : true , user : req.user })
}