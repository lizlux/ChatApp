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

	camera.position.set( 20, 20, 20 );
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


	/*( function addCube() {
		var cubeGeometry = new THREE.CubeGeometry( 10, 10, 10 ),
			cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x00FF00 } ),
			cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

		cube.position.set( 5, 5, 5 );
		scene.add( cube );
	}() );*/

}() );