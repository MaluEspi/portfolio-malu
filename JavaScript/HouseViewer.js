//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 600 / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(600, 500);

// Append renderer to the viewer container
const container = document.getElementById("viewer");
container.appendChild(renderer.domElement);

// Add light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1, 0);
controls.update();

// Load the 3D model
const loader = new GLTFLoader();
loader.load(
  "./House.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(2, 2, 2);
    model.rotation.y = Math.PI;

    scene.add(model);
    camera.position.set(0, 1, 5);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  },
  undefined,
  function (error) {
    console.error("Erro ao carregar o modelo 3D:", error);
  }
);
