
import Meta from "react-helmet"

import Split, { Left, Right } from "../../../core/blocks/split"
import { AddToCart } from "../../blocks"

const Layout = ({ account }) => (

  <Split nav={true}>
    <Meta
      title={account.name}
      titleTemplate="%s | NewSpring Church"
      meta={[
          {"name": "description", "content": account.summary},
          {"property": "og:type", "content": "article"}
      ]}
    />
    <Right background={account.image} mobile={true}>
    </Right>

    <Left scroll={true} >
      <div className="constrain-copy soft@lap-and-up">
        <div className="soft soft-double-bottom soft-double-top@lap-and-up">

          <h2>{account.PublicName}</h2>
          <div dangerouslySetInnerHTML={{__html: account.PublicDescription}}>

          </div>
        </div>
      </div>

      <div className="background--light-secondary">
        <div className="constrain-copy soft-double@lap-and-up">
          <div className="soft soft-double-bottom soft-double-top@lap-and-up">
            <AddToCart accounts={[account]} />
          </div>
        </div>
      </div>

    </Left>
  </Split>
)

export default Layout
