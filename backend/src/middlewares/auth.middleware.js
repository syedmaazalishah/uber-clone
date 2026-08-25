import User from '../models/user.model.js' ;
import Captain from '../models/captain.model.js' ;
import jwt from 'jsonwebtoken' ;
import BlackListedToken from '../models/blacklist.token.model.js' ;

/**
 * Middleware Function for Logged In User's Authentication.
 */
export async function AuthUser ( req , res , next ) {

    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1] ;

    const isBlackListed = await BlackListedToken.findOne( { token } ) ;

    if ( !token || isBlackListed ) {
        return res.status(401).json({
            success : false ,
            message : "Unauthorized Access!"
        })
    }

    try {

        const decoded = jwt.verify( token , process.env.JWT_SECRET ) ;
        const user = await User.findById( decoded._id ) ;

        req.user = user ;

        return next() ;
    } catch ( err ) {
        console.log( " ---> AuthUser Middleware Err : " + err.message ) ;
        return res.status(401).json({ success : false , message : "Unauthorized Access!" })
    }
}

/**
 * Middleware Function for Logged In Captain's Authentication.
 */
export async function AuthCaptain ( req , res , next ) {

    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1] ;

    const isBlackListed = await BlackListedToken.findOne( { token } ) ;

    if ( !token || isBlackListed ) {
        return res.status(401).json({
            success : false ,
            message : "Unauthorized Access!"
        })
    }

    try {

        const decoded = jwt.verify( token , process.env.JWT_SECRET ) ;
        const captain = await Captain.findById( decoded._id ) ;

        req.captain = captain ;

        return next() ;
    } catch ( err ) {
        console.log( " ---> AuthCaptain Middleware Err : " + err.message ) ;
        return res.status(401).json({ success : false , message : "Unauthorized Access!" })
    }
}
