$( function() {

	var controller = new Leap.Controller({
			enableGestures: true
		}),
		$body = $( 'body' ),
		$wrapper = $( '#wrapper' ),
		$dot = $( '<span>' )
			.addClass( 'dot' ),
		$finger = $( '<span>' )
			.addClass( 'finger' ),
		xOffset = $wrapper.width() / 2,
		yOffset = $wrapper.height(),
		scale = 2;

	// Add divider to page
	$( '<div>' )
		.attr( 'id', 'divider' )
		.appendTo( $body );

	controller.on( 'gesture', function ( gesture ){
		if( gesture.type === 'keyTap' || gesture.type === 'screenTap' ){
			console.log( gesture );
			addDot( gesture );
			selectPointed( gesture );
		}
	});


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
} );