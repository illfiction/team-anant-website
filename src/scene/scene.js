import * as THREE from 'three'

export function createScene() {
  const scene = new THREE.Scene()
  const spaceTexture = new THREE.TextureLoader().load('/space.jpg')
  spaceTexture.colorSpace = THREE.SRGBColorSpace
  
  scene.background = spaceTexture

  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  return { scene, renderer }
}
