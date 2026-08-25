import { useState, createContext, useEffect, useContext } from 'react'

import axios from '../utils/axios.js' ;
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast' ;

const UserContext = createContext() ;

function UserProvider({ children }) {

	const [ user , setUser ] = useState( {
		email : '' ,
		fullname : {
			firstname : '' ,
			lastname : ''
		}
	} ) ;
	const [ captain , setCaptain ] = useState( {
		email : '' ,
		fullname : {
			firstname : '' ,
			lastname : ''
		}
	} ) ;

	const navigate = useNavigate() ;

	async function authenticateUser () {
		const { token } = localStorage ;
		if ( !token ) {
			toast.error('Please Login before Use.')
			navigate("/login")
		}
		try {
			const { data } = await axios.get( `/api/${ localStorage?.current?.toLowerCase() === 'captain' ? 'captain' : 'user' }/profile` ) ;
			console.log(" ---------------> ",data)
			if ( data.success ) {
				if ( localStorage?.current === 'user' ) {
					setUser( data.user )
				} else if ( localStorage?.current === 'captain' ) {
					setCaptain( data.captain )
				}
			} else {
				toast.error( data.message )
			}
		} catch ( err ) {
			toast.error( err.message )
		}
	}
	
	const value = { user , setUser , captain , setCaptain }
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