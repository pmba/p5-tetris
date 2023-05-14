import { Vector } from "p5";

export default class Block {
  public position: Vector;

  constructor(x: number, y: number) {
    this.position = p5.createVector(x, y);
  }

  public update() {
    ++this.position.y;
  }

  public draw() {
    p5.push();
    p5.fill(255, 0, 0);
    p5.rect(this.position.x * SIZE, this.position.y * SIZE, SIZE, SIZE);
    p5.pop();
  }

  public moveLeft() {
    if (this.position.x > 0) {
      --this.position.x;
    }
  }

  public moveRight() {
    if (this.position.x < COLS - 1) {
      ++this.position.x;
    }
  }
}
