
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as suncalc from 'suncalc'
import * as moment from 'moment'
import * as Hammer from 'hammerjs'
import moondays from 'moondays'
import Moon from './components/moon/Moon'
import {phaseSweepMag} from './lib/moon'


const interval = 25


const ease = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
}


const ensurePos = (n) => n < 0 ? n * -1 : n

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

    const mc = new Hammer.Manager(document.getElementById("root"))
    const pan = new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL})
    const swipe = new Hammer.Swipe({direction: Hammer.DIRECTION_HORIZONTAL})

    pan.recognizeWith(swipe)

    mc.add(pan)
    mc.add(swipe)

    let origin = this.state.date
    let animating = false

    mc.on('swipe', (event) => {
      origin = this.state.date
      
      animating = true
      
      const {direction, velocityX} = event

      const startTime = Date.now()
      const duration = 150 * velocityX
      const startX = 0
      const endX = velocityX * 2.1
      
      const render = () => {
        if(!animating) {
          return
        }

        const t = Date.now() - startTime

        if(ensurePos(t / duration) < 1) {
          const mod = endX * ease(t, startX, startX - endX, duration)
          this.setDate(origin, mod)
          setTimeout(() => render(), interval)
        }
      }

      render()
    })

    mc.on('pan', (event) => {
      if(animating) {
        animating = false
        origin = this.state.date
      }
      this.setDate(origin, (event.deltaX / 3) * -1)
    })
  }

  setDate(origin, mod) {
    const date = moment(origin).add(mod, "hours")
    const illumination = suncalc.getMoonIllumination(date.toDate())
    this.setState({
      date,
      illumination
    })
  }

  render() {
    return (
      <div id="root" style={{backgroundColor: `rgba(59, 63, 95, ${((1 - this.state.illumination.fraction) * 0.05) + 0.95})`}}>

        <h1 style={{textAlign: "center", color: "rgba(255,255,255, 0.8)", fontFamily: 'arial'}}>{this.state.date.calendar()}</h1>

        <div style={{textAlign: 'center', margin: '100px auto 0px auto', width: '360px'}}>

          <Moon illumination={this.state.illumination} transitionDuration={interval / 1000} size={350} />
          
        </div>
        
      </div>
    )
  }

}


ReactDOM.render(
    <App/>,
    document.getElementById("app")
);