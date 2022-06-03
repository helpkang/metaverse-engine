import { Drawable } from "../../drawable";
import { DrawEngine, Direction } from "../DrawEngine";

export class DrawEngineImpl implements DrawEngine {
  ctx: CanvasRenderingContext2D;
  drawbles: Drawable[] = [];
  canvas: HTMLCanvasElement;
  prevTime: number = 0;
  events: ((d: Direction, size: number) => void)[] = [];

  constructor(private app: HTMLElement) {
    this.canvas = this.makeElement(app);
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.refresh();
    this.eventHaddle();
  }

  getDrables(): Drawable[] {
    return [...this.drawbles];
  }

  private eventHaddle() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "ArrowUp") {
        this.events.forEach((event) => event(Direction.Up, 10));
      } else if (key === "ArrowDown") {
        this.events.forEach((event) => event(Direction.Down, 10));
      } else if (key === "ArrowLeft") {
        this.events.forEach((event) => event(Direction.Left, 10));
      } else if (key === "ArrowRight") {
        this.events.forEach((event) => event(Direction.Right, 10));
      }
    });
  }
  
  addEvent(event: (d: Direction, size: number) => void) {
    this.events.push(event);
  }

  private refresh() {
    requestAnimationFrame(this.draw.bind(this));
  }

  draw(time: number) {
    if (this.prevTime === 0) {
      console.log("first");
    } else {
      // console.log(time - this.prevTime);
    }
    this.prevTime = time;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawbles.forEach((drawable) => drawable.draw(this.ctx));
    this.refresh();
  }

  addDrawable(drawable: Drawable) {
    this.drawbles.push(drawable);
    drawable.register(this);
  }

  private makeElement(app: HTMLElement): HTMLCanvasElement {
    const node = document.createElement("canvas");
    node.id = "canvas";
    //   node.style.width = "100%";
    //   node.style.height = "100%";
    app.appendChild(node);
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      node.width = w;
      node.height = h;
    };
    window.addEventListener("resize", resize);
    resize();

    return node;
  }
}
