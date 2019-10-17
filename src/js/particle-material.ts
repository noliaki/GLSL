import { ShaderMaterial, DoubleSide } from 'three'
import vertexShader from './vertex-shader'
import fragmentShader from './glsl/fragment-shader.glsl'

export default new ShaderMaterial({
  uniforms: {
    uTime: { type: 'f', value: 1.0 }
  },
  side: DoubleSide,
  vertexShader,
  fragmentShader
})
