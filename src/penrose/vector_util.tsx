import p5Types, { Vector } from "p5";

export function vectorBetween(p5: p5Types, a: Vector, b: Vector) {
  return p5.createVector(b.x-a.x, b.y - a.y);
}

export function midpoint(p5: p5Types, a: Vector, b: Vector): Vector {
  let ret: Vector = new Vector();
  Vector.lerp(a,b,0.5, ret);
  return parseLerpVector(p5, ret.x as any as string );
}

export function vectorFromMagAndAngle(p5: p5Types, mag: number, angle: number) {
  p5.angleMode(p5.DEGREES)
  const x = mag * p5.cos(angle);
  const y = mag * p5.sin(angle);
  return p5.createVector(x,y)
}

export function parseLerpVector(p5: p5Types, strVec: string): Vector{
  //p5.Vector Object : [960, 540, 0]0
  let startIdx = strVec.indexOf("[");
  let endIdx = strVec.indexOf("]");
  let csNums = strVec.substring(startIdx+1, endIdx);
  let strNums = csNums.split(",");
  let trimNums = strNums.map(s => s.trim());
  return p5.createVector(+trimNums[0], +trimNums[1], +trimNums[2]);
}