import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadEarth } from '../objects/earth'
import { loadSatellite } from '../objects/satellite'
import { createCamera } from '../scene/camera'
import { createScene } from '../scene/scene'

gsap.registerPlugin(ScrollTrigger)



export function startScrollAnimations(camera) {
  gsap.to(camera.position, {
    z: 30,
    scrollTrigger: {
      trigger: '#section-2',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    }
  })

  // You can add more keyframes or lookAt changes here
}
