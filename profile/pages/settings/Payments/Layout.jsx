import { PropTypes } from "react"

import { AccountType } from "../../../../give/components"
import { VelocityComponent } from "velocity-react"

const Layout = ({ details, remove }) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    duration={500}
    runOnMount={true}
  >
  <div className="text-center push-double-top soft-double-top@lap-and-up">
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
                {account.payment.accountNumber}
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
</VelocityComponent>
)

Layout.propTypes = {
  details: PropTypes.array,
  remove: PropTypes.func
}

export default Layout
