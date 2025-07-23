import './styles/style.css'
import gsap from 'gsap'
import * as THREE from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);


import { createScene } from './scene/scene.js'
import { createCamera } from './scene/camera.js'
import { addLights } from './scene/lights.js'
import { loadEarth } from './objects/earth.js'
import { loadSatellite } from './objects/satellite.js'
import { addStars } from './objects/stars.js'
import { setupResizeHandler } from './utils/resize.js'
// import { startScrollAnimations } from './animation/scroll.js'
import { createSpeedLines } from './objects/speed_lines.js';

const { scene, renderer } = createScene()
const camera = createCamera()
camera.position.set(0, 0, 80)
addLights(scene)

const earth = loadEarth()
const satellite = loadSatellite()
const stars = addStars()

scene.add(earth)
scene.add(satellite)
scene.add(stars)

const speedLines = createSpeedLines(camera)

speedLines.visible = false;
// speedLines.material.opacity = 0;

setupResizeHandler(camera, renderer)

camera.lookAt(earth.position);

gsap.to(camera.position, {
  x: 0,
  y: 0,
  z: 80,
  scrollTrigger: {
    trigger: '#intro',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    markers: true
  },
  onUpdate: () => {
    camera.lookAt(earth.position)
  }
});

gsap.fromTo(camera.position, {
  x: 0,
  y: 0,
  z: 80,
},
  {
  x: 20,
  z: 70,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: '#zoom-sat',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    markers: true,
  },
});

gsap.fromTo(camera.position, {
  x: 20,
  z: 70,
},
{
  x: 40,
  y: 10,
  z: 60,
  ease: "power1.inOut",
  onUpdate: () => {
    camera.lookAt(satellite.position)
  },
  scrollTrigger: {
    trigger: '#orbit-sat',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    markers: true,
  },
});

const tempObject = new THREE.Object3D()
tempObject.position.copy(satellite.position)
console.log(tempObject.position)

gsap.to(tempObject.position,{
  x:0,
  y: 0,
  z: 0,
  ease: "sine.in",
  onUpdate: () => {
    camera.lookAt(tempObject.position)
  },
  scrollTrigger: {
    trigger: '#look-at-earth',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    markers: true,
  },
});

gsap.fromTo(camera.position,{
  x: 40,
  y: 10,
  z: 60,
  },
  {
  x: 2.5,
  y: 0.6,
  z: 3.68,
  ease: "expo.out",
  onUpdate: () => {
    camera.lookAt(earth.position)
    earth.rotation.y += 0.01
  },
  scrollTrigger: {
    trigger: '#fly-earth',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    markers: true,
    onEnter: () => {
      if (speedLines && speedLines.children.length > 0) {
        speedLines.visible = true;
        gsap.fromTo(speedLines.children[0].material, { opacity: 0 }, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        });
      }
    },
    onLeaveBack: () => {
      if (speedLines && speedLines.children.length > 0) {
        gsap.to(speedLines.children[0].material, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => speedLines.visible = false
        });
      }
    }
  },
})


let earthRotation = true

earth.rotation.x += 0.3
function animate() {
  requestAnimationFrame(animate)
  if (earthRotation == true) {
    earth.rotation.y += 0.005    
  }   
  satellite.rotation.y += 0.01   
  satellite.rotation.x += 0.01
  satellite.rotation.z += 0.005

  if (speedLines && speedLines.visible && speedLines.children.length > 0) {
    const lineMaterial = speedLines.children[0].material;
    // Example: make lines move faster when opacity is higher
    const currentSpeed = lineMaterial.opacity * 0.5; // Scale movement speed by opacity
    speedLines.position.z += currentSpeed; // Move speedLines forward relative to camera
    
    // Reset lines if they move too far past the camera
    if (speedLines.position.z > 0) {
        speedLines.position.z = -100; // Reset far behind the camera
    }
  }

  renderer.render(scene, camera)
}
animate()
