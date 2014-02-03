( function() {
	var scene = new THREE.Scene(),
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 ),
		renderer = new THREE.WebGLRenderer(),
		ambientLight = new THREE.AmbientLight( 0x404040 ),
		directionalLight = new THREE.DirectionalLight( 0xFFFFFF );

	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	directionalLight.position.set( 3, 2, 1 ).normalize();

	scene.add( ambientLight );
	scene.add( directionalLight );

	camera.position.set( 100, 100, 100 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	function update() {
		/*line.rotation.x += 0.03;
		line.rotation.y += 0.03;
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;*/
	}

	function render() {
		renderer.render( scene, camera );
	}

	( function animate() {
		requestAnimationFrame( animate );
		//update();
		render();
	}() );

	( function addForegroundLines() {
		var foregroundMaterial = new THREE.LineBasicMaterial( { color: 0x0093FF } ),
			xLineFront = new THREE.Geometry(),
			yLineFront = new THREE.Geometry(),
			zLineFront = new THREE.Geometry();

		// Lines in the forefront
		xLineFront.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		xLineFront.vertices.push( new THREE.Vector3( 1000, 0, 0 ) );

		scene.add( new THREE.Line( xLineFront, foregroundMaterial ) );

		yLineFront.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		yLineFront.vertices.push( new THREE.Vector3( 0, 1000, 0 ) );

		scene.add( new THREE.Line( yLineFront, foregroundMaterial ) );

		zLineFront.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		zLineFront.vertices.push( new THREE.Vector3( 0, 0, 1000 ) );

		scene.add( new THREE.Line( zLineFront, foregroundMaterial ) );
	}() );

	/*( function addBackgroundLines() {
		var backgroundMaterial = new THREE.LineBasicMaterial( { color: 0xFF0059 } ),
			xLineBack = new THREE.Geometry(),
			yLineBack = new THREE.Geometry(),
			zLineBack = new THREE.Geometry();

		// Lines in the background
		xLineBack.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		xLineBack.vertices.push( new THREE.Vector3( -1000, 0, 0 ) );

		scene.add( new THREE.Line( xLineBack, backgroundMaterial ) );

		yLineBack.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		yLineBack.vertices.push( new THREE.Vector3( 0, -1000, 0 ) );

		scene.add( new THREE.Line( yLineBack, backgroundMaterial ) );

		zLineBack.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		zLineBack.vertices.push( new THREE.Vector3( 0, 0, -1000 ) );

		scene.add( new THREE.Line( zLineBack, backgroundMaterial ) );

	}() );*/


	function addCube( pos ) {
		console.log( pos );
		var cubeGeometry = new THREE.CubeGeometry( 5, 5, 5 ),
			cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x00FF00 } ),
			cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

		cube.position.set( pos[0], pos[1], pos[2] );
		scene.add( cube );
	}

	( function addCubes() {
		var i,
			pos = {
				x: -100,
				y: -100,
				z: -100
			};

		while( pos.x < 100 && pos.y < 100 && pos.x < 100 ) {
			for( i in pos ) {
				addCube( [( pos.x * -1 ), ( pos.y * -1 ), ( pos.z * -1 )] );
				addCube( [pos.x, pos.y, pos.z] );
				pos[i] += 20;
			}
		}
	}() );


	function checkRotation(){
		var x = camera.position.x,
			y = camera.position.y,
			z = camera.position.z,
			rotSpeed = .02;

		if (keyboard.pressed("left")){
			camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
			camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
		} else if (keyboard.pressed("right")){
			camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
			camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
		}

		camera.lookAt(scene.position);
	}

}() );