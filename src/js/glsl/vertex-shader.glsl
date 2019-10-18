attribute vec3 place;
attribute vec3 staggerTime;
uniform float uTime;
varying vec3 vUv;

const float PI = 3.141592653589793238462643383279502884197169399375105820;
const float PI2 = 2.0 * PI;

void main(){
 // vUv = hsv(abs(sin(uTime / 300.0)) + (normalize(position.x) + 1.0) / 2.0, 0.6, 0.7);
  float colorAvg = (position.x + position.y + position.z) / 3.0;
  float h = (sin(uTime / 50.0 + staggerTime.z) + 1.0) / 2.0;
  vUv = hsv(h, 0.6, 0.7);
  vec4 quat = quatFromAxisAngle(vec3(1.0), radians(uTime + staggerTime.x));
  vec4 transformed = vec4(rotateVector(quat, (position - place)) + position, 1.0);
  // vec4(rotate3d(position, radians(uTime / 10.0), vec3(1.0, 0.7, 0.0)), 1.0);
  // transformed.x += (h * 50.0);
  // transformed.z += cos(uTime / 10.0) * 50.0;
  gl_Position = projectionMatrix * modelViewMatrix * transformed;
}
