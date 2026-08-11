import * as THREE from 'three';

/* --------------------------------------------------
   1. SCENE
-------------------------------------------------- */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101018); // cielo scuro futuristico


/* --------------------------------------------------
   2. CAMERA
-------------------------------------------------- */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 10);
camera.lookAt(0, 0, 0);


/* --------------------------------------------------
   3. RENDERER
-------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


/* --------------------------------------------------
   4. OGGETTI (CUBO)
-------------------------------------------------- */
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ffea });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


/* --------------------------------------------------
   5. TERRENO
-------------------------------------------------- */
const planeGeo = new THREE.PlaneGeometry(2000, 2000);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


/* --------------------------------------------------
   6. LUCI
-------------------------------------------------- */
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(10, 20, 10);
scene.add(directional);


/* --------------------------------------------------
   7. INPUT (WASD)
-------------------------------------------------- */
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);


/* --------------------------------------------------
   8. MOVIMENTO
-------------------------------------------------- */
function movePlayer() {
  const speed = 0.1;

  if (keys["w"]) {
    cube.position.x += Math.sin(camera.rotation.y) * speed;
    cube.position.z += Math.cos(camera.rotation.y) * speed;
  }

  if (keys["s"]) {
    cube.position.x -= Math.sin(camera.rotation.y) * speed;
    cube.position.z -= Math.cos(camera.rotation.y) * speed;
  }

  if (keys["a"]) {
    cube.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * speed;
    cube.position.z += Math.cos(camera.rotation.y + Math.PI / 2) * speed;
  }

  if (keys["d"]) {
    cube.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * speed;
    cube.position.z += Math.cos(camera.rotation.y - Math.PI / 2) * speed;
  }
}


/* --------------------------------------------------
   9. ANIMATE
-------------------------------------------------- */
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  movePlayer();

  // CAMERA SEGUE IL CUBO
  camera.position.x = cube.position.x + 5;
  camera.position.y = cube.position.y + 3;
  camera.position.z = cube.position.z + 5;

  camera.lookAt(cube.position);

  renderer.render(scene, camera);
}


/* --------------------------------------------------
   10. RESIZE
-------------------------------------------------- */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


/* --------------------------------------------------
   11. AVVIO
-------------------------------------------------- */
animate();
