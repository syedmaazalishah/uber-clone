import { connect } from 'mongoose' ;

async function connectDB () {
    await connect( process.env.DB_ADDRESS )
        .then( function () {
            console.log( " ---> Database Connected Successfully." )
        } )
        .catch( function ( err ) {
            console.log( " ---> Database Err : (" + err.message + ")." )
        } )
}

export default connectDB ;