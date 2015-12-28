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

  listItem = (transaction, key) => {
    console.log(transaction)
    return (
      <div key={key} className="soft-ends hard-sides outlined--light outlined--bottom">

        <div className="grid" style={{verticalAlign: "middle"}}>

          <div className="grid__item five-eighths" style={{verticalAlign: "middle"}}>
            <h5 className="text-dark-tertiary flush text-left">
              {transaction.label}
            </h5>
          </div>

          <div className="grid__item three-eighths text-right" style={{verticalAlign: "middle"}}>
            <h4 className="text-dark-tertiary flush">
              {this.monentize(transaction.value)}
            </h4>
          </div>

        </div>
      </div>
    )
  }

  render () {

    let transactions = []

    for (let transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction])
    }

    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>

        <div className="soft">
          {transactions.map((transaction, key) => {
            return this.listItem(transaction, key)
          })}

          <button className="btn one-whole push-double-top">
            {this.buttonText()} {this.icon()}
          </button>
        </div>


      </div>
    )
  }
}
