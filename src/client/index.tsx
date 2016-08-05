
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as moondays from 'moondays'
import * as suncalc from 'suncalc'
import * as moment from 'moment'

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
      margin: "350px auto",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: colors.moon,
      borderRadius: "50%",
      zIndex: 1,
    }}>

      <MoonShadow size={size} illumination={illumination}/>

      <Crater illumination={illumination} size={130} top={10} left={20} />
      <Crater illumination={illumination} size={55} top={55} left={12} />
      <Crater illumination={illumination} size={30} top={70} left={65} />

    </div>
  )
}


const MoonShadow = (properties:MoonProps) => {

  const {illumination, size} = properties
  const {fraction, phase} = illumination

  const rLeft = 50
  const rTop = (size + 4) / 2
  
  return (
    <div style={{
      position: 'absolute',
      zIndex: 2,
      height: `${size + 4}px`,
      width: `${size + 4}px`,
      top: '-2px',
      left: '-2px'
    }}>

      <ShadowPartLeft illumination={illumination} size={size}/>
      <ShadowPartRight illumination={illumination} size={size}/>

    </div>
  )
}



const ShadowPartLeft = (properties:MoonProps) => {
  
  const {illumination, size} = properties
  const {fraction, phase} = illumination

  const height = phase < 0.5 ? 
    ((size) * (1 + fraction) * 1) + 8 :
    (size + 8)
  const width = height

  const borderRadius = phase < 0.5 ? 
    50 * (1 - fraction) + (fraction * 30) :
    0

  const translateX = phase < 0.5 ? 
    (width - size) / 2 :
    ((size / 2) + 2)
  const translateY = (height - size) / 2

  return (
    <div style={{
      position: 'absolute',
      zIndex: 3,
      height: `${height}px`,
      width: `${height}px`,
      top: '-2px',
      borderRadius: `${borderRadius}%`,
      left: `-2px` ,
      transform: `translate(${translateX}px, -${translateY}px)`, 
      backgroundColor: colors.moonShadow
    }}/>
  )
}

const ShadowPartRight = (properties:MoonProps) => {
  
  const {illumination, size} = properties
  const {fraction, phase} = illumination
  
  const pl = 0.45

  const height = phase < pl ? 
    size + 8 :
    ((size) * (1 + fraction) * 1) + 8
  const width = height

  const borderRadius = phase < pl ? 
    0 :
    50 * (1 - fraction) + (fraction * 30)

  const translateX = phase < pl ? 
    -(width / 2) -4 :
    -(width) + (size / 2) + ((1 - fraction) * (size / 2))
  const translateY = (height - size) / 2

  return (
    <div style={{
      position: 'absolute',
      zIndex: phase < pl ? 2 : 3,
      height: `${height}px`,
      width: `${height}px`,
      top: '-2px',
      borderRadius: `${borderRadius}%`,
      left: `-2px` ,
      transform: `translate(${translateX}px, -${translateY}px)`, 
      backgroundColor: colors.moon
    }}/>
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
  const borderWidth = phase > 0.5 ? `0px ${borderWidthPx}px ${borderWidthPx}px 0px` : `0px 0px ${borderWidthPx}px ${borderWidthPx}px`
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
      <Moon illumination={this.state.illumination} size={300} />

    </div>
  }

}


ReactDOM.render(
    <App/>,
    document.getElementById("app")
);