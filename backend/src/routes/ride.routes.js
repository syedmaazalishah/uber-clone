import { Router } from "express";
import { Ride_Create , Ride_GetFare , Ride_Confirm , Ride_Start } from '../middlewares/validator.middleware.js'
import { AuthUser , AuthCaptain } from '../middlewares/auth.middleware.js'
import * as Controllers from '../controllers/ride.controllers.js'

/**
 * Express Router For Ride Endpoints
 */
const RideRouter = Router()
//  method, endpoint     , authentication ,  validation    ,  controller function.
    .post(  "/create"    ,  AuthUser      ,  Ride_Create   ,  Controllers.CreateRide   )
    .get(   "/get-fare"  ,  AuthUser      ,  Ride_GetFare  ,  Controllers.GetFare      )
    .post(  "/confirm"   ,  AuthCaptain   ,  Ride_Confirm  ,  Controllers.ConfirmRide  )
    .post(  "/start"     ,  AuthCaptain   ,  Ride_Start    ,  Controllers.StartRide    )

;
export default RideRouter;