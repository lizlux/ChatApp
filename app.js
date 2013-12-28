/*
 * Module Dependencies
 */

var express = require( 'express' ),
	stylus = require( 'stylus' ),
	nib = require( 'nib' ),
	app = express(),
	http = require( 'http' ),
	server = http.createServer( app ).listen( 3000 );
	io = require( 'socket.io' ).listen( server );


app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.use( express.logger( 'dev' ) );

app.use( stylus.middleware( {
	src: __dirname + '/public',
	compile: function( str, path ) {
		return stylus( str )
			.set( 'filename', path )
			.use( nib() );
	}
} ) );

// set public files directory
app.use( express.static( __dirname + '/public' ) );


// Routing - todo: find a more streamlined way to do this
app.get( '/', function( req, res ) {
	res.render( 'index', {
		title: 'Home'
	} );
} );

app.get( '/leap', function( req, res ) {
	res.render( 'leap', {
		title: 'Leap'
	} );
} );

app.get( '/gestures', function( req, res ) {
	res.render( 'gestures', {
		title: 'Leap Gestures'
	} );
} );

app.get( '/scm', function( req, res ) {
	res.render( 'scm', {
		title: 'SCM Music Player Sandbox'
	} );
} );

app.get( '/ajax_tabs', function( req, res ) {
	res.render( 'ajax_tabs', {
		title: 'Ajax Tabs Example'
	} );
} );

io.sockets.on( 'connection', function( socket ) {

	socket.on( 'setPseudo', function( data ) {
		socket.set( 'pseudo', data );
	} );

	socket.on( 'message', function( message ) {
		socket.get( 'pseudo', function( error, name ) {
			var data = { 'message' : message, pseudo : name };
			socket.broadcast.emit( 'message', data );
			console.log( 'user ' + name + ' sent this : ' + message );
		} );
	} );
} );