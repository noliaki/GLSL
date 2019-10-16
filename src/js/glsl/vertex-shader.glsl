uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = (normalize(position.xy) + 1.0) / 2.0;
  vec4 transformed = vec4(position, 1.0);
  transformed.x += sin(uTime / 10.0) * 50.0;
  transformed.z += cos(uTime / 10.0) * 50.0;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformed;
}
