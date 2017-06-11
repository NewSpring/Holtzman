import PropTypes from "prop-types";
import { Link } from "react-router";

import AddToCart from "../../../components/giving/add-to-cart";

import SideBySide from "../../../components/@primitives/UI/cards/SideBySideCard";
import { Spinner } from "../../../components/@primitives/UI/loading";
import Meta from "../../../components/shared/meta";
import Offline from "../../../components/giving/offline";

const Layout = ({ alive, accounts }) => (
  <div>
    <Meta title="Give" image="//s3.amazonaws.com/ns.assets/apollos/you_cant_outgive_god2x1.jpg" />

    <div className="soft-double-sides@lap-and-up soft-ends@anchored soft background--light-primary" style={{ overflow: "visible" }}>

      <div className="text-left soft-top@anchored hard-left@lap-and-up soft-half-bottom soft@anchored ">
        <div className="soft-double-ends@palm-wide-and-up soft-ends@palm">
          {!alive && <Offline />}
          {alive && accounts.loading && (
            <div className="one-whole text-center soft-ends">
              <Spinner styles={{ width: "40px", height: "40px" }} />
            </div>
          )}
          {alive && !accounts.loading && <AddToCart accounts={accounts.accounts} />}
        </div>
      </div>
    </div>

    <div className="soft-half soft-sides@portable soft-double-sides@anchored">

      <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
        Learn more about our campaigns...
      </h4>
      <div className="grid">

        {accounts.loading && (
          <div className="one-whole text-center soft-ends">
            <Spinner styles={{ width: "40px", height: "40px" }} />
          </div>
        )}

        {accounts.accounts && accounts.accounts.map((account, i) => (
          <div key={i} className="grid__item one-whole push-half-bottom flush-bottom@handheld hard-bottom">
            <SideBySide
              link={`/give/campaign/${encodeURI(account.name)}`}
              linkAll={process.env.NATIVE}
              images={account.images}
              fallbackImage={account.image}
            >
              {(() => {
                if (process.env.NATIVE) {
                  return (
                    <Link className="plain" to={`/give/campaign/${encodeURI(account.name)}`}>
                      <h4 className="push-half-top@portable push-top@anchored text-dark-primary">
                        {account.name}
                      </h4>
                      <p className="text-dark-primary"><small>{account.summary}</small></p>
                      <div className="display-inline-block" style={{ verticalAlign: "middle" }}>
                        <i className="soft-half-right icon-category-text text-dark-tertiary" style={{ verticalAlign: "middle" }} />
                        <h7 className="text-dark-tertiary" style={{ verticalAlign: "middle" }}>Contribution Fund</h7>
                        {/* <h7 className="text-right float-right text-dark-tertiary"></h7>*/}
                      </div>
                    </Link>
                  );
                }

                if (process.env.WEB) {
                  return (
                    <div>
                      <h4 className="push-half-top@portable push-top@anchored">
                        {account.name}
                      </h4>
                      <p><small>{account.summary}</small></p>
                      <Link
                        to={`/give/campaign/${encodeURI(account.name)}`}
                        className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                      >
                        Learn more
                      </Link>
                    </div>
                  );
                }

                return null;
              })()}


            </SideBySide>
          </div>
        ))}

      </div>

    </div>
  </div>
);

Layout.propTypes = {
  alive: PropTypes.bool,
  accounts: PropTypes.object,
};

export default Layout;
