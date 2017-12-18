import { debounde } from './util'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const gl: WebGLRenderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

init()

window.addEventListener('resize', debounde(winResize, 500), false)

function init (): void {
  winResize()
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

function winResize (event?: Event): void {
  canvas.width = 0
  canvas.height = 0

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
