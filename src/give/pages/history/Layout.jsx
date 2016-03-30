
import { Component, PropTypes} from "react"
import { Link } from "react-router"
import ReactDom from "react-dom"
import Moment from "moment"
// import { TransitionMotion, spring, presets } from "react-motion"
// import { VelocityComponent } from "velocity-react"

import { Spinner } from "../../../core/components/loading"
import Split, { Left, Right } from "../../../core/blocks/split"
import Meta from "../../../core/components/meta"

import { Offline } from "../../components/status"

export default class Layout extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
  }

  componentDidMount() {
    const container = ReactDom.findDOMNode(this.refs["container"])
    container.addEventListener("scroll", this.props.onScroll);
     if (typeof window != "undefined" && window != null) {
       window.addEventListener("scroll", this.props.onScroll);
     }

  }

  componentWillUnmount() {
    const container = ReactDom.findDOMNode(this.refs["container"])
    container.removeEventListener("scroll", this.props.onScroll);

    if (typeof window != "undefined" && window != null) {
      window.removeEventListener("scroll", this.props.onScroll);
    }
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

  formatDate = (date) => {
    return Moment(date).format("MMM D, YYYY")
  }



  render () {

    const { transactions, ready } = this.props


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
              <p className="flush-bottom soft-top"><small><em>
                Currently we only support viewing your personal giving history, and not the history of your family. We are working hard to bring this ability, but in the meantime, if you sign into the site using the email of the family member you would like to see, you can view their history and schedules there. If you have any questions please <a href="//rock.newspring.cc/workflows/177" target="_blank">let us know!</a>
              </em></small></p>
            </div>
          </div>


          <div className="soft-half soft@portable soft-double@anchored soft-double-bottom@anchored soft-bottom@portable" ref="history">
            {() => {

              // if (!alive) {
              //   return <Offline />
              // }

              if (!transactions.length && !ready) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{width: "40px", height: "40px"}}/>
                  </div>

                )
              } else if (!transactions.length && ready) {
                return (
                  <div className="text-left soft-ends">
                    <p>
                      We didn't find any contributions associated with your account. If you would like to start giving, click <Link to="/give/now">here</Link>
                    </p>
                    <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or <a target="_blank" href="//rock.newspring.cc/workflows/177">contact us </a> and someone will be happy to assist you.</em></p>
                  </div>
                )
              }

              let lastYear = null
              return (
                <div>
                {transactions.map((transaction, key) => {
                  let { details } = transaction
                  return (
                    <div key={key}>
                      {details.map((transactionDetail, i) => {

                        if (!transactionDetail.account) {
                          return null
                        }

                        let year = Moment(transaction.date).year()
                        if (year != lastYear) {
                          lastYear = year
                          return (
                            <div key={i}>
                              <div className="soft text-left">
                                <h5>{year}</h5>
                              </div>
                              <div  className="soft card">

                                <Link to={`/give/history/${transaction.id}/${transactionDetail.account.id}`}>

                                  <div className="grid" style={{verticalAlign: "middle"}} key={i}>

                                    <div className="grid__item one-half" style={{verticalAlign: "middle"}}>
                                      <h5 className="text-dark-tertiary flush" style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                                        {transactionDetail.account.name}
                                      </h5>
                                      <p className="flush soft-half-top italic small text-dark-tertiary">
                                        {this.formatDate(transaction.date)}
                                      </p>
                                    </div>

                                    <div className="grid__item one-half text-right" style={{verticalAlign: "middle"}}>
                                      <div className="soft-half-right">
                                        <h4 className="text-dark-tertiary flush soft-right@handheld soft-double-right@lap-and-up">
                                          {this.monentize(transactionDetail.amount)}
                                          <span className="text-primary icon-arrow-next locked" style={{
                                              right: "-5px",
                                              top: "1px"
                                            }}></span>
                                        </h4>
                                      </div>

                                    </div>

                                  </div>
                                </Link>

                              </div>
                            </div>
                          )

                        }

                        return (

                          <div key={i} className="soft card">

                            <Link to={`/give/history/${transaction.id}/${transactionDetail.account.id}`}>

                              <div className="grid" style={{verticalAlign: "middle"}} key={i}>

                                <div className="grid__item one-half" style={{verticalAlign: "middle"}}>
                                  <h5 className="text-dark-tertiary flush" style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                                    {transactionDetail.account.name}
                                  </h5>
                                  <p className="flush soft-half-top italic small text-dark-tertiary">
                                    {this.formatDate(transaction.date)}
                                  </p>
                                </div>

                                <div className="grid__item one-half text-right" style={{verticalAlign: "middle"}}>
                                  <div className="soft-half-right">
                                    <h4 className="text-dark-tertiary flush soft-right@handheld soft-double-right@lap-and-up">
                                      {this.monentize(transactionDetail.amount)}
                                      <span className="text-primary icon-arrow-next locked" style={{
                                          right: "-5px",
                                          top: "1px"
                                        }}></span>
                                    </h4>
                                  </div>

                                </div>

                              </div>
                            </Link>

                          </div>
                        )
                      })}
                    </div>

                  )

                })}
                </div>
              )

            }()}
          </div>


        </Left>
      </div>
    )
  }
}
