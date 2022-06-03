import { Drawable } from "../drawable";


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
  Right
}
