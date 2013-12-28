$( function() {
	var controller = new Leap.Controller({
			enableGestures: true
		} ),
		$window = $( window ),
		$wrapper = $( '#wrapper' ),
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

				// my scroll - works okay
				/*if( hand.fingers.length === 2 ) {
					var lastFrame = controller.frame(1);

					if( lastFrame.hands.length ) {
						var lastHand = lastFrame.hands[0];

						if( lastHand.fingers.length === 2 ) {
							var lastFinger = lastHand.fingers[0],
								lastFingerPos = leapToScene( lastFrame, lastFinger.tipPosition );
console.log( lastFingerPos );
console.log( fingerPos );
							if( ( lastFingerPos[1] - fingerPos[1] ) > 10  ) {
								console.log( 'scroll down' );
								document.body.scrollTop = document.body.scrollTop + 10;
							} else if( ( lastFingerPos[1] - fingerPos[1] ) < 10  ) {
								console.log( 'scroll up' );
								document.body.scrollTop = document.body.scrollTop - 10;
							}
						}
					}
				}*/
			}
		}

		if( showFinger ) {
			$finger.show();
		} else {
			$finger.hide();
		}
	} );

	// scrolling from https://github.com/hdragomir/wave-to-scroll/blob/gh-pages/leapscroll.js
	(function (Leap) {
		"use strict";
		var treshold = 0.7;
		var amplifier_x = 7;
		var amplifier_y = -7;
		var compare_to = null;
		Leap && Leap.loop(function (frame) {
			if (!frame.valid || frame.pointables.length < 3 || frame.hands.length !== 1) {
				compare_to = null;
				return;
			}
			if (compare_to) {
				var t = compare_to.translation(frame),
					mx = t[0],
					my = t[1];
				Math.abs(mx) > treshold || (mx = 0);
				Math.abs(my) > treshold || (my = 0);
				(mx || my) && window.scrollBy(mx * amplifier_x, my * amplifier_y);
			}
			compare_to = frame;
		});
	} (typeof Leap !== "undefined" ? Leap : null));


	controller.connect();
	window.controller = controller;
} );

