import { Component, PropTypes} from "react"
import Moment from "moment"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import { Spinner } from "../../../../core/components/loading"
import Split, { Left, Right } from "../../../../core/blocks/split"
import SideBySide from "../../../../core/components/cards/SideBySide"
import Meta from "../../../../core/components/meta"

import { AccountType } from "../../../components"
import { TransactionCard } from "../../history/Layout";


export default class Layout extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
  }

  formatDate = (date) => {
    return Moment(new Date(date)).format("MMM D, YYYY")
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`
    }

    if (!value.length) {
      return `$0.00`
    }

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render () {

    const {
      schedule,
      stop,
      state,
      active,
      complete,
      ready,
      entries,
      loadingEntries
    } = this.props

    return (

        <div>
          <Split nav={true} classes={["background--light-primary"]}>

            <Meta title="Giving Schedule" />

            <Right background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
     mobile={false}>

            </Right>
          </Split>
          <Left scroll={true} classes={["background--light-secondary"]} ref="container">

            <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary">
              {(() => {
                if (process.env.WEB) {
                  return (
                    <Link to="/give/schedules" className="locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" >
                      <i className="icon-arrow-back soft-half-right display-inline-block" style={{verticalAlign: "middle"}}></i>
                      <span className="display-inline-block" style={{verticalAlign: "middle", marginBottom: "2px"}}>Back</span>
                    </Link>
                  )
                }
              })()}
              <div className="text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored ">
                <div className="soft-double-ends@anchored">
                  {(() => {

                    if (!schedule || !ready) {
                      // loading
                      return (
                        <div className="text-center soft">
                          <Spinner styles={{width: "40px", height: "40px"}}/>
                        </div>
                      )
                    }

                    return (
                      <div className="text-center">
                        <p className="push-half-bottom"><em>Started on {this.formatDate(schedule.start)}</em></p>

                        <h4 className="text-dark-secondary flush-bottom">{this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}</h4>
                        <h3 className="text-primary">{schedule.details[0].account.name}</h3>

                        <h1 className="text-dark-primary">{this.monentize(schedule.details[0].amount)}</h1>


                        {(() => {
                          const detail = schedule.payment
                          if (detail && detail.accountNumber) {
                            return (
                              <h4 className="text-dark-secondary soft-half-top">
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
                        {(() => {

                          if (complete) {
                            return (
                              <h6 className="text-brand">
                                Schedule Completed
                              </h6>
                            )
                          }

                          if (active) {
                            return (
                              <h6 className="text-alert" onClick={stop} style={{cursor: "pointer"}}>
                                Stop Contribution
                              </h6>
                            )
                          }

                          return (
                            <h6 className="text-brand">
                              Contribution Stopped
                            </h6>
                          )

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

              {(() => {
                if (!schedule) return null;
                let { transactions } = schedule;
                if (!transactions.length && ready) {
                  return (
                    <div className="text-left soft-double-top soft-half-sides">
                      <p>
                        We didn't find any contributions associated with this schedule.
                      </p>
                      <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or <a target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.</em></p>
                    </div>
                  )
                }

                let lastYear = null
                return (
                  <div>
                  <h4 className="soft soft-double-ends text-center flush-bottom">
                    Contributions from this Schedule
                  </h4>
                  {transactions.map((transaction, key) => {
                    let { details, person } = transaction
                    return (
                      <div key={key}>
                        {details.map((transactionDetail, i) => {
                          if (!transactionDetail.account) return null

                          if (Number(transactionDetail.amount) <= 0) return null

                          let year = Moment(transaction.date).year()
                          if (year != lastYear) {
                            lastYear = year
                            return (
                              <div key={i}>
                                <div className="soft text-left">
                                  <h5>{year}</h5>
                                </div>
                                <TransactionCard
                                  transaction={transaction}
                                  transactionDetail={transactionDetail}
                                  person={person}
                                />
                              </div>
                            )

                          }

                          return (
                            <TransactionCard
                              transaction={transaction}
                              transactionDetail={transactionDetail}
                              key={i}
                              person={person}
                            />
                          )
                        })}
                      </div>
                    )
                  })}
                  </div>
                )
              })()}

              <hr className="push-double-top flush-bottom"/>
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

  // <div className="soft-ends push-half-ends hard-sides constrain-mobile">
  //
  //
  //   <h3 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
  //     <span className="text-dark-secondary">
  //       {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
  //
  //
  //     </span> using my <span className="text-dark-secondary">
  //       {schedule.payment.paymentType.toLowerCase()}
  //     </span> ending in <span className="text-dark-secondary">
  //       {schedule.payment.accountNumber.slice(-4)}
  //     </span>
  //   </h3>
  //   {(() => {
  //     if (state.isActive) {
  //       return (
  //         <button className="btn--alert btn--thin btn--small" onClick={stop}>
  //           Cancel gift
  //         </button>
  //       )
  //     }
  //   })()}
  // </div>
  //
  // <p className="text-center soft-ends soft-double@anchored flush-bottom soft-ends soft-sides@portable">
  //   Thank you so much for your gift! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
  // </p>
