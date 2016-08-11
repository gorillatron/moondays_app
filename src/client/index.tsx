
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as suncalc from 'suncalc'
import * as moment from 'moment'
import * as Hammer from 'hammerjs'
import Moon from './components/moon/Moon'
import {phaseSweepMag} from './lib/moon'


const interval = 25


function ease(t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
}

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

    
    const mc = new Hammer.Manager(document.getElementById("root"))
    const pan = new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL})
    const swipe = new Hammer.Swipe({direction: Hammer.DIRECTION_HORIZONTAL})

    pan.recognizeWith(swipe)

    mc.add(pan)
    mc.add(swipe)

    let origin = this.state.date

    mc.on('swipe', (event) => {
      origin = this.state.date
    })

    mc.on('pan', (event) => {
      this.setDate(origin, (event.deltaX / 5) * -1)
    })
  }

  setDate(origin, mod) {
    const date = moment(origin).add(mod, "hours")
    const prevIllmuniation = this.state.illumination
    const illumination = suncalc.getMoonIllumination(date.toDate())
    this.setState({
      date,
      prevIllmuniation,
      illumination
    })
  }

  render() {
    return <div id="root" style={{backgroundColor: `rgba(59, 63, 95, ${((1 - this.state.illumination.fraction) * 0.05) + 0.95})`}}>
      <br />

      <h1 style={{textAlign: "center", color: "rgba(255,255,255, 0.8)", fontFamily: 'arial'}}>{this.state.date.calendar()}</h1>

      <div style={{textAlign: 'center', margin: '100px auto 0px auto', width: '360px'}}>
        <Moon illumination={this.state.illumination} transitionDuration={interval / 1000} size={250} />
      </div>

      
    </div>
  }

}


ReactDOM.render(
    <App/>,
    document.getElementById("app")
);