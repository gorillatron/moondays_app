

import * as React from 'react'
import {Illumination} from 'suncalc'
import Crater from './Crater'
import MoonLight from './MoonLight'
import {colors} from './style'


export interface MoonProps {
  size:number
  illumination:Illumination,
  transitionDuration:number
}


export default (properties:MoonProps) => {

  const {illumination, size, transitionDuration} = properties
  const {fraction, phase} = illumination

  const craters = [
    <Crater illumination={illumination} transitionDuration={transitionDuration} size={130} top={10} left={20} />,
    <Crater illumination={illumination} transitionDuration={transitionDuration} size={55} top={55} left={12} />,
    <Crater illumination={illumination} transitionDuration={transitionDuration} size={30} top={70} left={65} />
  ]

  const glowSizeA = size
  const glowSizeB = (glowSizeA / 100) * 90
  const moonSize = (glowSizeB / 100) * 90
  
  return (
    <div style={{
      width: `${glowSizeA}px`,
      height: `${glowSizeA}px`,
      boxSizing: 'border-box',
      borderRadius: '50%',
      transition: `all ${transitionDuration}s linear`,
      backgroundColor: `rgba(0, 0, 0, ${(fraction) * 0.1})`,
      padding: `${(glowSizeA - glowSizeB) / 2}px`
    }}>
      <div style={{
        width: `${glowSizeB}px`,
        height: `${glowSizeB}px`,
        boxSizing: 'border-box',
        borderRadius: '50%',
        transition: `all ${transitionDuration}s linear`,
        backgroundColor: `rgba(0, 0, 0, ${(fraction) * 0.25})`,
        padding: `${(glowSizeB - moonSize) / 2}px`
      }}>

        <div style={{
          position: "relative",
          overflow: 'hidden',
          width: `${moonSize}px`,
          height: `${moonSize}px`,
          backgroundColor: colors.moonShadow,
          borderRadius: "50%"
        }}>

          <MoonLight size={moonSize} transitionDuration={transitionDuration} illumination={illumination}/>

        </div>
      </div>
    </div>
  )
}