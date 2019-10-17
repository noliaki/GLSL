import {
  Vector3,
  BufferGeometry,
  BufferAttribute,
  PlaneGeometry,
  PlaneBufferGeometry,
  Math as ThreeMath
} from 'three'

import { getRandomPointOnSphere } from './helper'

const count: number = 10000
const dimension: number = 3
const itemVertices: number = 3
const faceVertices: number = itemVertices * dimension
const totalVertices: number = count * faceVertices

// const planeGeometry: PlaneBufferGeometry = new PlaneBufferGeometry(10, 10, 1, 1)

const geometry: BufferGeometry = new BufferGeometry()
const vertices: Float32Array = new Float32Array(totalVertices)
const indeces: Uint32Array = new Uint32Array(count * itemVertices)

for (let i: number = 0; i < count; i++) {
  const center: Vector3 = getRandomPointOnSphere(
    ThreeMath.randFloat(200, 10000)
  )

  for (let j: number = 0; j < itemVertices; j++) {
    const vertex: Vector3 = getRandomPointOnSphere(ThreeMath.randFloat(10, 50))
    const index: number = i * faceVertices + j * dimension

    vertices[index + 0] = center.x + vertex.x
    vertices[index + 1] = center.y + vertex.y
    vertices[index + 2] = center.z + vertex.z
  }
}

indeces.forEach((val: number, index: number, arr: Uint32Array): void => {
  arr[index] = index
})

console.log(geometry)

geometry.addAttribute('position', new BufferAttribute(vertices, dimension))
geometry.setIndex(new BufferAttribute(indeces, 1))

export default geometry
