import { Component, PropTypes} from "react"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../core/blocks/split"
import SideBySide from "../../../core/components/cards/SideBySide"
import { Spinner } from "../../../core/components/loading"
import Meta from "../../../core/components/meta"

import { Offline } from "../../components/status"
import AddToCart from "../../blocks/AddToCart"

const Layout = ({ alive, accounts }, context) => (


    <div>

      <Meta title="Give" image="//s3.amazonaws.com/ns.assets/apollos/you_cant_outgive_god2x1.jpg" />

      <Split nav={true} classes={["background--light-primary"]}>

        <Right
          background="//s3.amazonaws.com/ns.assets/apollos/39616.perry.cen.web.scheduleyourgivingad_1x2.jpg"
          link="/give/schedules"
        />

      </Split>

      <Left scroll={true} classes={["background--light-secondary"]} >
        <div className="background--light-secondary soft-half soft-sides@portable soft-double-sides@anchored">

          <div className="soft-ends soft-double-ends@lap-and-up soft-side@lap-and-up">
            <h5 className="soft-half-sides soft-half-bottom flush-bottom">Exciting Changes to Giving!</h5>
            <p className="soft-half-sides flush-bottom">
              <em>
                <small>
                  You may notice our website looks a little different, but we’re confident our new site will make it easier and more enjoyable for you to give! If you want to know more, or are having problems giving, <a href="//newspring.cc/news/exciting-changes-to-how-you-give" target="blank">click here to read more!</a>
                </small>
              </em>
           </p>
          </div>

        </div>
        <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary" style={{overflow: "visible"}}>

          <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored ">
            <div className="soft-double-ends@anchored">
              {function() {

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

        <Link to="/give/schedules" className="visually--hidden@lap-and-up">
          <div className="ratio--landscape@handheld background--fill" style={{
              backgroundImage: "url(//s3.amazonaws.com/ns.assets/apollos/39616.perry.cen.web.scheduleyourgivingad_2x1.jpg)"
            }}>
            <div className="ratio__item"></div>
          </div>
        </Link>

        <div className="soft-half soft-sides@portable soft-double-sides@anchored">

          <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
            Learn more about our campaigns...
          </h4>
          <div className="grid">

            {(function() {

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
                <div key={i} className="grid__item one-whole push-half-bottom flush-bottom@handheld hard-bottom">
                  <SideBySide
                    link={`/give/campaign/${encodeURI(account.name)}`}
                    image={{
                      "1:1": account.formatedImage && account.formatedImage["1:1"] ? account.formatedImage["1:1"] : account.image,
                      "2:1": account.formatedImage && account.formatedImage["2:1"] ? account.formatedImage["2:1"] : account.image,
                      "1:2": account.formatedImage && account.formatedImage["1:2"] ? account.formatedImage["1:2"] : account.image,
                      defaultImage: account.image
                    }}
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
    </div>
)

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
