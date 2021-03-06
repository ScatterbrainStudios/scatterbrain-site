import p5Types, { Vector } from "p5";

export function vectorBetween(p5: p5Types, a: Vector, b: Vector) {
	return p5.createVector(b.x-a.x, b.y - a.y);
}

export function midpoint(p5: p5Types, a: Vector, b: Vector): Vector {
	return lerp(p5, a, b, 0.5);
}

export function vectorFromMagAndAngle(p5: p5Types, mag: number, angle: number) {
	p5.angleMode(p5.DEGREES)
	const x = mag * p5.cos(angle);
	const y = mag * p5.sin(angle);
	return p5.createVector(x,y)
}

export function lerp(p5: p5Types, v1: Vector, v2: Vector, amt: number) {
	let x = ((v2.x - v1.x) * amt || 0) + v1.x;
	let y = ((v2.y - v1.y) * amt || 0) + v1.y;
	return p5.createVector(x,y);
};