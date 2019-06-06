export const pathFromBezierCurve = (cubicBezierCurve) => {
  const {
    initialAxis, initialControlPoint, endingControlPoint, endingAxis,
  } = cubicBezierCurve;
  return `
    M${initialAxis.x} ${initialAxis.y}
    c ${initialControlPoint.x} ${initialControlPoint.y}
    ${endingControlPoint.x} ${endingControlPoint.y}
    ${endingAxis.x} ${endingAxis.y}
  `;
};

export const radiansToDegrees = radians => ((radians * 180) / Math.PI);

// https://math.stackexchange.com/questions/714378/find-the-angle-that-creating-with-y-axis-in-degrees
export const calculateAngle = (score) => {
  // if (x2 >= 0 && y2 >= 0) {
  //   return 90;
  // } else if (x2 < 0 && y2 >= 0) {
  //   return -90;
  // }

  // const dividend = x2 - x1;
  // const divisor = y2 - y1;
  // const quotient = dividend / divisor;
  // return radiansToDegrees(Math.atan(quotient)) * -1;
  if (score < 35 && score >= 0) {
    return -30;
  } else if (score < 65 && score >= 35) {
    return 0;
  } else if (score < 100 && score >= 65) {
    return 30;
  }
};

export const getCanvasPosition = (event) => {
  // mouse position on auto-scaling canvas
  // https://stackoverflow.com/a/10298843/1232793

  const svg = document.getElementById('aliens-go-home-canvas');
  const point = svg.createSVGPoint();

  point.x = event.clientX;
  point.y = event.clientY;
  const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
  return {x, y};
};

const degreesToRadian = degrees => ((degrees * Math.PI) / 180);

export const calculateNextPosition = (x, y, angle, divisor = 300) => {
  const realAngle = (angle * -1) + 90;
  const stepsX = radiansToDegrees(Math.cos(degreesToRadian(realAngle))) / divisor;
  const stepsY = radiansToDegrees(Math.sin(degreesToRadian(realAngle))) / divisor;
  console.log("======Angle is: " + angle);
  return {
    x: x +stepsX,
    y: y - stepsY,
  }
};

export const checkCollision = (rectA, rectB) => (
  rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 &&
  rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1
);

export const newRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
  
export const generateRandomNumber = () => {
  return newRandomNumber(1, 100);
}
