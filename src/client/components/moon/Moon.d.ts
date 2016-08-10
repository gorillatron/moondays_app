
import {Illumination} from 'suncalc'

interface MoonProps {
  size:number
  illumination:Illumination,
  transitionDuration:number
}

interface CraterProps extends MoonProps {
  size:number
  top:number
  left:number
}