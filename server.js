const express = require( 'express' );
const { json } = require( 'body-parser' );
const fireBase = require( './server/fireBase' );

const app = express();
const port = process.env.PORT ? process.env.PORT : 9000;

app.use( json() );
app.use( express.static( `${ __dirname }/public` ) );

app.route( '/api/fireBase/login' ).post( fireBase.login );
app.route( '/api/fireBase/getData' ).get( fireBase.getData );
app.route( '/api/fireBase/updateUserInfo' ).post( fireBase.updateUserInfo );

app.listen( port, () => `Listening on port ${ port }.`  );
