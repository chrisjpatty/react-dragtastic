export const colorTween = (
  { r: sr, g: sg, b: sb },
  { r: er, g: eg, b: eb },
  index,
  steps
) => {
  const step = index / steps
  return `rgb(${tweenSegment(sr, er, step)},${tweenSegment(
    sg,
    eg,
    step
  )},${tweenSegment(sb, eb, step)})`
}

const tweenSegment = (s, e, p) => {
  const range = s - e
  return Math.abs(s - Math.floor(range * p))
}
