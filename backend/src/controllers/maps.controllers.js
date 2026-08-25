import * as MapsServices from "../services/maps.google.services.js";

import { isLength, isNum } from "../middlewares/validator.middleware.js";


export async function getCoordinates ( req , res ) {
    const { address } = req.body ;

    if ( isLength( address , { min : 6 } ) ) {
        return res.json({
            success : false ,
            error : "The Address must be 6 Characters Long."
        })
    }

    try {
        const coordinates = await MapsServices.get_Coordinates( address ) ;
        return res.json({
            success : true ,
            coordinates
        })
    } catch (err) {
        console.log( "Maps Controller (getCoordinate) Err : " + err.message )
        return json({
            success : false ,
            message : err.message
        })
    }
}

export async function getDistanceTime ( req , res ) {

    const { origin , destination } = req.query ;

    if (
        isLength( origin , { min : 6 } ) ||
        isLength( destination , { min : 6 } )
    ) {
        return res.json( { success : false , message : "Enter Valid Origin & Destination." } )
    }

    try {
        const data = await MapsServices.get_Distance_Time( { origin , destination } ) ;
        return res.json( { success : true , data } )
    } catch ( err ) {
        console.log( " --> Maps Controller ( getDistanceTime ) Err : " + err.message )
        return res.json( {success : false , message : err.message } )
    }
}

export async function getSuggestions ( req , res ) {

    const { query } = req.query ;

    if ( !isLength( query , { min : 3 } ) ) {
        return res.json( { success : false , message : "Enter atleast 3 Characters to Get Suggestions." } )
    }

    try {
        
        const suggestions = await MapsServices.get_suggestions( query ) ;
        return res.json( { success : true , suggestions })

    } catch ( err ) {
        console.log( " -> Maps Controller ( getSuggestions ) Err : " + err.message )
        return res.json({ success : false , message : err.message })
    }

}