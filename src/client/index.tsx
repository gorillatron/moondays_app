
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as moondays from 'moondays'
import * as suncalc from 'suncalc'
import * as moment from 'moment'
import {phaseSweepMag} from './lib/moon'




const colors = {
  moon: "#d5d9d9",
  moonShadow: "#969999"
}



interface MoonProps {
  size:number
  illumination:suncalc.Illumination
}

const Moon = (properties:MoonProps) => {

  const {illumination, size} = properties
  const {fraction, phase} = illumination

  return (
    <div style={{
      position: "relative",
      overflow: 'hidden',
      margin: "150px auto",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: colors.moonShadow,
      borderRadius: "50%",
      zIndex: 1,
    }}>

      <MoonLight size={size} illumination={illumination}/>

      <Crater illumination={illumination} size={130} top={10} left={20} />
      <Crater illumination={illumination} size={55} top={55} left={12} />
      <Crater illumination={illumination} size={30} top={70} left={65} />

    </div>
  )
}


const MoonLight = (properties:MoonProps) => {

  const {illumination, size} = properties
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
        <path d={d}></path>
      </svg>

    </div>
  )
}





interface CraterProps extends MoonProps {
  size:number
  top:number
  left:number
}

const Crater = (properties:CraterProps) => {

  const {illumination, size, top, left} = properties
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
      backgroundColor: "#BABCC1",
      zIndex: 5,
    }}>
      <div style={{
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



class App extends React.Component<{}, {illumination: suncalc.Illumination, date:moment.Moment}> {

  constructor() {
    super()
    const date = moment()
    const illumination = suncalc.getMoonIllumination(date.toDate())
    this.state = {
      date,
      illumination
    }
  }

  componentDidMount() {
    setInterval(() => {
      const date = moment(this.state.date).add(1, "days")
      const illumination = suncalc.getMoonIllumination(date.toDate())
      this.setState({
        date,
        illumination
      })
    }, 100)
  }

  render() {
    return <div style={{backgroundColor: "#34495E"}}>
      <br />

      <h1>{this.state.illumination.phase}</h1>

      <Moon illumination={this.state.illumination} size={300} />

      
    </div>
  }

}


ReactDOM.render(
    <App/>,
    document.getElementById("app")
);