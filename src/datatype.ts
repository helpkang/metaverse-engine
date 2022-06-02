import { Drawable } from "./drawable";

export interface DrawEngine {
  addEvent(event: (d: Direction, size: number) => void): void;
  draw(time: number): void;
  addDrawable(drawable: Drawable): void;
  getDrables(): Drawable[];
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export interface CollisionSize {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GetCollisionSize {
  getCollisionSize(): CollisionSize;
}

export interface CollisionChecker {
  isCollision(source: CollisionSize, target: CollisionSize): boolean;
}


export class CollisionCheckerTmpImpl implements CollisionChecker {
  isCollision(source: CollisionSize, target: CollisionSize): boolean{
    return (source.x < target.x + target.w &&
      source.x + source.w > target.x &&
      source.y < target.y + target.h &&
      source.h + source.y > target.y)
  }
}