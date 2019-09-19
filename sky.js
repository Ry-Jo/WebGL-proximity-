( function(engine, $, undefined) {

		engine.sky		= engine.sky || function(){};

		var sceneCube	= {};
		var cameraCube	= {};
		var cubeTarget	= {};
		
		engine.sky.constructor = engine.sky;
			
		engine.sky.prototype.create = function(){
			
			cameraCube = new THREE.PerspectiveCamera(engine.config.camera.view_angle, engine.config.camera.aspect, engine.config.camera.near, engine.config.camera.far);
			
			sceneCube = new THREE.Scene();	
			cubeTarget = new THREE.Vector3(0,0,0);	
			
			// loading textures 
			var path = "textures/skybox/";
			var format = '.jpg';
			var urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];
				
			var textureCube = THREE.ImageUtils.loadTextureCube( urls );
			
			// load built-in shader
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value  = textureCube;
			
			var material = new THREE.ShaderMaterial( {
					fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: shader.uniforms,
					depthWrite: false,
					side: THREE.BackSide
			});
					
			var mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );					
			sceneCube.add(mesh);
		}
		
		engine.sky.prototype.render = function(renderer){
			
			var target = engine.system.getControls().getDirection();
					
			cubeTarget.x = - target.x;	
			cubeTarget.y = + target.y;
			cubeTarget.z = - target.z;	
								
			cameraCube.lookAt(cubeTarget);		
			renderer.render(sceneCube, cameraCube );
		}	
		
		function resizeWindow(){
			
			cameraCube.aspect = window.innerWidth / window.innerHeight;
			cameraCube.updateProjectionMatrix();
		}
		
		$(window).resize(resizeWindow);

}(window.engine = window.engine || {}, jQuery));