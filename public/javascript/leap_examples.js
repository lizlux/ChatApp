$(function() {

	// Leap Space
	( function leapSpace() {
		var canvas = document.getElementById( 'space-canvas' ),
			context =  canvas.getContext( '2d' ),
			controller = new Leap.Controller(),
			width = canvas.width,
			height = canvas.height;

		function leapToScene( frame, leapPos ){

			var iBox = frame.interactionBox,
				top = iBox.center[1] + iBox.size[1]/ 2,
				left = iBox.center[0] - iBox.size[0]/ 2,
				x = leapPos[0] - left,
				y = leapPos[1] - top;

			x /= iBox.size[0];
			y /= iBox.size[1];

			x *= width;
			y *= height;

			return [ x, -y ];
		}


		// Tells the controller what to do every time it sees a frame
		controller.on( 'frame' , function(frame){
			var i, j;

			//Clears the canvas so we are not drawing multiple frames
			context.clearRect( 0 , 0 , width , height );

			// First we loop through all of the hands that the frame sees
			for( i = 0; i < frame.hands.length; i++ ){

				// For each hand we define it
				var hand = frame.hands[i];

				// and get its position, so that it can be passed through
				// for drawing the connections
				var handPos = leapToScene( frame, hand.palmPosition );

				// Loop through all the fingers of the hand we are on
				for( j = 0; j < hand.fingers.length; j++ ){

					// Define the finger we are looking at
					var finger = hand.fingers[j];

					// and get its position in Canvas
					var fingerPos = leapToScene( frame, finger.tipPosition );


					//First Draw the Connection

					// Setting up the style for the stroke
					context.strokeStyle = "#FFA040";
					context.lineWidth = 3;

					// Drawing the path
					context.beginPath();

					// Move to the hand position
					context.moveTo(   handPos[0] ,   handPos[1] );

					// Draw a line to the finger position
					context.lineTo( fingerPos[0] , fingerPos[1] );

					context.closePath();
					context.stroke();


					//Second Draw the Finger

					// Setting up the style for the stroke
					context.strokeStyle = "#39AECF";
					context.lineWidth = 5;

					// Creating the path for the finger circle
					context.beginPath();

					// Draw a full circle of radius 6 at the finger position
					context.arc(fingerPos[0], fingerPos[1], 20, 0, Math.PI*2);

					context.closePath();
					context.stroke();

				}

				//Third draw the hand

				// Setting up the style for the fill
				/*context.fillStyle = "#FF5A40";

				// Creating the path for the hand circle
				context.beginPath();

				// Draw a full circle of radius 10 at the hand position
				context.arc(handPos[0], handPos[1], 40, 0, Math.PI*2);

				context.closePath();
				context.fill();*/

			}
		});


		controller.connect();
	} )();

	// Count your fingers
	( function countFingers() {
		var canvas = document.getElementById( 'count-canvas' ),
			context =  canvas.getContext( '2d' ),
			controller = new Leap.Controller(),
			width = canvas.width,
			height = canvas.height;

		// Defines the font shape and size
		context.font = "30px Arial";
		context.textAlign = 'center';
		context.textBaseline = 'middle';

		controller.on( 'frame' , function( frame ) {
			var numberOfFingers = frame.fingers.length;

			// Clear all frames before adding new text
			context.clearRect(0, 0, width, height);

			//Tells Canvas to draw the input string at the position defined
			context.fillText( numberOfFingers , width/2, height/2 );
		});

		controller.connect();
	} )();

	// Spawn Unicorn
	$( '#spawn-unicorn-button' ).on( 'click', function( e ) {
		var canvas = document.getElementById( 'spawn-unicorn-canvas' ),
			context =  canvas.getContext( '2d' ),
			controller = new Leap.Controller();

		e.preventDefault();

		controller.on( 'connect' , function() {
			console.log( 'Successfully connected.' );
			var img = document.createElement('img');

			img.src = "http://www.elisabethhubert.com/wp-content/uploads/2011/11/unicorn.jpg";

			img.onload = function() {
				img.style.width = '600px';
				img.style.height = '300px';

				context.drawImage( img, 0, 0 );
			};
		});

		controller.connect();
	});

});