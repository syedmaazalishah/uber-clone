import { useContext, createContext, useState, useEffect } from 'react'

import axios from '../utils/axios.js' ;
import toast from 'react-hot-toast' ;

const AppContext = createContext() ;

const AppProvider = ({children}) => {

    const [ token , setToken ] = useState( localStorage?.token )
    const [ constants  , setConstants ] = useState({
        vehicle : {
            colors : [ 'black' , 'white' , 'gray' , 'silver' ] ,
            types : [ 'motorcycle' , 'car' , 'auto' ]
        }
    })

    const apisDictionary = {
        UserLogin : '/api/user/login' ,
        UserRegister : '/api/user/register' ,
        CaptainLogin : '/api/captain/login' ,
        CaptainRegister : '/api/captain/register'
    } ;


    async function fetchGlobalConstants () {
        try {
            const { data } = await axios.get( '/api/constants' ) ;

            if ( data.success ) {
                setConstants( data.constants ) ;
            } else {
                toast.error( data.message )
            }
        } catch ( err ) {
            toast.error( err.message )
        }
    }

    useEffect( function() {
        fetchGlobalConstants()
    } , [] )

    return (
        <AppContext.Provider value={{token , setToken , apisDictionary , constants }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

export function useAppContext() {
    return useContext( AppContext ) ;
}