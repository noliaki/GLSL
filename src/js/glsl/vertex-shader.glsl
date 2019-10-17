uniform float uTime;
varying vec3 vUv;

void main() {
  // vUv = hsv(abs(sin(uTime / 300.0)) + (normalize(position.x) + 1.0) / 2.0, 0.6, 0.7);
  float colorAvg = (position.x - position.y + position.z) / 3.0;
  float h = (sin((uTime) / 100.0 + colorAvg) + 1.0) / 2.0;
  vUv = hsv(h, 0.6, 0.7);
  vec4 transformed = vec4(position, 1.0);
  // transformed.x += (h * 50.0);
  // transformed.z += cos(uTime / 10.0) * 50.0;
  gl_Position = projectionMatrix * modelViewMatrix * transformed;
}
