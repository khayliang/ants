export default (angle) => {
  let flipped = angle + Math.PI;
  if (flipped > Math.PI) {
    flipped -= 2 * Math.PI;
  } else if (flipped < -Math.PI) {
    flipped += 2 * Math.PI;
  }
  return flipped;
}