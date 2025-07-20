import * as THREE from 'three'

export function addLights(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  const point = new THREE.PointLight(0xffffff, 100, 100)
  point.position.set(21, 21, 21)
  scene.add(ambient, point)
}
