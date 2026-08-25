'--- Imports ---'
import 'dotenv/config.js' ;
import http from 'http' ;
import { app } from "./src/app.js" ;
import { initializeSocket } from './src/utils/socket.io.utils.js';

'--- Declarations ---'
const PORT = process.env.PORT || 5000 ;

'--- Creating an Instance of Server ---'
const server = http.createServer( app )

initializeSocket( server )

'--- Listening ---'
server.listen( PORT , () => {
    console.log( ` ---> Your Backend Server for UBER is running at http://127.0.0.1:${PORT} .` )
} )