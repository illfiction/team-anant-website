import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene()
const spaceTexture = new THREE.TextureLoader().load('/space.jpg')

scene.background = spaceTexture

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg")
})

renderer.outputColorSpace = THREE.SRGBColorSpace
spaceTexture.colorSpace = THREE.SRGBColorSpace
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.z = 80

renderer.render(scene,camera)

// const controls = new OrbitControls(camera, renderer.domElement)

const satelliteText = document.createElement('canvas')
satelliteText.width = 256
satelliteText.height = 256

const satelliteTextctx = satelliteText.getContext('2d')

satelliteTextctx.fillStyle = 'white'
satelliteTextctx.fillRect(0,0,satelliteText.width,satelliteText.height)

satelliteTextctx.font = '20px Arial';
satelliteTextctx.fillStyle = 'black';
satelliteTextctx.textAlign = 'center';
satelliteTextctx.textBaseline = 'middle';

satelliteTextctx.fillText("insert satellite model here", satelliteText.width / 2, satelliteText.height / 2);

const satelliteTexture = new THREE.CanvasTexture(satelliteText)
satelliteTexture.needsUpdate = true;

const satelliteGeometry = new THREE.BoxGeometry(3,3,3)
const textMaterial = new THREE.MeshBasicMaterial({
  map: satelliteTexture,
})
const satelliteMaterial = [textMaterial, textMaterial, textMaterial, textMaterial, textMaterial, textMaterial]
const satellite = new THREE.Mesh(satelliteGeometry,satelliteMaterial)
satellite.position.setZ(60)
satellite.position.setX(20)
// satellite.position.setX(20)
scene.add(satellite)


const pointLight = new THREE.PointLight(0xffffff,100,100,1)
pointLight.position.set(21,21,21)
scene.add(pointLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const starGeometry = new THREE.BufferGeometry()
const starCount = 1000
const positions = []

const starTexture = new THREE.TextureLoader().load('/white_circle.png')

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 200
  const y = (Math.random() - 0.5) * 200
  const z = (Math.random() - 0.5) * 200
  positions.push(x, y, z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

const starMaterial = new THREE.PointsMaterial({ color: 0xffffd0, size: 0.3, alphaMap: starTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
const stars = new THREE.Points(starGeometry,starMaterial)
scene.add(stars)


const earthTexture = new THREE.TextureLoader().load('/earth_texture.jpg');
const earthGeometry = new THREE.SphereGeometry(4,64,64);
const earthMaterial = new THREE.MeshStandardMaterial({
   map: earthTexture,
   metalness: 0.4,
   roughness: 0.6
  });
let earth = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earth)

const midpoint = new THREE.Vector3().addVectors(earth.position, satellite.position).multiplyScalar(0.5);
camera.position.set(0, 0, 80);

renderer.render(scene,camera)


gsap.to(camera.position,{
  scrollTrigger: {
    trigger: "#intro",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
  onUpdate: () => {
    targetLookAt.copy(midpoint);
  }
});
gsap.to(camera.position, {
  scrollTrigger: {
    trigger: "#zoom-sat",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
  x: satellite.position.x + 10,
  y: satellite.position.y + 5,
  z: satellite.position.z + 10,
  onUpdate: () => {
    targetLookAt.copy(satellite.position);
  }
});


function animate(){
  requestAnimationFrame(animate)

  // console.log(camera.position)

  earth.rotation.y += 0.005      
  satellite.rotation.y += 0.01   
  satellite.rotation.x += 0.01
  satellite.rotation.z += 0.005

  currentLookAt.lerp(targetLookAt, 0.05); // smooth interpolation
  camera.lookAt(currentLookAt);

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})