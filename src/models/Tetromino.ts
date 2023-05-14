import { Vector } from "p5";
import colors from "../constants/colors";
import tetrominos from "../constants/tetrominos";
import { TetorminoColor } from "../types/tetromino";
import { rotateClockWise, rotateCounterClockWise } from "../utils/matrix";

export default class Tetromino {
  private position: Vector;
  private side: number;

  private blocks: string[][] = [];

  constructor(flattened: string, xPos: number, yPos: number) {
    if (!flattened || (flattened.length !== 9 && flattened.length !== 16)) {
      throw new Error("Invalid tetromino shape");
    }

    this.position = p5.createVector(xPos, yPos);

    this.side = Math.sqrt(flattened.length);

    const x = (i: number) => Math.floor(i / this.side);
    const y = (i: number) => i % this.side;

    for (let i = 0; i < flattened.length; ++i) {
      if (!this.blocks[x(i)]) {
        this.blocks[x(i)] = [];
      }

      this.blocks[x(i)][y(i)] = flattened[i];
    }
  }

  static random() {
    const randomIndex = Math.floor(Math.random() * tetrominos.length);
    const randomTetromino = tetrominos[randomIndex];

    const side = Math.sqrt(randomTetromino.length);

    return new Tetromino(randomTetromino, Math.floor(COLS / 2 - side / 2), 0);
  }

  public moveLeft() {
    // From left to right check if there is a block and if it can move to the left

    for (let i = 0; i < this.side; ++i) {
      for (let j = 0; j < this.side; ++j) {
        const y = this.position.y + i;
        const x = this.position.x + j;

        if (this.blocks[i][j] && this.blocks[i][j] !== " ") {
          if (x <= 0 || field.isActive(x - 1, y)) {
            return;
          }

          break;
        }
      }
    }

    this.position.x -= 1;
  }

  public moveRight() {
    // From right to left check if there is a block and if it can move to the right

    for (let i = 0; i < this.side; ++i) {
      for (let j = this.side - 1; j >= 0; --j) {
        const y = this.position.y + i;
        const x = this.position.x + j;

        if (this.blocks[i][j] && this.blocks[i][j] !== " ") {
          if (x >= COLS - 1 || field.isActive(x + 1, y)) {
            return;
          }

          break;
        }
      }
    }

    this.position.x += 1;
  }

  public update() {
    this.position.y += 1;
  }

  public draw() {
    p5.push();
    for (let i = 0; i < this.side; ++i) {
      for (let j = 0; j < this.side; ++j) {
        const y = this.position.y + i;
        const x = this.position.x + j;

        if (this.blocks[i][j] && this.blocks[i][j] !== " ") {
          p5.fill(255, 0, 0);
          p5.fill(colors[this.blocks[i][j] as TetorminoColor]);
          p5.rect(x * SIZE, y * SIZE, SIZE, SIZE);
        }
      }
    }
    p5.pop();
  }

  public canGoDown() {
    const columnVerified: boolean[] = Array.from(
      { length: this.side },
      () => false
    );

    for (let i = this.side - 1; i >= 0; --i) {
      for (let j = 0; j < this.side; ++j) {
        if (columnVerified[j]) break;

        const y = this.position.y + i;
        const x = this.position.x + j;

        if (this.blocks[i][j] && this.blocks[i][j] !== " ") {
          columnVerified[j] = true;

          if (y >= ROWS - 1 || field.isActive(x, y + 1)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  public release() {
    for (let i = 0; i < this.side; ++i) {
      for (let j = 0; j < this.side; ++j) {
        const y = this.position.y + i;
        const x = this.position.x + j;

        if (this.blocks[i][j] && this.blocks[i][j] !== " ") {
          field.set(x, y, this.blocks[i][j]);
        }
      }
    }
  }

  public rotateClockWise() {
    rotateClockWise(this.blocks);
  }

  public rotateCounterClockWise() {
    rotateCounterClockWise(this.blocks);
  }
}
