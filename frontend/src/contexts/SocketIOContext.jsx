import React from 'react'
import { io } from 'socket.io-client' ;

const SocketIOContext = React.createContext();
const socket = io( import.meta.env.VITE_SERVER_URL ) ;

function ScoketProvider({children}) {

    React.useEffect( function () {

        socket.on( "connect" , function ( ) {
            console.log( "Connected to server" )
        })

        socket.on( "disconnect" , function ( ) {
            console.log( "Disconnected to server" )
        })

    } , [ ] )

    const value = { socket } ;

    return (
        <SocketIOContext.Provider value={value} >
            {children}
        </SocketIOContext.Provider>
    )
}

export default ScoketProvider

export function useSocketContext () {
    return React.useContext( SocketIOContext )
}