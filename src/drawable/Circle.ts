import { Drawable } from "./Drawable";

export interface CircleValue {
  x: number;
  y: number;
  radius: number;
  color?: string;
}

interface CircleValueRequired extends CircleValue {
  color: string;
}

export class Circle implements Drawable {
  value: CircleValueRequired;
  constructor(value: CircleValue) {
    this.value = { color: "black", ...value };
  }

  update(deltaX: number, deltaY: number) {
    const { value } = this;
    value.x += deltaX;
    value.y += deltaY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, radius, color } = this.value;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export class FillCircle extends Circle {
  constructor(value: CircleValue) {
    super(value);
  }
  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, radius, color } = this.value;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

}