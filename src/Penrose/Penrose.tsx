import {Kite, Shape, HalfShape, LEFT, RIGHT} from "./Shapes";
import {vectorFromMagAndAngle} from "./vector_util"

import React from "react";
import p5Types, { Vector, Color } from "p5";

if (typeof window !== undefined) (window as any).p5 = p5Types;

export class Penrose extends React.Component{
	private FRAME_RATE = 120;
	private depthToShapes: {[i: number]: HalfShape[]} = {};
	private DEPTH = 5;

	private config: {[id: number]: p5Types.Color} = {};
	private curTime: number = 0;
	private TIME_OFFSET = .5;
	private startFrame = 0;

	private strokeHue = 180;
	private strokeSaturation = 0;
	private strokeLightness = .5;

	canvasParentRef: any;
	sketch: p5Types | null = null;

	constructor(props: any){
		super(props);
		this.canvasParentRef = React.createRef();
	}

	componentWillUnmount() {
		(this as any).sketch.remove();
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount(){
		this.sketch = new p5Types((p) => {
			p.setup = () => this.setup(p, this.canvasParentRef.current);
			p.windowResized = () => this.windowResized(p);
			p.draw = () => this.draw(p);
		});
	}

	render(){
		return (
			<div
				ref={this.canvasParentRef}
			/>
		);
	}

	getRandomInt = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	setup = (p5: p5Types, canvasRef: Element) => {

		var canvasHeight = Math.max(window.innerHeight, document.getElementById("root")?.clientHeight || 0);
		p5.createCanvas(p5.displayWidth, canvasHeight);

		this.config = this.decideColors(p5);

		p5.frameRate(this.FRAME_RATE)
		
		this.initializedData(p5);

	}

	windowResized = (p5: p5Types) => {
		var canvasHeight = Math.max(window.innerHeight, document.getElementById("root")?.clientHeight || 0);

		this.depthToShapes = {};

		this.initializedData(p5);

		p5.resizeCanvas(p5.displayWidth, canvasHeight);
	}

	initializedData = (p5: p5Types) => {
		p5.background('black');
		p5.stroke(p5.color(this.hslToRgb(this.strokeHue, this.strokeSaturation, this.strokeLightness)));
		const center = p5.createVector(p5.width/2, p5.height/2);
		const halves = this.halfShapes(this.defineFirstSun(p5,center,p5.width));
		this.depthToShapes[0] = halves;
		this.shapesAtDepth(this.depthToShapes, this.DEPTH)
	}

	draw = (p5: p5Types) => {
		p5.background('black');
		p5.strokeWeight(0.5);
		this.curTime = (p5.frameCount - this.startFrame) / this.FRAME_RATE;
		const shapes = this.shapesAtDepth(this.depthToShapes,this.DEPTH)
		const length = shapes.length;
		for (let i = 0; i < length; i++) {
			const shape = shapes[i];
			const y = shape.tip().y / p5.height;
			if (y < this.curTime-this.TIME_OFFSET) {
				shape.render();
			}

			if(i === length - 1 && (y < this.curTime-this.TIME_OFFSET - 1)){
				if(this.strokeSaturation < 1){
					this.strokeSaturation += 0.01;
				}else{
					this.strokeHue += 1;
					this.strokeHue %= 360;
				}  
				p5.stroke(p5.color(this.hslToRgb(this.strokeHue, this.strokeSaturation, this.strokeLightness)));
			}
		}
	}

	defineFirstSun = (p5: p5Types, center: Vector, length: number) => {
		p5.angleMode(p5.DEGREES);
		const shapes = [];
		for (let i = 1; i <= 5; i++) {
			const angle = (360 / 5) * i;
			const newVec = vectorFromMagAndAngle(p5, length,angle)
			newVec.rotate(angle)
			shapes.push(new Kite(p5, Vector.add(center,newVec), Vector.mult(newVec,-1),this.config));
		}
		return shapes;
	}

	halfShapes = (shapes: Shape[]): HalfShape[] => {
		let arr: HalfShape[] = [];
		shapes.forEach( (shape) => {
			arr.push(shape.half(LEFT));
			arr.push(shape.half(RIGHT));
		})
		return arr;
	}

	shapesAtDepth = (map: {[i: number]: HalfShape[]}, depth: number) => {
		if (Boolean(map[depth])){
			return map[depth];
		}
		const prevShapes = this.shapesAtDepth(map,depth-1);
		const newDepth: HalfShape[] = [];
		prevShapes.forEach( (shape) => {
			shape.subdivide().forEach( (subShape) => {
				newDepth.push(subShape);
			});
		});
		map[depth] = newDepth;
		return newDepth;
	}

	decideColors = (p5: p5Types) => {
		let colors: {[i: number]: Color} = {};
		colors[1] = p5.color(this.hslToRgb(0, 1, 0));
		colors[2] = p5.color(this.hslToRgb(0, 1, 0));
		colors[3] = p5.color(this.hslToRgb(0, 1, 0));
		colors[4] = p5.color(this.hslToRgb(0, 1, 0));
		colors[5] = p5.color(this.hslToRgb(0, 1, 0));
		return colors;
	}

	hslToRgb = (hue: number, saturation: number, lightness: number) => {
		var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
		var huePrime = hue / 60;
		var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

		huePrime = Math.floor(huePrime);
		var red: number = 0;
		var green: number = 0;
		var blue: number = 0;

		if( huePrime === 0 ){
			red = chroma;
			green = secondComponent;
			blue = 0;
		}else if( huePrime === 1 ){
			red = secondComponent;
			green = chroma;
			blue = 0;
		}else if( huePrime === 2 ){
			red = 0;
			green = chroma;
			blue = secondComponent;
		}else if( huePrime === 3 ){
			red = 0;
			green = secondComponent;
			blue = chroma;
		}else if( huePrime === 4 ){
			red = secondComponent;
			green = 0;
			blue = chroma;    
		}else if( huePrime === 5 ){
			red = chroma;
			green = 0;
			blue = secondComponent;
		}

		var lightnessAdjustment = lightness - (chroma / 2);
		red += lightnessAdjustment;
		green += lightnessAdjustment;
		blue += lightnessAdjustment;

		return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
	}
}