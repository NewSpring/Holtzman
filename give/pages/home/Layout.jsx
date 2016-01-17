import { Component, PropTypes} from "react"
import { Link } from "react-router"

import Split, { Left, Right } from "../../../core/blocks/split"
import { Card } from "../../../core/components"
import { Spinner } from "../../../core/components/loading"

import { Offline } from "../../components/status"
import { AddToCart } from "../../blocks"

const Layout = ({ alive, accounts }) => (
  <Split nav={true}>

    <Right
      background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg">
    </Right>

    <Left scroll={true} >
      <div className="soft soft-double@lap-and-up push-double@lap-wide-and-up">

        <div className="text-left">

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

        <div className="soft-double-ends@lap-and-up">
          <div className="outlined--light outlined--top push-double-ends"></div>
        </div>

        <h4 className="push-bottom@lap-and-up">Or, give to one of our campaigns...</h4>
        <div className="grid">
          {() => {

            if (!alive) { return null }

            if (!accounts.length) {
              return (
                <div className="one-whole text-center soft-ends">
                  <Spinner styles={{width: "40px", height: "40px"}}/>
                </div>
              )
            }
          }()}
          {accounts.map((account, i) => {
            if (!account.Url || !account.Description) {
              return null
            }

            return (
              <div key={i} className="grid__item one-whole one-half@anchored push-bottom">
                <Card
                  link={`/give/campaign/${encodeURI(account.Name)}`}
                  image={{
                    url: account.Url
                  }}
                >
                  <h4>{account.PublicName || account.Name}</h4>
                  <p>
                    {account.Description}
                  </p>
                  <Link
                    to={`/give/campaign/${encodeURI(account.Name)}`}
                    className="h6 btn--small btn--dark-tertiary soft-sides@portable"
                  >
                    Learn more
                  </Link>

                </Card>
              </div>
            )
          })}
        </div>

      </div>
    </Left>

  </Split>
)

export default Layout
