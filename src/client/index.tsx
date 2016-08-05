
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

  return <div>
    <Crater illumination={illumination} size={55} top={10} left={50} />
    <Crater illumination={illumination} size={20} top={70} left={10} />
    <Crater illumination={illumination} size={10} top={90} left={75} />
  </div>
}



interface CraterProps extends MoonProps {
  size:number
  top:number
  left:number
}

const Crater = (properties:CraterProps) => {
  return <div></div>
}



class App extends React.Component<{}, {illumination: suncalc.Illumination}> {

  componentDidMount() {
    const start = moment()
    setInterval(() => {
      const nextDate = moment(start).add(1, "days")
      this.setState({
        illumination: suncalc.getMoonIllumination(nextDate.toDate())
      })
    }, 2000)
  }

  render() {
    return <div>
    
      <Moon illumination={this.state.illumination} size={300} />

    </div>
  }

}


ReactDOM.render(
    <App/>,
    document.getElementById("app")
);