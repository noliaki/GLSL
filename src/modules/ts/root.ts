declare const matIV: any

import {
  debounde,
  createShader,
  createProgram,
  createVbo
} from './util'

import vsSource from './vertex-shader'
import fsSource from './fragment-shader'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const gl: WebGLRenderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

init()
window.addEventListener('resize', debounde(winResize, 500), false)

const vShader: WebGLShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
const fShader: WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)

const program: WebGLProgram = createProgram(gl, vShader, fShader)

const attrLocation: number = gl.getAttribLocation(program, 'position')

const arrtStride: number = 3

const vertexPosition: number[] = [
  0.0, 1.0, 0.0,
  1.0, 0.0, 0.0,
  -1.0, 0.0, 0.0
]

const vbo: WebGLBuffer = createVbo(gl, vertexPosition)

// VBOをバインド
gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

// attribute属性を有効にする
gl.enableVertexAttribArray(attrLocation)

// attribute属性を登録
gl.vertexAttribPointer(attrLocation, arrtStride, gl.FLOAT, false, 0, 0)

// minMatrix.js を用いた行列関連処理
// matIVオブジェクトを生成
const m = new matIV()

// 各種行列の生成と初期化
const mMatrix = m.identity(m.create())
const vMatrix = m.identity(m.create())
const pMatrix = m.identity(m.create())
const mvpMatrix = m.identity(m.create())

console.log(mvpMatrix)

// m.lookAt([0.0, 0.0, 1.0], [0, 0, 0], [0, 1, 0], vMatrix)
// m.perspective(90, window.innerWidth / window.innerHeight, 0.1, 100, pMatrix)

// m.multiply(pMatrix, vMatrix, mvpMatrix)
// m.multiply(mvpMatrix, mMatrix, mvpMatrix)

const uniLocation: WebGLUniformLocation = gl.getUniformLocation(program, 'mvpMatrix')

// uniformLocationへ座標変換行列を登録
gl.uniformMatrix4fv(uniLocation, false, mvpMatrix)

// モデルの描画
gl.drawArrays(gl.TRIANGLES, 0, 3)

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
