import { Router } from "express";
import { Ride_Create } from '../middlewares/validator.middleware.js'
import { AuthUser } from '../middlewares/auth.middleware.js'
import * as Controllers from '../controllers/ride.controllers.js'

/**
 * Express Router For Ride Endpoints
 */
const RideRouter = Router()
    .post( "/create" , AuthUser , Ride_Create , Controllers.CreateRide )




export default RideRouter;