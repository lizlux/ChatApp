$( function() {

	var controller = new Leap.Controller({
			//enableGestures: true
		}),
		$window = $( window ),
		$body = $( 'body' ),
		$wrapper = $( '#wrapper' ),
		$dot = $( '<div>' )
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
	controller.on( 'connect', function(){
		Leap.loop( handleFrame )
	} );

	function handleFrame( frame ){
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

				if( frame.gestures.length && ( frame.gestures[0].type == 'screenTap' || frame.gestures[0].type == 'keyTap' ) ) {
					$finger.hide();
					var $elem = $( document.elementFromPoint( fingerPos[0], fingerPos[1] ) );
					$finger.show();

					console.log( $elem );

					if( $elem.is( '.box' ) ) {
						$elem.addClass( 'selected' );
					} else {
						addDot( $dot.clone(), fingerPos[0], fingerPos[1] );
					}
				}
			}
		}

		if( showFinger ) {
			$finger.show();
		} else {
			$finger.hide();
		}
	}

	function addDot( $dot, left, top ) {
		console.log( 'adding dot' );
		$dot
			.css( 'left', left )
			.css( 'top', top )
			.appendTo( $wrapper );

		setTimeout( function() {
			$dot.fadeOut( 'fast', function () {
				$dot.remove();
			} );
		}, 1000 );
	}

	controller.connect();

	window.controller = controller;
} );