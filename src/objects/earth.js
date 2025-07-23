import * as THREE from 'three'
const base = import.meta.env.BASE_URL

export function loadEarth() {
  const texture = new THREE.TextureLoader().load(`${base}earth_texture.jpg`)

  const geo = new THREE.SphereGeometry(4, 64, 64)
  const mat = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.4, roughness: 0.6 })
  const earth = new THREE.Mesh(geo, mat)
  return earth
}
