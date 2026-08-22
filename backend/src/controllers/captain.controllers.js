import Captain from '../models/captain.model.js' ;
import BlackListedToken from '../models/blacklist.token.model.js' ;

/**
 * Controller Function for Registeration of Captain.
 */
export async function Register ( req , res ) {

    const { fullname , email , password , vehicle } = req.body ;
    
    const hashedPassword = await Captain.hashPassword( password ) ;
    
    const isExist = await Captain.findOne({ email }) ;

    if ( isExist ) {
        return res.json({
            success : false ,
            message : "Captain Account with (" + email.trim() + ") already exists."
        })
    }

    const captain = await Captain.create({
        fullname , email , password : hashedPassword , vehicle
    }) ;

    const token = captain.generateAuthToken() ;

    res.cookie( 'token' , token )
    
    return res.status(201).json({ success: true , token , captain })
}

/**
 * Controller Function for Logging Captain In.
 */
export async function Login ( req , res ) {

    const { email , password } = req.body ;

    const captain = await Captain.findOne({ email }).select("+password") ;

    const isPasswordCorrect = await captain.comparePasswords( password ) ;
    
    if ( !captain || !isPasswordCorrect ) {
        return res.status(401).json({
            success : false ,
            message : "Invalid Credentials!"
        })
    }

    const token = captain.generateAuthToken() ;

    res.cookie( 'token' , token )

    return res.json({ success : true , captain , token })

}

/**
 * Controller Funcyion for Logging Captain Out.
 */
export async function Logout ( req , res ) {

    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1] ;

    await BlackListedToken.create({ token }) ;
    res.clearCookie( 'token' )

    res.json( { success : true , message : "Logout Successfully." } )

}

/**
 * Controller Function for Getting Active Captain Profiles Data.
 */
export async function GetProfileData ( req , res ) {
    return res.json({ success : true , captain : req.captain })
}