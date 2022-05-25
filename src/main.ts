const app = document.getElementById("app");
if (!app) {
  throw new Error("app not found");
}


class Circle {
    
    constructor(public x: number, public y: number, public radius: number, public color: string = 'black') {}

    update(deltaX: number, deltaY: number) {
        this.x += deltaX;
        this.y += deltaY;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

const canvas = makeElement(app);
const ctx = getContext(canvas);

const c  = new Circle(100, 75, 50, 'blue');
c.draw(ctx);
const step = (timestamp: number)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    c.update(.2,.2);
    c.draw(ctx);
    requestAnimationFrame(step);
}
requestAnimationFrame(step)
// ctx.beginPath();
// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// ctx.stroke();

///// init /////

function makeElement(app: HTMLElement): HTMLCanvasElement {
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
  }
//   window.addEventListener("resize", resize);
  resize();

  return node;
}

function getWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext {
  const gl = canvas.getContext("webgl"); //|| canvas.getContext("experimental-webgl");
  if (!gl) {
    throw new Error("gl not found");
  }
  return gl;
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const gl = canvas.getContext("2d");
  if (!gl) {
    throw new Error("gl not found");
  }
  return gl;
}


