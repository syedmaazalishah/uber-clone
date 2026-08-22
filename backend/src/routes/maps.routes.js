
import { Router } from 'express' ;
import * as Middlewares from '../middlewares/auth.middleware.js' ;
import * as Controllers from '../controllers/maps.controllers.js'

/**
 * Express Router for Maps Endpoints'
 */
const MapsRouter = Router()
    .get( "/get-address" , Controllers.getAddress ) 
    .get( "/get-coordinates" , Controllers.getCoordinates ) 
    .get( "/get-distance-time" , Controllers.getDistanceTime )
    .get( "/get-suggestions" , Controllers.getSuggestions )
;
 
export default MapsRouter ;