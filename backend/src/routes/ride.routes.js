import { Router } from "express";
import { Ride_Create , Ride_GetFare } from '../middlewares/validator.middleware.js'
import { AuthUser } from '../middlewares/auth.middleware.js'
import * as Controllers from '../controllers/ride.controllers.js'

/**
 * Express Router For Ride Endpoints
 */
const RideRouter = Router()
    .post( "/create" , AuthUser , Ride_Create , Controllers.CreateRide )
//  method , endpoint , auth user , validation , controller function.
    .get( "/get-fare" , AuthUser , Ride_GetFare , Controllers.GetFare )


;
export default RideRouter;