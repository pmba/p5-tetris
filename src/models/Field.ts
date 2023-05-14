import colors from "../constants/colors";
import { TetorminoColor } from "../types/tetromino";

export default class Field {
  private rows: number;
  private cols: number;

  // Since string has size of {length} * 2 and we only use 1 character,
  // we can use string instead of number to save memory
  private field: string[][];

  constructor(cols: number, rows: number) {
    this.rows = rows;
    this.cols = cols;

    this.field = [];
  }

  public init() {
    this.field = [];
    // Initialize field
    for (let y = 0; y < this.rows; ++y) {
      this.field.push([]);

      for (let x = 0; x < this.cols; ++x) {
        this.field[y].push(" ");
      }
    }
  }

  public draw() {
    for (let y = 0; y < this.rows; ++y) {
      for (let x = 0; x < this.cols; ++x) {
        if (this.isActive(x, y)) {
          p5.fill(colors[this.field[y][x] as TetorminoColor]);
        } else {
          p5.noFill();
        }

        p5.stroke(200);
        p5.rect(x * SIZE, y * SIZE, SIZE, SIZE);
      }
    }
  }

  public set(x: number, y: number, color: TetorminoColor) {
    this.field[y][x] = color;
  }

  public isActive(x: number, y: number) {
    return this.field[y][x] !== " ";
  }

  public deleteFullRows() {
    let rowsToDelete = 0;

    for (let y = 0; y < this.rows; ++y) {
      if (!this.field[y].includes(" ")) {
        ++rowsToDelete;
      }
    }

    while (rowsToDelete-- > 0) {
      this.field.pop();
      this.field.unshift(new Array(this.cols).fill(" "));
    }
  }
}
