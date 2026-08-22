import { Router } from 'express' ;
import * as Controllers from '../controllers/user.controllers.js' ;
import * as Validators from '../middlewares/validator.middleware.js' ;
import * as Middlewares from '../middlewares/auth.middleware.js' ;

/**
 * Router for User's Endpoints.
 */
const UserRouter = Router()
    .post( '/login' , Validators.UserLogIn , Controllers.Login )
    .post( '/register' , Validators.UserRegisteration , Controllers.Register )
    .get( "/logout" , Middlewares.AuthUser , Controllers.Logout )
    .get( "/profile" , Middlewares.AuthUser , Controllers.GetProfileData )
;

export default UserRouter ;