import { PropTypes } from "react"
import { WindowLoading, Spinner } from "../../../core/components/loading"

const Loading = (context) => (
  <WindowLoading classes={["background--primary"]}>
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <Spinner styles={{borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px"}}/>
        <h3 className="text-light-primary push-top">We're Processing Your Contribution</h3>
        <p className="text-light-primary">
          Please don't close this window while your contribution is being processed.
        </p>
      </div>
    </div>
  </WindowLoading>
)

Loading.contextTypes = {
  shouldAnimate: PropTypes.bool
}

export default Loading
