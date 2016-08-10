
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as suncalc from 'suncalc'
import * as moment from 'moment'
import Moon from './components/moon/Moon'
import {phaseSweepMag} from './lib/moon'



const interval = 33

class App extends React.Component<{}, {illumination: suncalc.Illumination, prevIllmuniation:suncalc.Illumination, date:moment.Moment}> {

  constructor() {
    super()
    const date = moment()
    const illumination = suncalc.getMoonIllumination(date.toDate())
    this.state = {
      date,
      illumination,
      prevIllmuniation: illumination
    }
  }

  componentDidMount() {
    setInterval(() => {
      const date = moment(this.state.date).add(3, "hours")
      const prevIllmuniation = this.state.illumination
      const illumination = suncalc.getMoonIllumination(date.toDate())
      this.setState({
        date,
        prevIllmuniation,
        illumination
      })
    }, interval)
  }

  render() {
    return <div style={{backgroundColor: `rgba(59, 63, 95, ${((1 - this.state.illumination.fraction) * 0.05) + 0.95})`}}>
      <br />

      <h1 style={{textAlign: "center", color: "rgba(255,255,255, 0.8)", fontFamily: 'arial'}}>{this.state.illumination.phase.toFixed(2)}</h1>

      <div style={{textAlign: 'center', margin: '100px auto 0px auto', width: '360px'}}>
        <Moon illumination={this.state.illumination} transitionDuration={interval / 1000} size={350} />
      </div>

      
    </div>
  }

}


ReactDOM.render(
    <App/>,
    document.getElementById("app")
);