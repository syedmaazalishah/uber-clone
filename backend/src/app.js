import express       from 'express' ;
import cors          from 'cors' ;
import cookieParser  from 'cookie-parser' ;
import dns           from 'dns';

import { colors , types } from './constants/vehicle.constants.js' ;


'--- Routers ---'
import UserRouter    from './routes/user.routes.js' ;
import CaptainRouter from './routes/captain.routes.js' ;
import MapsRouter    from './routes/maps.routes.js';
import RideRouter    from './routes/ride.routes.js';


'--- Creating an Instance of Express App ---'
const app = express() ;


'--- Global Middelwares ---'
dns.setServers(['8.8.8.8']);
app.use( cors()                                  ) ;
app.use( express.json()                          ) ;
app.use( express.urlencoded({ extended : true }) ) ;
app.use( cookieParser()                          ) ;


'--- DataBase StartUp ---'
import connectDB from './configs/connectDB.js';
try {
    await connectDB() ;
} catch ( err ) {
    console.log( " ---> Server Shuted Down : Database Err " + err.message )
    process.exit(0) ;
}


'--- Routers ---'
app.get( "/" , ( req , res ) => {
    return res.status( 200 ).json( {
        success : true ,
        message : "Backend Server is Live" ,
        health : 'Better'
    } )
} ) ;
app.get( "/api/constants" , async function () {
    const data = {
        success : true ,
        vehicle : { colors , types }
    }

    res.json( data )
} );
app.use( "/api/user"    , UserRouter    ) ;
app.use( "/api/captain" , CaptainRouter ) ;
app.use( "/api/map"     , MapsRouter    ) ;
app.use( "/api/ride"    , RideRouter    ) ;


'--- Exporting App --- '
export { app };
export default app;