
import socketIO from 'socket.io' ;

import User from '../models/user.model.js' ;
import Captain from '../models/captain.model.js' ;



let IO ;

export async function initializeSocket ( server ) {

    IO = socketIO( server , {
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

        socket.on( 'disconnect' , function() {
            console.log( " -> Client Disconnected : " + socket.id )
        } )
    } )

}

export function sendMessageToSocketID ( socketID , message ) {

    if ( IO ) {
        IO.to( socketID ).emit('message' , message)
    } else {
        console.log( " -> Utils ( Socket.io) Err : Sockets are not initialized yet. " )
    }

}

export default { initializeSocket , sendMessageToSocketID }