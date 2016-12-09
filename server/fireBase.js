var firebase = require( 'firebase' );
// var config = require( './config/config' );
var config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

module.exports = {
  login( req, res ) {
    if (firebase.apps.length === 0) {
      firebase.initializeApp( config );
    }

    this.auth = firebase.auth();

    this.auth.signInWithEmailAndPassword( req.body.email, req.body.password ).catch( error => {
      return res.status( 500 ).json( error );
    } );

    this.auth.onAuthStateChanged( response => {
      firebase.database().ref( 'users/' + this.auth.currentUser.uid ).once( 'value' ).then( response => {
        return res.status( 200 ).json( response.val() );
      } );
    } );
  },

  getData( req, res ) {
    firebase.database().ref( 'data/' ).once( 'value' ).then( response => {
      return res.status( 200 ).json( response.val() );
    } );
  },

  updateUserInfo( req, res ) {
    if (firebase.apps.length === 0) {
      firebase.initializeApp( config );
    }

    firebase.database().ref( `users/${ this.auth.currentUser.uid }/completedDays` ).set( req.body ).then( response => {
      return;
    } );
  }
}
