import Ride from '../models/ride.model.js';
import { get_Distance_Time } from '../services/maps.google.services'

async function calculateFare ( origin , destination ) {

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
        rikshaw : baseFare.rikshaw + (distanceTime.distance/1000 * perKM.rikshaw) + (distanceTime.time * perMinute.rikshaw) ,
        car : baseFare.car + (distanceTime.distance/1000 * perKM.car) + (distanceTime.time * perMinute.car) ,
        motorcycle : baseFare.motorcycle + (distanceTime.distance/1000 * perKM.motorcycle) + (distanceTime.time * perMinute.motorcycle) 
    }

    return fares
}

export async function create ({ userID , pickup , destination , selectedRide }) {

    if ( !userID || !pickup || !destination || !selectedRide ) {
        throw new Error( "All Fields are Required" )
    }

    const fares = await calculateFare( pickup , destination ) ;

    const ride = Ride.create({
        user : userID , pickup , destination , fare : fares[selectedRide]
    })

    return ride ;

}




const RideUtils = {
    create : (create) , calculateFare : (calculateFare)
}
export default RideUtils