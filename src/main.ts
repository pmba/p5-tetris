import p5 from "p5";
import Field from "./models/Field";
import Tetromino from "./models/Tetromino";

window.COLS = 10;
window.ROWS = 20;
window.SIZE = 20;

let isPaused = false;

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
    setFPS(6);

    // Initialize field
    field.init();
  };

  p.draw = () => {
    p.background(220);

    if (!tetromino.canGoDown()) {
      tetromino.release();
      tetromino = Tetromino.random();
    }

    field.draw();
    tetromino.update();
    tetromino.draw();

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
