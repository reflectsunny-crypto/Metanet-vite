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

  if (keys['w']) camera.position.z -= speed;
  if (keys['s']) camera.position.z += speed;
  if (keys['a']) camera.position.x -= speed;
  if (keys['d']) camera.position.x += speed;
}

/* --------------------------------------------------
   9. ANIMATE (QUI VA!)
-------------------------------------------------- */
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  movePlayer();   // <--- QUI CHIAMI IL MOVIMENTO

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
