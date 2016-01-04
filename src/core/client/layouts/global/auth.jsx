import { Component, PropTypes} from "react"

import Global from "./global"
import { onBoard } from "../../../../rock/client/middlewares/"
import { addMiddleware } from "../../middlewares"

import { Authorized } from "../../blocks"

addMiddleware(
  onBoard
)

class App extends Component {
  render () {
    return (
      <Global>
        <Authorized>
          {this.props.children}
        </Authorized>
      </Global>
    )

  }
}

export default App
