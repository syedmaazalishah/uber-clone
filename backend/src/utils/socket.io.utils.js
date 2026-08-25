
import { Server } from 'socket.io' ;

import User from '../models/user.model.js' ;
import Captain from '../models/captain.model.js' ;



let IO ;

export async function initializeSocket ( server ) {

    IO = new Server( server , {
        cors : {
            origin : "*" ,
            methods: ["GET","POST"]
        }
    } )

    IO.on( 'connection' , function ( socket ) {
        console.log( " -> Client Connected : " + socket.id )

        socket.on( 'join' , async function ( data ) {
            const { userID , userType } = data ;

            if ( userType === 'user' ) {
                await User.findByIdAndUpdate( userID , { socketid : socket.id } )
            } else if ( userType === 'captain' ) {
                await Captain.findByIdAndUpdate( userID , { socketid : socket.id } )
            }
        } )

        socket.on( 'update-location' , async function ( data ) {
            const { userType , userID , location } = data ;

            if ( !location || !location.ltd || !location.lng ) {
                socket.emit( 'error' , { message : "Invalid Location." } )
            }
            
            if ( userType === 'user' ) {
                await User.findByIdAndUpdate( userID , { location } )
            } else if ( userType === 'captain' ) {
                await Captain.findByIdAndUpdate( userID , { location } )
            }
        } )

        socket.on( 'disconnect' , function() {
            console.log( " -> Client Disconnected : " + socket.id )
        } )
    } )

}

export function sendMessageToSocketID ( socketID , messageObj ) {

    if ( IO ) {
        IO.to( socketID ).emit( messageObj?.event , messageObj?.data)
    } else {
        console.log( " -> Utils ( Socket.io) Err : Sockets are not initialized yet. " )
    }

}

export default { initializeSocket , sendMessageToSocketID }