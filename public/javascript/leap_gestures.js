$( function() {

	var controller = new Leap.Controller({
			enableGestures: true
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

				if( frame.gestures.length && ( frame.gestures[0].type == 'screenTap' || frame.gestures[0].type == 'keyTap' ) ) {
					// TODO: this is no longer working - it's getting an element below it
					var $elem = $( document.elementFromPoint( fingerPos[0], fingerPos[1] ) );

					console.log( $elem );

					if( $elem.is( '.box' ) ) {
					    $elem.addClass( 'selected' );
					} else {
						addDot( $dot.clone(), fingerPos[0], fingerPos[1] );
					}
				}
			}
		}

		// scroll up and down
		if (frame.gestures.length) {
			console.log( 'frame' );
			var swipeDirection;
			for (var i = 0; i < frame.gestures.length; i++) {
				var gesture = frame.gestures[i];

				if (gesture.type == "swipe") {
					//Classify swipe as either horizontal or vertical
					var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
					//Classify as right-left or up-down
					if(isHorizontal){
						if(gesture.direction[0] > 0){
							swipeDirection = "right";
						} else {
							swipeDirection = "left";
						}
					} else { //vertical
						if(gesture.direction[1] > 0){
							swipeDirection = "up";
						} else {
							swipeDirection = "down";
						}
					}
				}
			}
			if( swipeDirection == 'up' ) {
				console.log( 'scroll up' );
				document.body.scrollTop = document.body.scrollTop - 10;
			} else if( swipeDirection == 'down' ) {
				console.log( 'scroll down' );
				document.body.scrollTop = document.body.scrollTop + 10;
			}

		}


		if( showFinger ) {
			$finger.show();
		} else {
			$finger.hide();
		}
	});

	function pageScroll( direction ) {
		var px = 20;

		setInterval( function() {
			document.body.scrollTop = document.body.scrollTop - px--;
		}, 200 );


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

	/*controller.on( 'connect', function () {
		console.log( 'connected' );
		var e={};
		var t={};
		var n=document.body;
		Leap.loop(function(t){
			var r={};
			var i={};
			for(var s=0, o=t.pointables.length; s!=o; s++){
				var u=t.pointables[s];
				var a=e[u.id];
				var f=n.scrollTop;
				if(document.hasFocus()){
					if(u.tipPosition[1]-325>0){n.scrollTop=f-=150}
					if(u.tipPosition[1]-125>0){n.scrollTop=f-=5}
					if(u.tipPosition[1]-90<0){n.scrollTop=f+=5}
				}
			}
		})
	} );*/


	controller.connect();
} );