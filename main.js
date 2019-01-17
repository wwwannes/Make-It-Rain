function init(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 5;
  camera.lookAt(new THREE.Vector3(0,0,0));

  var particleGeo = new THREE.Geometry();
  var particleMat = new THREE.PointsMaterial({
    size: 5,
    transparent: true,
    map: new THREE.TextureLoader().load('dollar-bill.png'),
    depthWrite: false
  });
  var particleCount = 5000;
  var particleDistance = 150;

  for(var i = 0; i<particleCount; i++){
    var posX = (Math.random() - 0.5) * particleDistance;
    var posY = (Math.random() - 0.5) * particleDistance;
    var posZ = (Math.random() - 0.5) * particleDistance;
    var particle = new THREE.Vector3(posX, posY, posZ);

    particleGeo.vertices.push(particle);
  }

  var particleSystem = new THREE.Points(particleGeo, particleMat);
  particleSystem.name = "dollar-bill";
  scene.add(particleSystem);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor('rgb(255,182,193)');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement);

  update(renderer, scene, camera);

  return scene;
}

function update(renderer, scene, camera){
  renderer.render(scene, camera);

  var particleSystem = scene.getObjectByName('dollar-bill');
  particleSystem.geometry.vertices.forEach(function(particle){
    particle.y -= 0.1;

		if (particle.y < -50) {
			particle.y = Math.random() * 50;
		}
  });

  particleSystem.geometry.verticesNeedUpdate = true;

  requestAnimationFrame(function(){
    update(renderer, scene, camera);
  });
}

var scene = init();
