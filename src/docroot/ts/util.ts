export const debounde: Function = (fn: Function, interval: number): Function => {
  let timer: number

  return function (): void {
    if (timer) clearTimeout(timer)

    const args: any = arguments

    timer = setTimeout(() => {
      fn(...args)
    }, interval)
  }
}

export function createShader (gl: WebGLRenderingContext, id: string): WebGLShader {
  // シェーダを格納する変数
  let shader: WebGLShader

  // HTMLからscriptタグへの参照を取得
  const scriptElement: HTMLScriptElement = document.getElementById(id) as HTMLScriptElement

  // scriptタグが存在しない場合は抜ける
  if (!scriptElement) return

  // scriptタグのtype属性をチェック
  switch (scriptElement.type) {
    // 頂点シェーダの場合
    case 'x-shader/x-vertex':
      shader = gl.createShader(gl.VERTEX_SHADER)
      break

    // フラグメントシェーダの場合
    case 'x-shader/x-fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER)
      break

    default:
      return
  }

  // 生成されたシェーダにソースを割り当てる
  gl.shaderSource(shader, scriptElement.textContent)

  // シェーダをコンパイルする
  gl.compileShader(shader)

  // シェーダが正しくコンパイルされたかチェック
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader))
    return
  }

  return shader
}

export function createProgram (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
  const program: WebGLProgram = gl.createProgram()

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)

  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(gl.getProgramInfoLog(program))
    return
  }

  gl.useProgram(program)

  return program
}

export function createVbo (gl: WebGLRenderingContext, data: number[]): WebGLBuffer {
  // バッファオブジェクトの生成
  const vbo: WebGLBuffer = gl.createBuffer()

  // バッファをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)

  // バッファにデータをセット
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)

  // バッファのバインドを無効化
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  // 生成した VBO を返して終了
  return vbo
}

