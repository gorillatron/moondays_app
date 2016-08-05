
import * as React from 'react'
import * as ReactDOM from 'react-dom'


class C extends React.Component<{}, {}> {

  render() {
    return <div>Hello World</div>
  }

}

ReactDOM.render(
    <C/>,
    document.getElementById("app")
);