import * as Ride from "../utils/ride.utils.js" ;
import * as MapsServices from '../services/maps.google.services.js' ;
import { sendMessageToSocketID } from "../utils/socket.io.utils.js";

import User from '../models/user.model.js' ;
import Captain from '../models/captain.model.js' ;
// import Ride from '../models/ride.model.js' ;
import rideModel from "../models/ride.model.js";

export async function CreateRide ( req , res ) {
    
    if ( !req.validationCompleted ) {
        return res.json({success:false,message : "All Fields are Required..."})
    }

    try {
        const ride = await Ride.create({...req.body , userID : req.user._id})
        res.json({success : true , ride})

        const pickupCoordinates = await MapsServices.get_Coordinates( req.body?.pickup )

        const captainsInRadius = await  MapsServices.get_nearestCaptains( pickupCoordinates.ltd , pickupCoordinates.lng , 3 )

        ride.otp = "" ;

        const rideWithUser = await Ride.findOne({ _id : ride._id }).populate( 'user') ;

        captainsInRadius.map( async captain => {
            sendMessageToSocketID( captain.socketid , {
                event : "new-ride" ,
                data : rideWithUser ,
            } )
        } )
    

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

export async function ConfirmRide ( req , res ) {

    if ( !req.validationCompleted ) {
        return res.json({success:false,message : "Origin & Destination are Required..."})
    }

    const { rideID } = req.body ;

    try {
        
        const ride = await Ride.confirmRide( rideID , req.captain._id )

        sendMessageToSocketID( ride?.user?.socketid , {
            event : "ride-confirmed" ,
            data : ride
        } )

        return res.json( {
             success : true ,
             ride 
        } )

    } catch ( err ) {
        console.log( " -> Ride Contoller ( ConfirmRide ) Err : " + err.message )
        return res.json({success :false ,message:err.message})
    }

}

export async function StartRide ( req , res ) {
    if ( !req.validationCompleted ) {
        return res.json({success:false,message : "Origin & Destination are Required..."})
    }

    try {
        const ride = await Ride.startRide( req.body )
        return res.json({success:true,ride})
    } catch ( err ) {
        console.log( " -> Ride Controllers ( StartRide ) Err : " + err.message ) ;
        return res.json({success:false,message : err.message})
    }
}