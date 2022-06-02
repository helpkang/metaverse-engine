import {
  CollisionCheckerTmpImpl,
  CollisionSize,
  DrawEngine,
} from "../datatype";
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
  drawEngine?: DrawEngine;
  constructor(value: RectangleValue) {
    this.value = { color: "black", ...value };
  }
  isEqual(d: Drawable): boolean {
    if (d instanceof Rectangle) {
      return (
        this.value.x === d.value.x &&
        this.value.y === d.value.y &&
        this.value.w === d.value.w &&
        this.value.h === d.value.h
      );
    }
    return false;
  }
  register(drawEngine: DrawEngine): void {
    this.drawEngine = drawEngine;
  }
  getCollisionSize(): CollisionSize {
    const { x, y, w, h } = this.value;
    return { x, y, w, h };
  }

  update(deltaX: number, deltaY: number) {
    if (deltaX === 0 && deltaY === 0) return;
    const { value } = this;
    value.x += deltaX;
    value.y += deltaY;
    const csize = this.getCollisionSize();
    const checker = new CollisionCheckerTmpImpl();
    const isNotCollision = this.drawEngine?.getDrables().filter(d=>!this.isEqual(d)).every((d) => {
      return !checker.isCollision(csize, d.getCollisionSize());
    });
    if (!isNotCollision) {
      value.x -= deltaX;
      value.y -= deltaY;
    }
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
