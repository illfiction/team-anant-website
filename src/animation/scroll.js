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

const dummy = new THREE.Object3D();
dummy.position.copy(camera.position);
dummy.lookAt(satellite.position);
const targetQuaternion = dummy.quaternion.clone();

export function startScrollAnimations(camera) {
  gsap.to(camera.position, {
    // z: 85,
    scrollTrigger: {
      trigger: 'intro',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    }
  });
  gsap.to(camera.quaternion, {
    x: targetQuaternion.x,
    y: targetQuaternion.y,
    z: targetQuaternion.z,
    w: -targetQuaternion.w,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: '#zoom-sat',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    }
    });
  // You can add more keyframes or lookAt changes here
}
