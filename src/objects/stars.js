import * as THREE from 'three'

export function addStars() {
  const geo = new THREE.BufferGeometry()
  const starCount = 1000
  const positions = []

  for (let i = 0; i < starCount; i++) {
    positions.push((Math.random() - 0.5) * 200)
    positions.push((Math.random() - 0.5) * 200)
    positions.push((Math.random() - 0.5) * 200)
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  const texture = new THREE.TextureLoader().load('/white_circle.png')
  const mat = new THREE.PointsMaterial({
    color: 0xffffd0,
    size: 0.3,
    alphaMap: texture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  return new THREE.Points(geo, mat)
}
