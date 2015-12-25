import { Component, PropTypes} from "react"
import { AccountType } from "../../../components"


export default class Confirm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    clear: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
  }

  header = () => {
    return (
      <h4 className="text-center">
        Review And Complete Your Gift
      </h4>
    )
  }

  buttonText = () => {

    const { payment } = this.props.data

    let text = "Give Now"
    console.log(payment, this.props.data)
    if (payment.accountNumber || payment.cardNumber) {

      const masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;
      text += ` using ${masked.slice(-4)}`

    }

    return text

  }

  icon = () => {

    const { payment } = this.props.data

    if (payment.type === "ach") {
      return (
        <AccountType width="30px" height="20px" type="Bank"/>
      )
    }

    if (payment.type === "cc") {

      let type = "Visa"

      return (
        // replace with SVG
        <AccountType width="30px" height="20px" type={type}/>
      )
    }

  }

  listItem = (transaction) => {
    return (
      <div className="soft-ends hard-sides outlined--light outlined--bottom">

        <div className="grid" style={{verticalAlign: "middle"}}>

          <div className="grid__item five-eighths" style={{verticalAlign: "middle"}}>
            <h5 className="text-dark-tertiary flush text-left">
              Tithe
            </h5>
          </div>

          <div className="grid__item three-eighths text-right" style={{verticalAlign: "middle"}}>
            <h4 className="text-dark-tertiary flush">
              $567.98
            </h4>
          </div>

        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>

        <div className="soft">
          {this.listItem()}

          <button className="btn one-whole push-double-top">
            {this.buttonText()} {this.icon()}
          </button>
        </div>


      </div>
    )
  }
}
