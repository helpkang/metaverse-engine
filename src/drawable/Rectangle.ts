import { Drawable } from "./Drawable";

export interface RectangleValue {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}
interface RectangleValueRequired extends RectangleValue {
  color: string;
}

export class Rectangle implements Drawable {
  value: RectangleValueRequired;
  constructor(value: RectangleValue) {
    this.value = { color: "black", ...value };
  }

  update(deltaX: number, deltaY: number) {
    const { value } = this;
    value.x += deltaX;
    value.y += deltaY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, w, h, color } = this.value;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
}

export class FillRectangle extends Rectangle {
  constructor(value: RectangleValue) {
    super(value);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, w, h, color } = this.value;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, w, h);
    ctx.fill();
  }
}