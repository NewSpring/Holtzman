import { PropTypes } from "react"
import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../core/blocks/split"
import Meta from "../../../core/components/meta"
import AddToCart from "../../blocks/AddToCart"

const Layout = ({ account }, context) => (

  <VelocityComponent
    animation={"transition.fadeIn"}
    duration={1000}
    runOnMount={context.shouldAnimate}
  >
  <div>
    <Split nav={true} classes={["background--light-primary"]}>
      <Meta
        title={account.name}
        description={account.summary}
        image={account.image}
        meta={[
          {"property": "og:type", "content": "article"}
        ]}
      />

      <Right background={account.formatedImage["2:1"] ? account.formatedImage["2:1"] : account.image } mobile={true} />
      <Right background={account.formatedImage["1:2"] ? account.formatedImage["1:2"] : account.image } mobile={false} />


    </Split>
    <Left scroll={true} >
      <div className="constrain-copy soft@lap-and-up">
        <div className="soft soft-double-bottom soft-double-top@lap-and-up">

          <h2>{account.name}</h2>
          <div dangerouslySetInnerHTML={{__html: account.description}}>

          </div>
        </div>
      </div>

      <div className="background--light-secondary">
        <div className="constrain-copy soft-double@lap-and-up">
          <div className="soft soft-double-bottom soft-double-top@lap-and-up">
            <AddToCart accounts={[account]} donate={true} />
          </div>
        </div>
      </div>

    </Left>
  </div>

  </VelocityComponent>
)

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
