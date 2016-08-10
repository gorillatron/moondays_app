
import {MoonProps} from './Moon'
import * as React from 'react'


interface CraterProps extends MoonProps {
  size:number
  top:number
  left:number
}


export default (properties:CraterProps) => {

  const {illumination, size, top, left, transitionDuration} = properties
  const {fraction, phase} = illumination

  const maxBorderSize = size / 100 * 20
  const borderWidthPx = maxBorderSize - (maxBorderSize * fraction)
  const borderWidth = phase < 0.5 ? `0px ${borderWidthPx}px ${borderWidthPx}px 0px` : `0px 0px ${borderWidthPx}px ${borderWidthPx}px`
  const adjustedSize = size - borderWidthPx
  const borderOpacity = fraction * 0.5

  return (
    <div style={{
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      overflow: 'hidden',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: "rgb(186, 188, 193)",
      border: "2px solid rgba(0,0,0, 0.4)",
      zIndex: 5,
    }}>
      <div style={{
        transition: `all ${transitionDuration}s`,
        width: `${adjustedSize + 4}px`,
        height: `${adjustedSize + 4}px`,
        margin: '-2px 0px 0px -1px',
        borderRadius: "50%",
        borderStyle: 'solid',
        borderColor: `rgba(0, 0, 0, ${borderOpacity})`,
        borderWidth
      }} />
    </div>
  )
}