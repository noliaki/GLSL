import noise3D from './glsl/noise3D.glsl'
import hsvToRgb from './glsl/hsvToRgb.glsl'
import main from './glsl/vertex-shader.glsl'

export default [noise3D, hsvToRgb, main].join('\n')
