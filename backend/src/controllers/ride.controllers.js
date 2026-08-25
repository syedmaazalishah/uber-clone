import Ride from "../utils/ride.utils.js";



export async function CreateRide ( req , res ) {
    
    if ( !req.validationCompleted ) {
        return res.json({success:false,message : "All Fields are Required..."})
    }

    try {
        const ride = await Ride.create({...req.body , userID : req.user._id})

        
        return res.json({success : true , ride})
    } catch ( err ) {
        console.log( " -> Ride Contollers ( Create ) Err : " + err.message ) ;
        return res.json( { success : false , message : err.message })
    }
    
}

export async function GetFare ( req , res ) {
    
    if ( !req.validationCompleted ) {
        return res.json({success:false,message : "Origin & Destination are Required..."})
    }
    
    try {
        const { origin , destination } = req.query ;
        const fares = await Ride.calculateFare( origin , destination ) ;
        return res.json({success : true , fares})
    } catch ( err ) {
        console.log( " -> Ride Contollers ( GetFare ) Err : " + err.message ) ;
        return res.json( { success : false , message : err.message })
    }
}