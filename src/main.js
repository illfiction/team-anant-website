import './styles/style.css'
import { createScene } from './scene/scene.js'
import { createCamera } from './scene/camera.js'
import { addLights } from './scene/lights.js'
import { loadEarth } from './objects/earth.js'
import { loadSatellite } from './objects/satellite.js'
import { addStars } from './objects/stars.js'
import { setupResizeHandler } from './utils/resize.js'
import { startScrollAnimations } from './animation/scroll.js'
import { add } from 'three/tsl'

const { scene, renderer } = createScene()
const camera = createCamera()
camera.position.set(0, 0, 90)
addLights(scene)

const earth = loadEarth()
const satellite = loadSatellite()
const stars = addStars()

scene.add(earth)
scene.add(satellite)
scene.add(stars)

setupResizeHandler(camera, renderer)

startScrollAnimations(camera)

function animate() {
  requestAnimationFrame(animate)

    // console.log(camera.position)

  earth.rotation.y += 0.005      
  satellite.rotation.y += 0.01   
  satellite.rotation.x += 0.01
  satellite.rotation.z += 0.005

  renderer.render(scene, camera)
}
animate()
