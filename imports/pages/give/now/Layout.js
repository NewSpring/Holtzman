import { Component, PropTypes } from "react";
import { Link } from "react-router";

import AddToCart from "../../../blocks/add-to-cart";
import Split, { Left, Right } from "../../../blocks/split";

import SideBySide from "../../../components/cards/SideBySide";
import { Spinner } from "../../../components/loading";
import Meta from "../../../components/meta";
import Offline from "../../../components/status/Offline";

const Layout = ({ alive, accounts }) => (

    <div>

      <Meta title="Give" image="//s3.amazonaws.com/ns.assets/apollos/you_cant_outgive_god2x1.jpg" />

      <Split nav classes={["background--light-primary"]}>

        <Right
          background="//s3.amazonaws.com/ns.assets/apollos/42835.marketing.cen.webad.scheduleyourgiving_1x2.jpg"
          link="/give/schedules"
        />

      </Split>

      <Left scroll classes={["background--light-secondary"]} >
        <div className="soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary" style={{ overflow: "visible" }}>

          <div className="text-left soft-double-top@lap-and-up hard-left@lap-and-up soft-half-bottom soft@anchored ">
            <div className="soft-double-ends@palm-wide-and-up soft-ends@palm">
              {(() => {
                if (!alive) {
                  return <Offline />;
                }

                if (accounts.loading) {
                  return (
                    <div className="one-whole text-center soft-ends">
                      <Spinner styles={{ width: "40px", height: "40px" }} />
                    </div>
                  );
                }
                return <AddToCart accounts={accounts.accounts} />;
              })()}
            </div>
          </div>
        </div>

        <Link to="/give/schedules" className="visually--hidden@lap-and-up">
          <div className="ratio--landscape@handheld background--fill" style={{
            backgroundImage: "url(//s3.amazonaws.com/ns.assets/apollos/42835.marketing.cen.webad.scheduleyourgiving_2x1.jpg)",
          }}>
            <div className="ratio__item" />
          </div>
        </Link>

        <div className="soft-half soft-sides@portable soft-double-sides@anchored">

          <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
            Learn more about our campaigns...
          </h4>
          <div className="grid">

            {(() => {
              if (!alive) { return null; }

              if (accounts.loading) {
                return (
                  <div className="one-whole text-center soft-ends">
                    <Spinner styles={{ width: "40px", height: "40px" }} />
                  </div>
                );
              }
            })()}

            {accounts.accounts && accounts.accounts.map((account, i) => {
              return (
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
                            <div className="display-inline-block" style={{verticalAlign: "middle"}}>
                              <i className="soft-half-right icon-category-text text-dark-tertiary" style={{verticalAlign: "middle"}} />
                              <h7 className="text-dark-tertiary" style={{verticalAlign: "middle"}}>Contribution Fund</h7>
                              {/*<h7 className="text-right float-right text-dark-tertiary"></h7>*/}
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
                    })()}


                  </SideBySide>
                </div>
              );
            })}

          </div>

        </div>
      </Left>
    </div>
);

export default Layout;
