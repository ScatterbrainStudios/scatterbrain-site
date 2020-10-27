import {Kite, ShapeSide, Shape, HalfShape} from "./penrose_class";
import {vectorFromMagAndAngle} from "./vector_util"

import React from "react";
import p5Types, { Vector, Color } from "p5";
import Sketch from "react-p5";

export class Penrose extends React.Component{
  private FRAME_RATE = 120;
  private depthToShapes: {[i: number]: HalfShape[]} = {};
  private DEPTH = 5;

  private config: {[id: number]: p5Types.Color} = {};
  private curTime: number = 0;
  private TIME_OFFSET = 0;
  private startFrame = 0;

  render(){
    return (
      <Sketch 
        setup={this.setup}
        draw={this.draw}
        windowResized={this.windowResized}
      />
    );
  }

  getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setup = (p5: p5Types, canvasRef: Element) => {
    //var clientHeight = Math.max(s.windowHeight, document.getElementById('sketch').clientHeight );

    //var cnv = s.createCanvas(s.displayWidth, clientHeight);
    //var cnv = p5.createCanvas(p5.clientWidth,p5.clientHeight);
    //cnv.parent("sketch");
    p5.createCanvas(p5.displayWidth, p5.displayHeight);
    p5.background(0);

    this.config = this.decideColors(p5);
    
    p5.frameRate(this.FRAME_RATE)

    const center = p5.createVector(p5.width/2, p5.height/2); // createVector(width - (Math.random() * width), height - (Math.random() * height));
    const halves = this.halfShapes(this.initializeSun(p5,center,p5.width));
    this.depthToShapes[0] = halves;
    this.shapesAtDepth(this.depthToShapes, this.DEPTH)

  }

  windowResized = (p5: p5Types) => {
    this.startFrame = p5.frameCount;

    this.config = this.decideColors(p5);
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  draw = (p5: p5Types) => {
    //clear()
    //background('black');
    p5.strokeWeight(1/(2*this.DEPTH))
    this.curTime = (p5.frameCount - this.startFrame) / this.FRAME_RATE;
    const shapes = this.shapesAtDepth(this.depthToShapes,this.DEPTH)
    const length = shapes.length;
    for (let i = 0; i < length; i++) {
      const shape = shapes[i];
      const y = shape.tip().y / p5.height;
      if (y < this.curTime-this.TIME_OFFSET) shape.render()
    }
  }

  initializeSun = (p5: p5Types, center: Vector, length: number) => {
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
      arr.push(shape.half(ShapeSide.LEFT));
      arr.push(shape.half(ShapeSide.RIGHT));
    })
    return arr;
  }

  shapesAtDepth = (map: {[i: number]: HalfShape[]}, depth: number) => {
    if (Boolean(map[depth])) return map[depth];
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
    colors[1] = p5.color(this.hslToRgb(this.getRandomInt(0,72), 1, .5));
    colors[2] = p5.color(this.hslToRgb(this.getRandomInt(72,144), 1, .5));
    colors[3] = p5.color(this.hslToRgb(this.getRandomInt(144,216), 1, .5));
    colors[4] = p5.color(this.hslToRgb(this.getRandomInt(216,288), 1, .5));
    colors[5] = p5.color(this.hslToRgb(this.getRandomInt(288,360), 1, .5));
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

  /*
  function initializeColorSliders() {
    let colors = {};
    colorMode(HSB);

    colors[1] = color(255, 100, 50);// getRandomInt(0,72), 50);
    //colorMode(HSB);

    colors[2] = color(150, 1, .5);//getRandomInt(72,144), 50);
    //colorMode(HSB);

    colors[3] = color(100, 1, .5);//getRandomInt(144,216), 50);
    //colorMode(HSB);

    colors[4] = color(50, 1, .5);//getRandomInt(216,288), 50);
    //colorMode(HSB);

    colors[5] = color(0, 1, .5);//getRandomInt(288,360), 50);
    return colors;
  }
  */
}