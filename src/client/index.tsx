
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as moondays from 'moondays'
import * as suncalc from 'suncalc'
import * as moment from 'moment'



interface MoonProps {
  size:number
  illumination:suncalc.Illumination
}

const Moon = (properties:MoonProps) => {

  const {illumination, size} = properties

  return (
    <div style={{
      position: "relative",
      margin: "100px auto",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "#ECF0F1",
      borderRadius: "50%",
    }}>
      <Crater illumination={illumination} size={130} top={10} left={20} />
      <Crater illumination={illumination} size={55} top={55} left={12} />
      <Crater illumination={illumination} size={30} top={70} left={65} />
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

  return (
    <div style={{
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      overflow: 'hidden',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: "#BABCC1"
    }}>
      <div style={{
        width: `${adjustedSize}px`,
        height: `${adjustedSize}px`,
        borderRadius: "50%",
        borderStyle: 'solid',
        borderColor: `rgba(0, 0, 0, ${fraction * 0.5})`,
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