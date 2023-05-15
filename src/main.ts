import p5 from "p5";
import Field from "./models/Field";
import Tetromino from "./models/Tetromino";

window.COLS = 10;
window.ROWS = 20;
window.SIZE = 20;

let isPaused = false;
let drawAtFrame = 5;
let frameCount = 0;

export function sketch(p: p5) {
  window.p5 = p;

  const field = new Field(COLS, ROWS);
  window.field = field;

  let tetromino = Tetromino.random();

  const pause = () => {
    if (isPaused) {
      p.loop();
      isPaused = false;
    } else {
      p.noLoop();
      isPaused = true;
    }
  };

  const setFPS = (fps: number) => {
    if (fps < 1) return;

    window.FR = fps;
    p.frameRate(fps);
  };

  p.setup = () => {
    p.createCanvas(COLS * SIZE + 1, ROWS * SIZE + 1);
    setFPS(10);

    // Initialize field
    field.init();
  };

  p.draw = () => {
    p.background(220, 220, 220);

    field.draw();
    tetromino.draw();

    frameCount = (frameCount + 1) % drawAtFrame;
    if (frameCount < drawAtFrame - 1) return;

    if (!tetromino.canGoDown()) {
      tetromino.release();
      tetromino = Tetromino.random();
    }

    tetromino.update();

    field.deleteFullRows();
  };

  p.keyPressed = () => {
    const code = (s: string) => s.charCodeAt(0);

    const handlers: Record<number, () => void> = {
      [code("z")]: () => tetromino.rotateCounterClockWise(),
      [code("Z")]: () => tetromino.rotateCounterClockWise(),
      [code("x")]: () => tetromino.rotateClockWise(),
      [code("X")]: () => tetromino.rotateClockWise(),
      [code("p")]: () => pause(),
      [code("P")]: () => pause(),
      [p.LEFT_ARROW]: () => tetromino.moveLeft(),
      [p.RIGHT_ARROW]: () => tetromino.moveRight(),
    };
    handlers[p.keyCode]?.();
  };
}

export const P5 = new p5(sketch, document.getElementById("canvas-container")!);
