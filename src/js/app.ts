import {
  Mesh,
  BufferGeometry,
  BufferAttribute,
  AxesHelper,
  Vector3,
  Math as ThreeMath
} from 'three'

import ThreeBase from './ThreeBase'
import material from './ParticleMaterial'

const PI: number = Math.PI
const count: number = 50000
let time: number = 0

const base: ThreeBase = new ThreeBase()
if (process.env.NODE_ENV === 'development') {
  const axes = new AxesHelper(1000)
  base.addToScene(axes)
}

const geometry: BufferGeometry = new BufferGeometry()
const vertices = new Float32Array(count * 9)

for (let i: number = 0; i < count; i++) {
  const center: Vector3 = getRandomPointOnSphere(Math.random() * 10000)
  vertices[i * 9 + 0] = center.x + 30
  vertices[i * 9 + 1] = center.y - 30
  vertices[i * 9 + 2] = center.z + 30

  vertices[i * 9 + 3] = center.x - 30
  vertices[i * 9 + 4] = center.y + 30
  vertices[i * 9 + 5] = center.z - 30

  vertices[i * 9 + 6] = center.x + 50
  vertices[i * 9 + 7] = center.y + 50
  vertices[i * 9 + 8] = center.z + 50
}

// itemSize = 3 because there are 3 values (components) per vertex
geometry.addAttribute('position', new BufferAttribute(vertices, 3))

const mesh: Mesh = new Mesh(geometry, material)
base.addToScene(mesh)
loop()

function loop(): void {
  material.uniforms.uTime.value = ++time
  base.tick()
  requestAnimationFrame(loop)
}

function getRandomPointOnSphere(r: number): Vector3 {
  const u: number = ThreeMath.randFloat(0, 1)
  const v: number = ThreeMath.randFloat(0, 1)
  const theta: number = 2 * PI * u
  const phi: number = Math.acos(2 * v - 1)

  return new Vector3(
    r * Math.sin(theta) * Math.sin(phi),
    r * Math.cos(theta) * Math.sin(phi),
    r * Math.cos(phi)
  )
}
