import { Component, PropTypes} from "react"
import Moment from "moment"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import { Spinner } from "../../../../core/components/loading"
import Split, { Left, Right } from "../../../../core/blocks/split"
import SideBySide from "../../../../core/components/cards/SideBySide"
import Meta from "../../../../core/components/meta"

import { AccountType } from "../../../components"

export default class Layout extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
  }

  formatDate = (date) => {
    return Moment(new Date(date)).format("MMM D, YYYY")
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") value = `${value}`;
    if (!value.length) return `$0.00`

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }

  render () {
    const { loadingEntries, entries } = this.props;
    return (
      <div>
        <Split nav={true} classes={["background--light-primary"]}>

          <Meta title="Giving History" />

          <Right background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
   mobile={false}>

          </Right>

        </Split>
        <Left scroll={true} ref="container" classes={["background--light-secondary"]}>

          <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary">
            {(() => {
              if (process.env.WEB) {
                return (
                  <Link to="/give/history" className="locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" >
                    <i className="icon-arrow-back soft-half-right display-inline-block" style={{verticalAlign: "middle"}}></i>
                    <span className="display-inline-block" style={{verticalAlign: "middle", marginBottom: "2px"}}>Back</span>
                  </Link>
                )
              }
            })()}
            <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored ">
              <div className="soft-double-ends@anchored">
                {(() => {
                  const { transaction } = this.props
                  if (!transaction) {
                    // loading
                    return (
                      <div className="text-center soft">
                        <Spinner styles={{width: "40px", height: "40px"}}/>
                      </div>
                    )
                  }
                  const { account } = transaction.details[0];
                  const { person } = transaction;
                  return (
                    <div className="text-center">
                      <p className="push-half-bottom"><em>{this.formatDate(transaction.date)}</em></p>
                      <h3 className="text-dark-secondary">{account.name}</h3>

                      <h1 className="text-dark-primary">{this.monentize(transaction.details[0].amount)}</h1>

                      <h6 className="push-bottom text-dark-tertiary">{person.nickName | person.firstName} {person.lastName}</h6>

                      {(() => {
                        const detail = transaction.payment
                        if (detail && detail.accountNumber) {
                          return (
                            <h4 className="text-dark-secondary">
                              {detail.accountNumber.slice(-4)}&nbsp;

                              {(() => {
                                if (detail.paymentType && detail.paymentType === "ACH") {
                                  return (
                                    <AccountType width="30px" height="20px" type="Bank"/>
                                  )
                                } else if (detail.paymentType) {
                                  return (
                                    <AccountType width="30px" height="20px" type={detail.paymentType} />
                                  )
                                }
                              })()}

                            </h4>
                          )
                        }
                      })()}
                      <p className="text-center soft-ends soft-double@anchored flush-bottom soft-ends soft-sides@portable">
                        Thank you so much for your contributions! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
          <div className="soft-half soft-sides@portable soft-double-sides@anchored">

            <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
              Recent Articles About Giving
            </h4>
              {(() => {
                if (loadingEntries) (
                  <div className="one-whole soft text-center"><Spinner /></div>
                )
                return (
                  <div className="grid">
                    {entries && entries.map((entry, key) => (
                      <div key={key} className="grid__item one-whole push-half-bottom push-bottom@portable hard-bottom">
                        <SideBySide
                          classes={["push-bottom@lap-and-up"]}
                          images={entry.content.images}
                          defaultImage={entry.content.images[0].cloudfront}
                        >
                          <h4 className="push-half-top@portable push-top@anchored">
                            {entry.title}
                          </h4>

                          <p><small dangerouslySetInnerHTML={{ __html: entry.meta.summary }}></small></p>
                          {(() => {
                            if (process.env.WEB) {
                              return (
                                <a
                                  target="_blank"
                                  href={`https://newspring.cc/articles/${entry.meta.urlTitle}`}
                                  className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                                >
                                  Read more
                                </a>
                              )
                            }

                            if (process.env.NATIVE) {
                              return (
                                <Link
                                  to={`/articles/${entry.entryId}`}
                                  className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                                >
                                  Read more
                                </Link>
                              )
                            }
                          })()}


                        </SideBySide>
                      </div>
                    ))}
                  </div>
                )

              })()}

          </div>


        </Left>
      </div>

    )
  }
}
