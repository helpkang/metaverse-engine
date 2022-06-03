import { GetCollisionSize } from "../collision/Collision";
import { DrawEngine } from "../engine/DrawEngine";

export interface Drawable extends GetCollisionSize{
  register(drawEngine: DrawEngine): void;
  draw(ctx: CanvasRenderingContext2D): void;
  isEqual(d: Drawable): boolean;
  // keyboardInput(event: Event): void;
}
