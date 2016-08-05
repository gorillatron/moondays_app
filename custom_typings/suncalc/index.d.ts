declare module 'suncalc' {

  interface Illumination {
    fraction:number
    phase:number
    angle:number
  }

  function getMoonIllumination(day:Date):Illumination

}