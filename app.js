/*
 * Module Dependencies
 */

var express = require( 'express' ),
	stylus = require( 'stylus' ),
	nib = require( 'nib' ),
	_ = require( 'underscore' ),
	app = express(),
	http = require( 'http' ),
	server = http.createServer( app ).listen( 3000 ),
	io = require( 'socket.io' ).listen( server ),
	requirejs = require( 'requirejs' ),
	pages = [
		{
			template: 'index',
			title: 'Home',
			path: ''
		},
		{
			title: 'Leap',
			template: 'leap'
		},
		{
			title: 'Leap Gestures',
			template: 'gestures'
		},
		{
			title: 'scm',
			template: 'SCM Music Player Sandbox'
		},
		{
			title: 'Ajax Tabs Example',
			template: 'ajax_tabs'
		},
		{
			title: 'Testing WhiteSpace NoWrap in IE',
			template: 'nowrap'
		},
		{
			title: 'Playing with bourbon',
			template: 'bourbon'
		},
		{
			title: 'Three.js',
			template: 'threejs'
		}
	];

/**
 * Route all pages
 * Requires data.path and data.title
 * @param data object
 */
function routeApp( data  ) {
	if( data.path === undefined ) {
		data.path = data.template;
		if( data.path === undefined ) {
			throw "A path or template must be specified for each page route.";
		}
	}

	app.get( '/' + data.path, function( req, res ) {
		res.render( data.template, {
			title: data.title
		} );
	} );
}

_.each( pages, routeApp );

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

app.use( requirejs );

// set public files directory
app.use( express.static( __dirname + '/public' ) );

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