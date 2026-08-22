import { useState, createContext, useEffect, useContext } from 'react'

import axios from '../utils/axios.js' ;
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast' ;

const UserContext = createContext() ;

function UserProvider({ children }) {

	const [ user , setUser ] = useState({}) ;

	const navigate = useNavigate() ;

	async function authenticateUser () {
		const { token } = localStorage ;
		if ( !token ) {
			toast.error('Please Login before Use.')
			navigate("/")
		}
		try {
			const { data } = await axios.get( `/api/${ localStorage.current === 'captain' ? 'captain' : 'user' }/profile` ) ;
			if ( data.success ) {
				setUser( data.user )
			} else {
				toast.error( data.message )
			}
		} catch ( err ) {
			toast.error( err.message )
		}
	}
	
	const value = { user , setUser }
	useEffect( function() {
		authenticateUser()
	} , [] )

    return (
        <UserContext.Provider value={value} >{ children }</UserContext.Provider>
    )
}

export default UserProvider

export function useUserContext () {
	return useContext( UserContext )
}