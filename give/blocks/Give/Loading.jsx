import { PropTypes } from "react"
import { VelocityComponent } from "velocity-react"
import { WindowLoading, Spinner } from "../../../core/components/loading"

const Loading = (context) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    runOnMount={context.shouldAnimate}
  >
    <WindowLoading classes={["background--primary"]}>
      <div className="soft soft-double-ends push-double-top one-whole text-center">
        <div className="push-double-top">
          <Spinner styles={{borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px"}}/>
          <h3 className="text-light-primary push-top">We're Processing Your Gift</h3>
        </div>
      </div>
    </WindowLoading>
  </VelocityComponent>
)

Loading.contextTypes = {
  shouldAnimate: PropTypes.bool
}

export default Loading
