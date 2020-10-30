// http://archive.bridgesmathart.org/2017/bridges2017-213.pdf
import p5Types, { Vector, Color } from "p5";
import {vectorBetween, lerp} from "./vector_util"

export const LEFT = true;
export const RIGHT = false;

const ratio = 2*Math.sin(Math.PI/10);

export type Shape = Kite | Dart
export type HalfShape = HalfDart | HalfKite;

function opposite(side: boolean) {
	return !side;
}


export class Kite{

	tip: Vector;
	tail: Vector;
	center: Vector = new Vector();
	private p5: p5Types;
	private vector: Vector;
	private pointFromLeftSide: Vector;
	private pointFromRightSide: Vector;
	private colors: {[i: number]: Color};

	constructor(p5: p5Types, point: Vector, vector: Vector, colors: {[i: number]: Color}) {
		this.p5 = p5;
		this.tip = point;
		this.colors = colors;
		this.tail = Vector.add(point,vector);
		this.vector = vector;
		this.center = lerp(p5, this.tail, this.tip, ratio);
		this.pointFromLeftSide = this.slowPointFromSide(LEFT);
		this.pointFromRightSide = this.slowPointFromSide(RIGHT);
	}

	half = (side: boolean): HalfKite => {
		return new HalfKite(this.p5,this,side,this.colors,1);
	}

	slowPointFromSide = (side: boolean) => {
		const copyVec = this.vector.copy();
		this.p5.angleMode(this.p5.DEGREES);
		side === RIGHT ? copyVec.rotate(216) : copyVec.rotate(-216);
		return copyVec.add(this.tail);
	}

	pointFromSide = (side: boolean) => {
		return (side === RIGHT ? this.pointFromRightSide : this.pointFromLeftSide);
	}
	
	pointFromOtherSide = (side: boolean) => {
		return this.pointFromSide(!side);
	}

	render = () => {
		this.p5.triangle(this.tip.x,this.tip.y,this.tail.x,this.tail.y,this.pointFromSide(LEFT).x,this.pointFromSide(LEFT).y);
		this.p5.triangle(this.tip.x,this.tip.y,this.tail.x,this.tail.y,this.pointFromSide(RIGHT).x,this.pointFromSide(RIGHT).y);
	}
}

export class Dart{

	tip: Vector;
	tail: Vector;
	private p5: p5Types;
	private vector: Vector;
	private colors: {[i: number]: Color};
	private pointFromLeftSide: Vector;
	private pointFromRightSide: Vector;

	constructor(p5: p5Types, point: Vector, vector: Vector, colors: {[i: number]: Color}) {
		this.p5 = p5;
		this.colors = colors;
		this.tip = point;
		this.tail = Vector.add(point,vector);
		this.vector = vector;
		this.pointFromLeftSide = this.slowPointFromSide(LEFT);
		this.pointFromRightSide = this.slowPointFromSide(RIGHT);
	}

	half = (side: boolean): HalfDart => {
		return new HalfDart(this.p5,this,side,this.colors,1);
	}

	slowPointFromSide = (side: boolean) => {
		const copyVec = this.vector.copy();
		this.p5.angleMode(this.p5.DEGREES);
		side === RIGHT ? copyVec.rotate(72) : copyVec.rotate(-72);
		return copyVec.add(this.tail);
	}

	pointFromSide = (side: boolean) => {
		return (side === RIGHT ? this.pointFromRightSide : this.pointFromLeftSide);
	}

	pointFromMidSide = (side: boolean): Vector => {
		return lerp(this.p5, this.tip,this.pointFromSide(side),ratio);
	}

	render = () => {
		this.p5.triangle(this.tip.x,this.tip.y,this.tail.x,this.tail.y,this.pointFromSide(LEFT).x,this.pointFromSide(LEFT).y);
		this.p5.triangle(this.tip.x,this.tip.y,this.tail.x,this.tail.y,this.pointFromSide(RIGHT).x,this.pointFromSide(RIGHT).y);
	}
}

export class HalfKite{

	private fade = 0;
	private p5: p5Types;
	private kite: Kite;
	private side: boolean;
	private colors: {[id: number]: Color};
	private label: number;

	constructor(p5: p5Types, kite: Kite, side: boolean, colors: {[id: number]: Color}, label: number) {
		this.p5 = p5;
		this.kite = kite;
		this.side = side;
		this.colors = colors;
		this.label = label;
	}

	subdivide = () => {
		const parentKite = this.kite;
		const babyKite = new Kite(this.p5,parentKite.center,vectorBetween(this.p5, parentKite.center,parentKite.pointFromSide(this.side)),this.colors);
		const dart = new Dart(this.p5,parentKite.tail,vectorBetween(this.p5, parentKite.tail,babyKite.pointFromOtherSide(this.side)),this.colors);
		return [new HalfKite(this.p5,babyKite,LEFT,this.colors,1), new HalfKite(this.p5,babyKite,RIGHT,this.colors,2), new HalfDart(this.p5,dart,opposite(this.side),this.colors,3)];
	}

	render = () => {
		const myColor = this.colors[this.label];
		this.p5.fill(this.p5.red(myColor), this.p5.green(myColor), this.p5.blue(myColor), this.fade);
		const parentKite = this.kite;
		const pointFromSide = parentKite.pointFromSide(this.side);
		this.p5.triangle(parentKite.tip.x,parentKite.tip.y,pointFromSide.x,pointFromSide.y,parentKite.tail.x,parentKite.tail.y);
		if(this.fade < 255){
			this.fade += 15;
		}
	}

	tip = () => {
		return this.kite.tip;
	}
}

export class HalfDart{
	fade = 0;
	private p5: p5Types;
	private dart: Dart;
	private side: boolean;
	private colors: {[id: number]: Color};
	private label: number;
	
	constructor(p5: p5Types, dart: Dart, side: boolean, colors: {[id: number]: Color}, label: number) {
		this.p5 = p5;
		this.dart = dart;
		this.side = side;
		this.colors = colors;
		this.label = label;
	}

	subdivide = () => {
		const parentDart = this.dart;
		const sidePoint = parentDart.pointFromSide(this.side);
		const pointFromMidSide = parentDart.pointFromMidSide(this.side);
		const babyKite = new Kite(this.p5,pointFromMidSide,vectorBetween(this.p5, pointFromMidSide,parentDart.tip),this.colors)
		const babyDart = new Dart(this.p5,sidePoint,vectorBetween(this.p5, sidePoint,pointFromMidSide),this.colors);
		return [new HalfKite(this.p5,babyKite,opposite(this.side),this.colors,4), new HalfDart(this.p5,babyDart,this.side,this.colors,5)]
	}

	render = () => {
		const myColor = this.colors[this.label];
		this.p5.fill(this.p5.red(myColor), this.p5.green(myColor), this.p5.blue(myColor), this.fade);
		const parentDart = this.dart;
		const pointFromSide = parentDart.pointFromSide(this.side);
		this.p5.triangle(parentDart.tip.x, parentDart.tip.y, pointFromSide.x, pointFromSide.y, parentDart.tail.x, parentDart.tail.y);
		if(this.fade < 255){
			this.fade += 15;
		}
	}

	tip = () => {
		return this.dart.tip;
	}
}
