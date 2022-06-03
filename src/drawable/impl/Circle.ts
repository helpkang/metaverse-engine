import {
  CollisionCheckerTmpImpl,
} from "../../collision/impl/CollisionChekerImpl";
import { CollisionSize } from "../../collision/Collision";
import { DrawEngine } from "../../engine/DrawEngine";
import { Drawable } from "../Drawable";

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
  drawEngine?: DrawEngine;

  constructor(value: CircleValue) {
    this.value = { color: "black", ...value };
  }
  register(drawEngine: DrawEngine): void {
    this.drawEngine = drawEngine;
  }

  isEqual(d: Drawable): boolean {
    if (d instanceof Circle) {
      return (
        this.value.x === d.value.x &&
        this.value.y === d.value.y &&
        this.value.radius === d.value.radius
      );
    }
    return false;
  }
  getCollisionSize(): CollisionSize {
    const { x, y, radius } = this.value;
    const swidth = radius * 2;
    return { x: x - radius, y: y - radius, w: swidth, h: swidth };
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
