import axios from 'axios'

import Captain from '../models/captain.model.js' ;

export async function get_Coordinates ( address ) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY ;
    
    const full_url = `${process.env.GOOGLE_MAPS_URL_ENDPOINT}/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    
    try {

        const { data } = await axios.get( full_url ) ;

        if ( data.status === 'OK' ) {
            const { location } = data.results[ 0 ].geometry ;
            return location ;
        } else {
            throw new Error( {message : "Unable to Fetch Map Data."} )
        }

    } catch ( err ) {
        console.log( "Maps Service (getCoordinates) Err : " + err.message )
        throw err
    }

}

export async function get_Distance_Time ( { origin , destination } ) {
    
    if ( !origin || !destination ) {
        throw new Error( "Origin & Destination Both are Required" )
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY ;
    const full_url = `${process.env.GOOGLE_MAPS_URL_ENDPOINT}/distancematrix/json?origins=${encodeURIComponent(origin)}&destination=${destination}&key=${apiKey}`;
    
    try {
        const { data } = await axios.get( full_url ) ;

        if ( data.status === "OK" ) {
            if ( data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS' ) {
                throw new Error( "No Routes Found." )
            }
            return (data.rows[ 0 ].elements[ 0 ])
        } else {
            throw new Error( "Unable to Fetch Distance and Time." )
        }

    } catch (err) {
        console.log( " -> Maps Service (getDitanceTime) Err : " + err.message )
        throw err
    }

}

export async function get_suggestions ( address_query ) {

    if ( !address_query ) {
        throw new Error( "Address Query is Required." )
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY ;
    const full_url = `${process.env.GOOGLE_MAPS_URL_ENDPOINT}/place/autocomplete/json?input=${ encodeURIComponent(address_query) }`

    try {
        const { data } = await axios.get( full_url ) ;

        if ( data.status === "OK" ) {
            return data.predictions ;
        } else {
            throw new Error( "Unable to fetch API Data." )
        }
    } catch ( err ) {
        console.log( "Maps Service ( getSuggestions ) Err : " + err.message ) ;
        throw err ;
    }

}

export async function get_nearestCaptains (ltd , lng , radius ) {
    
    const captains = await Captain.find({
        location : {
            $geoWithin : {
                $centerSphere : [ [ ltd , lng ] , radius / 3963.2 ]
            }
        }
    })

    return captains ;

}