import { Component, PropTypes} from "react"
import { VelocityComponent } from "velocity-react"

import { WindowLoading } from "../../components/loading"

export default class  extends Component {
  render () {
    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        runOnMount={true}
      >
        <WindowLoading classes={["background--primary"]}>
          <div className="locked-top locked-bottom one-whole floating">
            <div className="floating__item">
              {() => {
                if (this.props.account) {
                  return (
                    <h4 className="text-light-primary">Signing You In...</h4>
                  )
                }

                return (
                  <h4 className="text-light-primary">Creating you account</h4>
                )
              }()}

            </div>
          </div>
        </WindowLoading>
      </VelocityComponent>
    )
  }
}
