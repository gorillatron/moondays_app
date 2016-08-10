

import * as React from 'react'
import {MoonProps} from './Moon'
import {phaseSweepMag} from '../../lib/moon'
import {colors} from './style'


export default (properties:MoonProps) => {

  const {illumination, size, transitionDuration} = properties
  const {fraction, phase} = illumination


  const {sweep, mag} = phaseSweepMag(phase)
  
  const xmlns = "http://www.w3.org/2000/svg";
  const path = document.createElementNS(xmlns, 'path');

  const svgsize = size + 2

  const d = `
    m${svgsize / 2},0
    a${mag} ,20 0 1, ${sweep[0]} 0,${svgsize} 
    a20,20 0 1, ${sweep[1]} 0,-${svgsize}
  `
  
  return (
    <div style={{
      position: 'absolute',
      zIndex: 2,
      height: `${size}px`,
      width: `${size}px`,
      top: '0px',
      left: '0px'
    }}>

      <svg
        height={`${svgsize}px`}
        width={`${svgsize}px`}
        fill={colors.moon}
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          top: '-1px',
          left: '-1px'
        }}>

        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <path style={{ transition: `all ${transitionDuration}s linear`, filter: "url(#glow)" }} id="moon-path" d={d}> </path>
      </svg>

    </div>
  )
}