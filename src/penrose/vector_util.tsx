import p5Types, { Vector } from "p5";

export function vectorBetween(p5: p5Types, a: Vector, b: Vector) {
  return p5.createVector(b.x-a.x, b.y - a.y);
}

export function midpoint(p5: p5Types, a: Vector, b: Vector) {
  return Vector.lerp(a,b,0.5);
}

export function vectorFromMagAndAngle(p5: p5Types, mag: number, angle: number) {
  p5.angleMode(p5.DEGREES)
  const x = mag * p5.cos(angle);
  const y = mag * p5.sin(angle);
  return p5.createVector(x,y)
}
