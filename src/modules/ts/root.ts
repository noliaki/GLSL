import matIV from './minMatrix'

import {
  debounde,
  createShader,
  createProgram,
  createVbo,
  bindVBO
} from './util'

import vsSource from './vertex-shader.vs'
import fsSource from './fragment-shader.fs'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const gl: WebGLRenderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

init()
window.addEventListener('resize', debounde(winResize, 500), false)

const vShader: WebGLShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
const fShader: WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)

const program: WebGLProgram = createProgram(gl, vShader, fShader)

const vertexPosition: number[] = [
  0.0, 1.0, 0.0,
  1.0, 0.5, 0.0,
  -1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.1, 0.0, 0.0,
  0.0, 1.3, 0.0,
  2.0, 2.0, 0.0,
  2.1, 0.0, 0.0,
  0.0, 2.3, 0.0
]

const vertexColor: number[] = [
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 0.2, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0
]

bindVBO(gl, program, 'position', 3, vertexPosition)
bindVBO(gl, program, 'color', 4, vertexColor)

// const positionLocation: number = gl.getAttribLocation(program, 'position')
// const colorLocation: number = gl.getAttribLocation(program, 'color')

// const positionStride: number = 3
// const colorStride: number = 4

// const vbo: WebGLBuffer = createVbo(gl, vertexPosition)
// const colorVbo: WebGLBuffer = createVbo(gl, vertexColor)

// // VBOをバインド
// gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
// gl.bindBuffer(gl.ARRAY_BUFFER, colorVbo)

// // attribute属性を有効にする
// gl.enableVertexAttribArray(positionLocation)
// gl.enableVertexAttribArray(colorLocation)

// // attribute属性を登録
// gl.vertexAttribPointer(positionLocation, positionStride, gl.FLOAT, false, 0, 0)
// gl.vertexAttribPointer(colorLocation, colorStride, gl.FLOAT, false, 0, 0)

// minMatrix.js を用いた行列関連処理
// matIVオブジェクトを生成
const m = new matIV()

// 各種行列の生成と初期化
const mMatrix = m.identity(m.create())
const vMatrix = m.identity(m.create())
const pMatrix = m.identity(m.create())
const mvpMatrix = m.identity(m.create())

m.lookAt([0.0, 0.0, 2.0], [0, 0, 0], [0, 1, 0], vMatrix)
m.perspective(90, window.innerWidth / window.innerHeight, 0.1, 100, pMatrix)

m.multiply(pMatrix, vMatrix, mvpMatrix)
m.multiply(mvpMatrix, mMatrix, mvpMatrix)

const uniLocation: WebGLUniformLocation = gl.getUniformLocation(program, 'mvpMatrix')

// uniformLocationへ座標変換行列を登録
gl.uniformMatrix4fv(uniLocation, false, mvpMatrix)

// モデルの描画
gl.drawArrays(gl.TRIANGLES, 0, 9)

// コンテキストの再描画
gl.flush()

function init (): void {
  winResize()
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

function winResize (event?: Event): void {
  canvas.width = 0
  canvas.height = 0

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
