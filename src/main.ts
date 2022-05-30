import { Circle, FillCircle, FillRectangle, Rectangle } from "./drawable";
import { Direction, DrawEngine, DrawEngineImpl } from "./DrawEngine";

const app = document.getElementById("app");
if (!app) {
  throw new Error("app not found");
}

const engine:DrawEngine = new DrawEngineImpl(app);
const myCircle = new Circle({x:100, y:100, radius:50, color:'blue'});

engine.addEvent((d: Direction, size: number )=>{
  switch(d){
    case Direction.Up:
      myCircle.update(0, -size);
      break;
      case Direction.Down:
      myCircle.update(0, size);
      break;
      case Direction.Left:
      myCircle.update(-size, 0);
      break;
      case Direction.Right:
      myCircle.update(size, 0);
      break;
  }
  
});
engine.addDrawable(new FillCircle({x:200, y:200, radius:40}));
engine.addDrawable(new Rectangle({x:100, y:100, w:100, h:100, color:'red'}));
engine.addDrawable(new FillRectangle({x:300, y:300, w:50, h:50}));
engine.addDrawable(myCircle);

// function getWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext {
//   const gl = canvas.getContext("webgl"); //|| canvas.getContext("experimental-webgl");
//   if (!gl) {
//     throw new Error("gl not found");
//   }
//   return gl;
// }

// function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
//   const gl = canvas.getContext("2d");
//   if (!gl) {
//     throw new Error("gl not found");
//   }
//   return gl;
// }
