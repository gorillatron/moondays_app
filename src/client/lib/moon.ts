
export function phaseSweepMag(phase) {
  let sweep = []
  let mag = 0

  if (phase <= 0.25) {
      sweep = [ 1, 0 ];
      mag = 20 - 20 * phase * 4
  } else if (phase <= 0.50) { 
      sweep = [ 0, 0 ];
      mag = 20 * (phase - 0.25) * 4
  } else if (phase <= 0.75) {
      sweep = [ 1, 1 ];
      mag = 20 - 20 * (phase - 0.50) * 4
  } else if (phase <= 1) {
      sweep = [ 0, 1 ];
      mag = 20 * (phase - 0.75) * 4
  }

  return {sweep, mag}
}