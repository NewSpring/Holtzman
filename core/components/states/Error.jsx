import { VelocityComponent } from "velocity-react"
import { WindowLoading } from "../loading"

const Err = ({msg, error}) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    runOnMount={true}
  >
    <WindowLoading classes={["background--alert"]}>
      <div className="locked-top locked-bottom one-whole floating">
        <div className="floating__item">
          <h4 className="text-light-primary">{msg}</h4>
          <p className="text-light-primary hard">{error}</p>
        </div>
      </div>
    </WindowLoading>
  </VelocityComponent>
)

export default Err
