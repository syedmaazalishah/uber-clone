import Ride from '../models/ride.model.js';
import { get_Distance_Time } from '../services/maps.google.services.js'
import crypto from 'crypto'
import { sendMessageToSocketID } from './socket.io.utils.js';

export async function calculateFare ( origin , destination ) {

    if ( !origin || !destination ) {
        throw new Error( "Pickup and Destination are Required for Calculating Fare." )
    }

    const distanceTime = await get_Distance_Time({origin , destination}) ;

    const baseFare = {
        rikshaw : 10 ,
        motorcycle : 10 ,
        car : 50 
    }
    
    const perKM = {
        rikshaw : 10 ,
        motorcycle : 10 ,
        car : 50
    }
    
    const perMinute = {
        rikshaw : 3 ,
        motorcycle : 5 ,
        car : 20
    }
    
    const fares = {
        rikshaw : Math.ceil(baseFare.rikshaw + ( ( distanceTime.distance.value / 1000 ) * perKM.rikshaw ) + ( ( distanceTime.duration.value / 60 ) * perMinute.rikshaw )) ,
        car : Math.ceil(baseFare.car + ( ( distanceTime.distance.value / 1000 ) * perKM.car ) + ( ( distanceTime.duration.value / 60 ) * perMinute.car )),
        motorcycle : Math.ceil(baseFare.motorcycle + ( ( distanceTime.distance.value / 1000 ) * perKM.motorcycle ) + ( ( distanceTime.duration.value / 60 ) * perMinute.motorcycle ))
    }

    return fares
}

/**
 * The Function for Generating The One Time Password of desired Length.
 * @param {Number} digits The Number of Digits in OTP (Length of OTP).
 * @returns the Generated String of Random Number.
 */
const generateOTP = (digits)=>crypto.randomInt(Math.pow(10,digits-1),Math,pow(10,digits)).toString() ;

export async function create ({ userID , pickup , destination , selectedRide }) {

    if ( !userID || !pickup || !destination || !selectedRide ) {
        throw new Error( "All Fields are Required" )
    }

    

    const fares = await calculateFare( pickup , destination ) ;

    const ride = Ride.create({
        user : userID , pickup , destination , fare : fares[selectedRide] , otp : generateOTP(4)
    })

    return ride ;

}

export async function confirmRide ( rideID , captainID ) {
    if ( !rideID ) {
        throw new Error("Ride ID is REQUIRED.")
    }

    await ride.findByIdAndUpdate( rideID , {
        status : "accepted" ,
        captain : captainID
    } )

    const ride = await Ride.findOne({
        _id : rideID
    }).populate("captain").populate("user") ; 

    if ( !ride ) {
        throw new Error("Ride not Found.")
    }

    return ride;
}

export async function startRide ( { rideID , otp } ) {
    if ( !rideID || !otp ) {
        throw new Error("OTP & rideID is required..")
    }

    try {    
        const ride = await Ride.findOne( { _id : rideID } ).populate("user").populate("captain").select("+otp") ;

        if ( !ride ) {
            throw new Error( "Ride not Found." ) ;
        }

        if ( ride.status === 'accepted' ) {
            throw new Error( "Ride is not Accepted Yeh." )
        }

        if ( ride.otp !== otp ) {
            throw new Error( "Invalid OTP." )
        }

        const updatedRide = await Ride.findByIdAndUpdate( rideId , { status : "ongoing" } , { new : true } ) 

        sendMessageToSocketID( ride.user.socketid , {
            event : "ride-started" ,
            data : updatedRide
        } )

        return updatedRide ;

    } catch ( err ) {
        console.log( " -> Ride Utils ( StartRide ) Err : " + err.message )
    }
}


// const RideUtils = {
//     create : (create) , calculateFare : (calculateFare)
// }
// export default RideUtils