import { DrawEngine, GetCollisionSize } from "../datatype";

export interface Drawable extends GetCollisionSize{
  register(drawEngine: DrawEngine): void;
  draw(ctx: CanvasRenderingContext2D): void;
  isEqual(d: Drawable): boolean;
  // keyboardInput(event: Event): void;
}
