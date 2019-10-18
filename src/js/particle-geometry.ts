import {
  Vector3,
  BufferGeometry,
  BufferAttribute,
  PlaneGeometry,
  PlaneBufferGeometry,
  Math as ThreeMath
} from 'three'

import { getRandomPointOnSphere } from './helper'

const count: number = 100000
const dimension: number = 3
const itemVertices: number = 3
const faceVertices: number = itemVertices * dimension
const totalVertices: number = count * faceVertices

// const planeGeometry: PlaneBufferGeometry = new PlaneBufferGeometry(10, 10, 1, 1)

const geometry: BufferGeometry = new BufferGeometry()
const position: Float32Array = new Float32Array(totalVertices)
const place: Float32Array = new Float32Array(totalVertices)
const staggerTime: Float32Array = new Float32Array(totalVertices)
const indeces: Uint32Array = new Uint32Array(count * itemVertices)

for (let i: number = 0; i < count; i++) {
  const center: Vector3 = getRandomPointOnSphere(
    ThreeMath.randFloat(100, 100000)
  )

  for (let j: number = 0; j < itemVertices; j++) {
    const vertex: Vector3 = getRandomPointOnSphere(ThreeMath.randFloat(10, 50))
    const index: number = i * faceVertices + j * dimension

    position[index + 0] = center.x + vertex.x
    position[index + 1] = center.y + vertex.y
    position[index + 2] = center.z + vertex.z

    place[index + 0] = center.x
    place[index + 1] = center.y
    place[index + 2] = center.z

    // const timeRatio: number = ThreeMath.randFloat(20, 200)

    staggerTime[index + 0] = ThreeMath.randFloat(20, 200)
    staggerTime[index + 1] = Math.random()
    staggerTime[index + 2] = ThreeMath.randFloat(20, 200)
  }
}

indeces.forEach((val: number, index: number, arr: Uint32Array): void => {
  arr[index] = index
})

console.log(geometry)

geometry.addAttribute('position', new BufferAttribute(position, dimension))
geometry.addAttribute('place', new BufferAttribute(place, dimension))
geometry.addAttribute(
  'staggerTime',
  new BufferAttribute(staggerTime, dimension)
)
geometry.setIndex(new BufferAttribute(indeces, 1))

export default geometry
