$( function() {

	var controller = new Leap.Controller({
			enableGestures: true
		}),
		$window = $( window ),
		$body = $( 'body' ),
		$wrapper = $( '#wrapper' ),
		$dot = $( '<span>' )
			.addClass( 'dot' ),
		$finger = $( '<div>' )
			.attr( 'id', 'finger' )
			.appendTo( $wrapper ),
		width = $window.width(),
		height = $window.height();

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
	controller.on( 'frame' , function( frame ){
		var showFinger = false,
			// get the first hand we see
			hand = frame.hands[0];

		if( hand ) {
			// grab the first finger we see
			var finger = hand.fingers[0];

			if( finger ) {
				showFinger = true;
				// and get its position on the screen
				var fingerPos = leapToScene( frame, finger.tipPosition );

				$finger.css( 'left', fingerPos[0] + 'px' )
					.css( 'top', fingerPos[1] + 'px' );

				//console.log( frame.gestures );

				if( frame.gestures.length && ( frame.gestures[0].type == 'screenTap' || frame.gestures[0].type == 'keyTap' ) ) {
					var $elem = $( document.elementFromPoint( fingerPos[0], fingerPos[1] ) );

					if( $elem.is( '.box' ) ) {
					    $elem.addClass( 'selected' );
					}
				}

			}
		}

		if( showFinger ) {
			$finger.show();
		} else {
			$finger.hide();
		}
	});


	// Add divider to page
	$( '<div>' )
		.attr( 'id', 'divider' )
		.appendTo( $body );

	controller.on( 'gesture', function ( gesture ){
		if( gesture.type === 'screenTap' ){
			//console.log( gesture );
			//addDot( gesture );
			//selectPointed( gesture );
		}
	});

	function selectPointed( gesture ) {
		var left = getLeft( gesture ),
			top =  getTop( gesture ),
			elem = document.elementFromPoint( left, top );

		$( elem ).addClass( 'selected' );
	}

	function addDot( gesture ) {
		var id = 'dot_' + gesture.id,
			left = getLeft( gesture ),
			top =  getTop( gesture );

		$dot.clone()
			.attr( 'id', id )
			.css( 'left', left )
			.css( 'top', top )
			.appendTo( $wrapper );
	}

	function getLeft( gesture ) {
		return ( gesture.position[0] * scale ) + xOffset;
	}

	function getTop( gesture ) {
		return yOffset - ( gesture.position[1] * scale );
	}

	controller.connect();
	console.log( controller );
} );