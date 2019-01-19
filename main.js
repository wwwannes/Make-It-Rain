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

  var loader = new THREE.FontLoader();
  loader.load("font.json", function(font){
    var font;
    var color = 0xffdf00;
    var material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    })
    var message1 = "Make";
    var message2 = "it";
    var message3 = "rain";
    var shapes = font.generateShapes(font, 100);
    var geometry1 = new THREE.TextGeometry(message1.toUpperCase(), {
      font: font,
      size: 4,
      height: 0
    });
    var geometry2 = new THREE.TextGeometry(message2.toUpperCase(), {
      font: font,
      size: 4,
      height: 0
    });
    var geometry3 = new THREE.TextGeometry(message3.toUpperCase(), {
      font: font,
      size: 4,
      height: 0
    });

    geometry1.computeBoundingBox();
    geometry2.computeBoundingBox();
    geometry3.computeBoundingBox();
    geometry1.translate(0, 0, 0);
    geometry2.translate(0, 0, 0);
    geometry3.translate(0, 0, 0);

    text1 = new THREE.Mesh(geometry1, material);
    text2 = new THREE.Mesh(geometry2, material);
    text3 = new THREE.Mesh(geometry3, material);

    text1.position.x = -15;
    text1.position.y = -5;
    text1.position.z = -40;
    text1.rotation.x = 0;
    text1.rotation.y = .2;
    text1.rotation.z = 0;

    text2.position.x = -10;
    text2.position.y = -10;
    text2.position.z = -40;
    text2.rotation.x = 0;
    text2.rotation.y = .2;
    text2.rotation.z = 0;

    text3.position.x = -14;
    text3.position.y = -15;
    text3.position.z = -40;
    text3.rotation.x = 0;
    text3.rotation.y = .2;
    text3.rotation.z = 0;

    scene.add(text1);
    scene.add(text2);
    scene.add(text3);
  });

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
