import { Router } from 'express' ;
import * as Controllers from '../controllers/captain.controllers.js' ;
import * as Validators from '../middlewares/validator.middleware.js' ;
import * as Middlewares from '../middlewares/auth.middleware.js' ;

/**
 * Express Router for Captain's Endpoints.
 */
const CaptainRouter = Router()
    .post( '/login' , Validators.CaptainLogin , Controllers.Login )
    .post( '/register' , Validators.CaptainRegisteration , Controllers.Register )
    .get( '/logout' , Middlewares.AuthCaptain , Controllers.Logout )
    .get( '/profile' , Middlewares.AuthCaptain , Controllers.GetProfileData )
    
;
export default CaptainRouter ;