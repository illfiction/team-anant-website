import * as THREE from 'three'

export function loadSatellite() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, 256, 256)
  ctx.fillStyle = 'black'
  ctx.font = '20px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('insert satellite model here', 128, 128)

  const texture = new THREE.CanvasTexture(canvas)
  const mat = new THREE.MeshBasicMaterial({ map: texture })
  const geo = new THREE.BoxGeometry(3, 3, 3)
  const mesh = new THREE.Mesh(geo, [mat, mat, mat, mat, mat, mat])
  mesh.position.set(20, 0, 60)
  return mesh
}
