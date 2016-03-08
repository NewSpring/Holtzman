import { PropTypes } from "react"
import Meta from "../../../../core/components/meta"
import { Link } from "react-router"

import { AccountType } from "../../../../give/components"
// import { VelocityComponent } from "velocity-react"

const Layout = ({ details, remove }) => (
  <div className="background--light-primary text-center soft-double-top push-double-bottom push-double-top" style={{overflow: "visible"}}>
    <Meta title="Saved Payments" />
      <Link to="/profile/settings" className="locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" >
        <i className="icon-arrow-back soft-half-right display-inline-block" style={{verticalAlign: "middle"}}></i>
        <span className="display-inline-block" style={{verticalAlign: "middle", marginBottom: "2px"}}>Back</span>
      </Link>
    <div className="one-whole two-thirds@anchored display-inline-block">
      <h3>Saved Accounts</h3>
      <div className="soft-sides soft-double-sides@lap-and-up">
        {details.map((account, key) => {
          return (
            <div key={key} className="soft-ends text-left hard-sides outlined--light outlined--bottom constrain-mobile">
              <div className="display-inline-block soft-half-ends one-whole">
                <h6 className="flush-bottom float-left">{account.name}</h6>
                <button className="h6 flush-bottom float-right text-alert" id={account.id} onClick={remove}>Remove</button>
              </div>


              <h5 className="hard one-whole flush-bottom">
                {account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*")}{account.payment.accountNumber.slice(-4)}
                <span className="float-right ">
                  <AccountType width="30px" height="20px" type={account.payment.paymentType}/>

                </span>

              </h5>


            </div>
          )
        })}

        <p className="soft-ends text-left">
          To add a saved account, click the option to save account on your next gift!
        </p>
      </div>

    </div>

  </div>
)

Layout.propTypes = {
  details: PropTypes.array,
  remove: PropTypes.func
}

export default Layout
