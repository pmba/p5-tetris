/**
 * The definition is a flattened matrix, all row in a single string.
 * Use [c|b|o|y|g|p|r] to define a block and ' ' to define an empty space.
 *
 * Each letter represents a color:
 * - c: cyan
 * - b: blue
 * - o: orange
 * - y: yellow
 * - g: green
 * - p: purple
 * - r: red
 */
const tetrominos: string[] = [
  "    cccc        ",
  "b  bbb   ",
  "  oooo   ",
  "     yy  yy     ",
  " gggg    ",
  " p ppp   ",
  "rr  rr   ",
];

export default tetrominos;
