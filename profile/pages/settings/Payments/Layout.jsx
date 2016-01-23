import { PropTypes } from "react"

import { AccountType } from "../../../../give/components"

const Layout = ({ details, remove }) => (
  <div className="text-center push-double-top soft-double-top@lap-and-up">
    <div className="one-whole two-thirds@anchored display-inline-block">
      <h3>Saved Accounts</h3>
      <div className="soft-sides soft-double-sides@lap-and-up">
        {details.map((account, key) => {
          return (
            <div key={key} className="soft-ends text-left hard-sides outlined--light outlined--bottom constrain-mobile">
              <h6 className="soft-half-bottom flush-bottom">{account.name}</h6>

              <h5 className="hard one-whole flush-bottom">
                {account.payment.accountNumber}
                <span className="float-right ">
                  <AccountType width="30px" height="20px" type={account.payment.paymentType}/>
                  <button className="soft-left icon-close text-alert" id={account.id} onClick={remove}></button>
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
