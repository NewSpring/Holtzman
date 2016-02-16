import { Component, PropTypes} from "react"
import { Link } from "react-router"
import Meta from "react-helmet"

import Split, { Left, Right } from "../../../core/blocks/split"
import SideBySide from "../../../core/components/cards/SideBySide"
import { Spinner } from "../../../core/components/loading"

import { Offline } from "../../components/status"
import { AddToCart } from "../../blocks"

const Layout = ({ alive, accounts }) => (
  <Split nav={true}>

    <Meta
      title="Give"
      titleTemplate="%s | NewSpring Church"
    />

    <Right
      background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg"
      link="/give/recurring"
    >
    </Right>

    <Left scroll={true} classes={["background--light-secondary"]} >
      <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary" style={{overflow: "visible"}}>

        <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored ">
          <div className="soft-double-ends@anchored">
            {() => {

              if (!alive) {
                return <Offline />
              }

              if (!accounts.length) {
                return (
                  <div className="one-whole text-center soft-ends">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>
                )
              }

              return <AddToCart accounts={accounts} />
            }()}
          </div>
        </div>
      </div>

      <div className="soft-half soft-sides@portable soft-double-sides@anchored">

        <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
          Learn more about our campaigns...
        </h4>
        <div className="grid">

          {(() => {

            if (!alive) { return null }

            if (!accounts.length) {
              return (
                <div className="one-whole text-center soft-ends">
                  <Spinner styles={{width: "40px", height: "40px"}}/>
                </div>
              )
            }
          })()}

          {accounts.map((account, i) => {

            if (!account.image || !account.description) {
              return null
            }

            return (
              <div key={i} className="grid__item one-whole push-half-bottom push-bottom@portable hard-bottom">
                <SideBySide
                  link={`/give/campaign/${encodeURI(account.name)}`}
                  image={{
                    url: account.image
                  }}
                  mobile={false}
                >
                  <h4 className="push-half-top@portable push-top@anchored">
                    {account.name}
                  </h4>
                  <p>
                    <small>
                      {account.summary}
                    </small>
                  </p>
                  <Link
                    to={`/give/campaign/${encodeURI(account.name)}`}
                    className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                  >
                    Learn more
                  </Link>

                </SideBySide>
              </div>
            )
          })}
        </div>

      </div>
    </Left>

  </Split>
)

export default Layout
