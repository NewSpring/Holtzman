
import Split, { Left, Right } from "../../../core/blocks/split"
import { AddToCart } from "../../blocks"

const Layout = ({ account }) => (
  <Split nav={true}>
    <Right background={account.image} mobile={true}>
    </Right>

    <Left scroll={true} >
      <div className="constrain-copy soft-double@lap-and-up">
        <div className="soft soft-double-bottom soft-double-top@lap-and-up">

          <h2>{account.name}</h2>
          <div dangerouslySetInnerHTML={{__html: account.description}}>

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
