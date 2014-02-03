( function() {
	var scene = new THREE.Scene(),
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 ),
		renderer = new THREE.WebGLRenderer();

	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.CubeGeometry(1,1,1 ),
		material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } ),
		cube = new THREE.Mesh( geometry, material ),
		light = new THREE.AmbientLight( 0x404040 );

	scene.add( cube );
	scene.add( light );
	camera.position.z = 5;

	( function render() {
		requestAnimationFrame( render );
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render( scene, camera );
	}() );

}() );