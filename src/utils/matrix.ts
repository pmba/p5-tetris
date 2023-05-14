const rotate4x4ClockWise = <T>(m: T[][]) => {
  [
    [m[0][0], m[0][1], m[0][2], m[0][3]],
    [m[1][0], m[1][1], m[1][2], m[1][3]],
    [m[2][0], m[2][1], m[2][2], m[2][3]],
    [m[3][0], m[3][1], m[3][2], m[3][3]],
  ] = [
    [m[3][0], m[2][0], m[1][0], m[0][0]],
    [m[3][1], m[2][1], m[1][1], m[0][1]],
    [m[3][2], m[2][2], m[1][2], m[0][2]],
    [m[3][3], m[2][3], m[1][3], m[0][3]],
  ];
};

const rotate4x4CounterClockWise = <T>(m: T[][]) => {
  [
    [m[0][0], m[0][1], m[0][2], m[0][3]],
    [m[1][0], m[1][1], m[1][2], m[1][3]],
    [m[2][0], m[2][1], m[2][2], m[2][3]],
    [m[3][0], m[3][1], m[3][2], m[3][3]],
  ] = [
    [m[0][3], m[1][3], m[2][3], m[3][3]],
    [m[0][2], m[1][2], m[2][2], m[3][2]],
    [m[0][1], m[1][1], m[2][1], m[3][1]],
    [m[0][0], m[1][0], m[2][0], m[3][0]],
  ];
};
const rotate3x3ClockWise = <T>(m: T[][]) => {
  [
    [m[0][0], m[0][1], m[0][2]],
    [m[1][0], m[1][1], m[1][2]],
    [m[2][0], m[2][1], m[2][2]],
  ] = [
    [m[2][0], m[1][0], m[0][0]],
    [m[2][1], m[1][1], m[0][1]],
    [m[2][2], m[1][2], m[0][2]],
  ];
};

const rotate3x3CounterClockWise = <T>(m: T[][]) => {
  [
    [m[0][0], m[0][1], m[0][2]],
    [m[1][0], m[1][1], m[1][2]],
    [m[2][0], m[2][1], m[2][2]],
  ] = [
    [m[0][2], m[1][2], m[2][2]],
    [m[0][1], m[1][1], m[2][1]],
    [m[0][0], m[1][0], m[2][0]],
  ];
};

export const rotateClockWise = <T>(m: T[][]) => {
  if (!m || (m.length !== 3 && m.length !== 4)) {
    throw new Error("Invalid matrix shape");
  }

  if (m.length === 3) {
    rotate3x3ClockWise(m);
    return;
  }

  rotate4x4ClockWise(m);
};

export const rotateCounterClockWise = <T>(m: T[][]) => {
  if (!m || (m.length !== 3 && m.length !== 4)) {
    throw new Error("Invalid matrix shape");
  }

  if (m.length === 3) {
    rotate3x3CounterClockWise(m);
    return;
  }

  rotate4x4CounterClockWise(m);
};
