import gsap from 'gsap'
import * as THREE from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadEarth } from '../objects/earth'
import { loadSatellite } from '../objects/satellite'
import { createCamera } from '../scene/camera'
import { createScene } from '../scene/scene'

gsap.registerPlugin(ScrollTrigger)

const camera = createCamera()
const earth = loadEarth()
const satellite = loadSatellite()

camera.lookAt(earth.position);

// const dummy = new THREE.Object3D();
// dummy.position.copy(camera.position);
// dummy.lookAt(satellite.position);
// const targetQuaternion = dummy.quaternion.clone();



export function startScrollAnimations(camera) {
  const camera = createCamera()
  const earth = loadEarth()
  const satellite = loadSatellite()

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
    }
  });

  gsap.to(camera.position, {
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
    y: 5,
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

  
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: '#fly-earth',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      markers: true,
    },
  })

  timeLine.to(camera.quaternion, {
    x: 0.55337157109286,
    y: 0.069171446386607,
    z: 0.83005735663929,
    w: 0,
    ease: "power2.inOut"
  })
  .to(camera.position, {
    // x: 40,
    // y: 5,
    // z: 60,
    ease: "power2.inOut"
  },"<")
}
