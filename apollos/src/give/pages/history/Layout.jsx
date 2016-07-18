
import { Component, PropTypes} from "react"
import { Link } from "react-router"
import ReactDOM from "react-dom"
import Moment from "moment"
// import { TransitionMotion, spring, presets } from "react-motion"
// import { VelocityComponent } from "velocity-react"

import { Spinner } from "../../../core/components/loading"
import Split, { Left, Right } from "../../../core/blocks/split"
import Meta from "../../../core/components/meta"

import { Offline } from "../../components/status"

function formatDate(date){
  return Moment(date).format("MMM D, YYYY")
}

function monentize(value, fixed){

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

const TransactionDetail = ({ transactionDetail, transaction, icon, status, failure, person }) => (
  <div className="grid" style={{verticalAlign: "middle"}}>
    <div className="grid__item three-fifths" style={{verticalAlign: "middle"}}>
      <div className="relative">
        <div className="background--fill soft visuallyhidden@palm float-left round push-half-top" style={{ backgroundImage: `url("${person.photo}")`}}></div>
        <div className="soft-double-left@palm-wide-and-up push-left@palm-wide-and-up">
          <h5 className="text-dark-secondary flush" style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
            {transactionDetail.account.name}
          </h5>
          <h6 className="text-dark-tertiary soft-half-bottom flush">{person.firstName} {person.lastName}</h6>
          <p className={`flush italic small ${failure ? 'text-alert' : 'text-dark-tertiary'}`}>
            {status ? `${status} - `: ''}{formatDate(transaction.date)}
          </p>
        </div>
      </div>

    </div>

    <div className="grid__item two-fifths text-right" style={{verticalAlign: "middle"}}>
      <div className="soft-half-right">

        <h4 className="text-dark-tertiary one-whole flush soft-right@handheld soft-double-right@lap-and-up" style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {monentize(transactionDetail.amount)}
          {(() => {
            if (icon) {
              return (
                <span className="text-primary icon-arrow-next locked" style={{
                  right: "-5px",
                  top: "1px"
                }}/>
              )
            }
          })()}

        </h4>


      </div>

    </div>

  </div>
)

export const TransactionCard = ({ transactionDetail, transaction, person }) => {
  let { status } = transaction;

  /*

    turn on a couple pendings for UI testing

  */
  if (status && status.toLowerCase().indexOf('pending') > -1) {
    return (
      <div
        className="soft card"
        style={{
          borderStyle: "solid",
          borderColor: "f1f1f1",
          boxShadow: "none",
          borderWidth: "2px",
          backgroundColor: "transparent",
        }}
      >
        <TransactionDetail
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={false}
          status="Pending"
          person={person}
        />
      </div>
    )
  }

  if (status && status.toLowerCase().indexOf('failed') > -1) {
    return (
      <div
        className="soft card"
      >
        <TransactionDetail
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={false}
          status="Failed to Process"
          failure={true}
          person={person}
        />
      <p className="flush-bottom soft-top" style={{lineHeight: ".9"}}><small><em>
          For more information about why this contribution failed to process, please contact our Finance Team at <a href="tel:864-965-9990">864-965-9990</a> or <a target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us</a>
        </em></small></p>
      </div>
    )
  }
  return (
    <div className="soft card">
      <Link to={`/give/history/${transaction.id}`}>
        <TransactionDetail
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={true}
          person={person}
        />
      </Link>
    </div>
  )
}

export default class Layout extends Component {

  monentize = monentize
  formatDate = formatDate

  render () {

    const { transactions, ready, paginate, done } = this.props


    return (

      <div>
        <Split nav={true} classes={["background--light-primary"]}>

          <Meta title="Giving History" />

          <Right background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg"
      mobile={false}>
          </Right>


        </Split>
        <Left scroll={true} ref="container" classes={["background--light-secondary"]}>


          <div className="soft-double-sides@lap-and-up soft-ends@lap-and-up background--light-primary">
            <div className="soft soft-double-ends hard-left@lap-and-up">
              <h2 className="flush hard">Giving History</h2>
            </div>
          </div>


          <div className="soft-half soft@portable soft-double@anchored soft-double-bottom@anchored soft-bottom@portable" ref="history">
            {(() => {

              if (!transactions.length && !ready) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>

                )
              } else if (!transactions.length && ready) {
                return (
                  <div className="text-left soft-ends soft-half-sides">
                    <p>
                      We didn't find any contributions associated with your account. If you would like to start giving, click <Link to="/give/now">here</Link>
                    </p>
                    <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or <a target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.</em></p>
                  </div>
                )
              }

              let lastYear = null
              return (
                <div>
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
                            person={person}
                            key={i}
                          />
                        )
                      })}
                    </div>

                  )

                })}
                </div>
              )

            })()}
          </div>

          {/* Load more */}
          <div className="one-whole text-center">
            {(() => {
              let btnClasses = [
                "btn--dark-tertiary",
                "push-top",
                "push-double-bottom"
              ];

              if (!ready && !transactions.length) return null;

              if (done) {
                return (
                  <button className="disabled soft-ends btn" disabled>
                    No More Contributions
                  </button>
                )
              }

              if (!ready) {
                return (
                  <button className="disabled btn" disabled>
                    Loading...
                  </button>
                )
              }

              return (
                <button onClick={paginate} className={btnClasses.join(" ")}>
                  Load More Contributions
                </button>
              )
            })()}
          </div>


        </Left>
      </div>
    )
  }
}
