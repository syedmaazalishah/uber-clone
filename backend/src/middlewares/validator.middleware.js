import { colors , types } from '../constants/vehicle.constants.js' ;

/**
 * validator function for checking email validity.
 * @param { string } email the desired email address you want to validate.
 * @returns the condition of validity.
 */
export function isEmail ( email ) {
    email = email.trim()
    if (email &&
        email.includes("@") &&
        email.split("").findIndex(v=>v==="@") > 0 &&
        email.includes(".") &&
        email.split("").findLastIndex(v=>v==="@") < email.split("").findLastIndex(v=>v==='.')
    ) {
        return true
    }
    return false
}

let options = {
    equal : 0 ,
    min : 0 ,
    max : 0
}
/**
 * valdator function for checking the length of Strings (length validation).
 * @param {string} string the string you want to validate.
 * @param {options} equal choose one condition and enter refrence value
 * @returns the condition of validity.
 */
export function isLength ( string , { equal, min, max } ) {
    string = String( string ) ;
    if (!string) {
        return Error("Enter String to Validate");
    }
    if ( !equal && !min && !max ) {
        return Error("Enter an option of comparison. equal , min , max ")
    }
    switch (true) {
        case string.split("").length === equal:
            return true
            break;
        case string.split("").length >= min:
            return true
            break;
        case string.split("").length <= max:
            return true
            break;
        default:
            return false
            break;
    }
}

/**
 * Validator Function for Checking Number.
 * @param {number} number The Number You want to Check.
 * @returns {boolean} The Result of Validation.
 */
export function isNum ( number ) {
    return number !== NaN && typeof( number ) === 'number' ;
}

/**
 * Validator function for checking the value inside an Array.
 * @param { any } val The Value of any Premitive Data Type you want to find in desired array.
 * @param {Array} arr The Array Where The Value might be located.
 * @returns {boolean} return the Result of Validation
 */
export function isIn ( val , arr ) {
    if ( !Array.isArray( arr ) ) return new Error('Enter Valid Array.') ;
    return arr.some( item => item === val ) ;
}

/**
 * Validator Middleware for User Registeration.
 */
export async function UserRegisteration (req, res, next) {
    const { email, password, fullname } = req.body;

    if ( !email || !password || !fullname.firstname ) {
        return res.json( {
            success : false , 
            message : "Fill all the Required Fields to Continue."
        } )
    }

    // console.log( email , password , fullname )

    // first check ( EMAIL ) ;
    if ( !isEmail( email ) ) {
        return res.json({ success : false , message : "Enter A Valid Email to Continue." })
    }
    
    // second check ( First Name ) ;
    if ( !isLength( fullname.firstname , { min : 3 } ) ) {
        return res.json({ success : false , message : "First name must be 3 or more Characters." })
    }
    
    // third check ( Password ) ;
    if ( !isLength( password , { min : 8 } ) ) {
        return res.json({ success : false , message : "Password must be 8 or more Characters." })
    }

    req.validationCompleted = true ;

    return next()
}

/**
 * Validator Middleware for User Login.
 */
export async function UserLogIn (req, res, next) {
    const { email, password } = req.body;

    if ( !email || !password ) {
        return res.json( {
            success : false , 
            message : "Fill all the Required Fields to Continue."
        } )
    }

    // first check ( EMAIL ) ;
    if ( !isEmail( email ) ) {
        return res.json({ success : false , message : "Enter A Valid Email to Continue." })
    }
    
    // second check ( Password ) ;
    if ( !isLength( password , { min : 8 } ) ) {
        return res.json({ success : false , message : "Password must be 8 or more Characters." })
    }

    req.validationCompleted = true ;

    return next()
}

/**
 * Validator function for Captain Registeration.
 */
export async function CaptainRegisteration ( req , res , next ) {

    const { fullname , email , password , vehicle } = req.body ;

    if ( 
        fullname?.firstname === '' ||
        email === '' ||
        password === '' ||
        vehicle?.plate === '' ||
        vehicle?.capacity === 0 ||
        vehicle?.vehicletype === '' ||
        vehicle?.color === ''
    ) return res.json({
        success : false ,
        message : "Fill all The Required Fields."
    }) ;

    if ( !isLength( fullname?.firstname , { min : 3 } ) ) {
        return res.json({
            success : false , message : "First Name must be 3 characters Long."
        })
    }
    
    if ( !isEmail( email ) ) {
        return res.json({
            success : false , message : "Enter Valid Email Address to Continue."
        })
    }

    if ( !isLength( password , { min : 8 } ) ) {
        return res.json({
            success : false , message : "Password must be 8 characters Long."
        })
    }
    
    if ( !isLength( vehicle?.plate , { min : 3 } ) ) {
        return res.json({
            success : false , message : "Vehicle Plate Number must be 3 characters Long."
        })
    }
    
    if ( vehicle?.capacity < 1 ) {
        return res.json({
            success : false , message : "The Capacity of Vehicle must be arLeast 1."
        })
    }
    
    if ( !isIn( vehicle?.color , colors ) ) {
        return res.json({
            success : false , message : "Enter a Valid Vehicle Color to Continue."
        })
    }
    
    if ( !isIn( vehicle?.vehicletype , types ) ) {
        return res.json({
            success : false , message : "Enter Valid Vehicle Type to continue."
        })
    }

    req.validationCompleted = true ;

    return next() ;
}

/**
 * Validator Function for Captain Login.
 */
export async function CaptainLogin ( req , res , next ) {
    const { email , password } = req.body ;

    if ( 
        email === '' ||
        password === ''
    ) return res.json({
        success : false ,
        message : "Fill all The Required Fields."
    }) ;
    
    if ( !isEmail( email ) ) {
        return res.json({
            success : false , message : "Enter Valid Email Address to Continue."
        })
    }

    if ( !isLength( password , { min : 8 } ) ) {
        return res.json({
            success : false , message : "Password must be 8 characters Long."
        })
    }

    req.validationCompleted = true ;

    return next() ;
}

// ---------------------------------------------------------------


export async function Ride_Create ( req , res , next ) {

    const { pickup , destination , selectedRide } = req.body ;

    if  ( !pickup || !destination || !selectedRide ) {
        return res.json({success: false , message : "Pickup, Destination and RideType are Required for Making a Ride" })
    }

    if ( !pickup || !isLength( pickup , { min : 3} ) ) {
        return res.json( { succes : false , message : "Invalid Pickup Point." } )
    }

    if ( !destination || !isLength( destination , { min : 3 } ) ) {
        return res.json( { succes : false , message : "Invalid Drop Point." } )
    }

    if ( !selectedRide || !isIn(selectedRide,['rikshaw','motorcycle','car']) ) {
        return res.json( { success : false , message : "Invalid Ride Type." })
    }

    req.validationCompleted = true ;

    return next()

}

export async function Ride_GetFare ( req , res , next ) {

    const { pickup , destination } = req.query ;

    if  ( !pickup || !destination ) {
        return res.json({success: false , message : "Pickup & Destination are Requied for Calculating Fare" })
    }

    if ( !pickup || !isLength( pickup , { min : 3} ) ) {
        return res.json( { succes : false , message : "Invalid Pickup Point." } )
    }

    if ( !destination || !isLength( destination , { min : 3 } ) ) {
        return res.json( { succes : false , message : "Invalid Drop Point." } )
    }

    req.validationCompleted = true ;

    return next()

}

export async function Ride_Confirm ( req , res , next ) {

    const { rideID } = req.body ;

    if ( !rideID ) {
        return res.json({success : false , message : "Ride ID is Required for accepting The Ride Request."})
    }

    req.validationCompleted = true

    return next()

}

export async function Ride_Start ( req , res , next ) {
    const { rideID , otp } = req.body ;

    if ( !otp ) {
        return res.json({success : false , message : "OTP is Required for Starting the Ride."})
    }
    if ( !rideID ) {
        return res.json({success : false , message : "Ride ID is Required for Starting the Ride."})
    }

    req.validationCompleted = true

    return next()
}