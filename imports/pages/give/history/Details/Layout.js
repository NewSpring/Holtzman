/* eslint-disable react/no-danger */
import { Component, PropTypes } from "react";
import moment from "moment";
import { Link } from "react-router";

import Split, { Left, Right } from "../../../../components/@primitives/layout/split";

import { Spinner } from "../../../../components/@primitives/UI/loading";
import Currency from "../../../../components/@primitives/typography/currency";
import SideBySide from "../../../../components/@primitives/UI/cards/SideBySideCard";
import Meta from "../../../../components/shared/meta";
import AccountType from "../../../../components/giving/account-type";

export default class Layout extends Component {

  static propTypes = {
    loadingEntries: PropTypes.bool,
    entries: PropTypes.array,
    transaction: PropTypes.object,
  }

  formatDate = date => (
    moment(new Date(date)).format("MMM D, YYYY")
  )

  /* eslint-disable max-len */
  render() {
    const { loadingEntries, entries } = this.props;
    return (
      <div>
        <Split nav classes={["background--light-primary"]}>
          <Meta title="Giving History" />
          <Right
            background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
            mobile={false}
          />
        </Split>
        <Left scroll ref="container" classes={["background--light-secondary"]}>
          <div
            className={
              "soft-double-sides@lap-and-up soft-double-ends@lap-and-up " +
              "soft background--light-primary"
            }
          >
            {(() => {
              if (process.env.WEB) {
                return (
                  <Link
                    to="/give/history"
                    className={
                      "locked-left soft-double@lap-and-up " +
                      "soft h7 text-dark-secondary plain"
                    }
                  >
                    <i
                      className="icon-arrow-back soft-half-right display-inline-block"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span
                      className="display-inline-block"
                      style={{ verticalAlign: "middle", marginTop: "5px" }}
                    >
                      Back
                    </span>
                  </Link>
                );
              }
              return null;
            })()}
            <div
              className={
                "text-left soft-double-top hard-left@lap-and-up " +
                "soft-half-bottom soft@anchored"
              }
            >
              <div className="soft-double-ends@anchored">
                {(() => {
                  const { transaction } = this.props;
                  if (!transaction) {
                    // loading
                    return (
                      <div className="text-center soft">
                        <Spinner styles={{ width: "40px", height: "40px" }} />
                      </div>
                    );
                  }
                  const { account } = transaction.details[0];
                  const { person } = transaction;
                  return (
                    <div className="text-center">
                      <p className="push-half-bottom">
                        <em>{this.formatDate(transaction.date)}</em>
                      </p>
                      <h3 className="text-dark-secondary">{account.name}</h3>

                      <Currency
                        amount={transaction.details[0].amount.toFixed(2)}
                        baseHeadingSize="1"
                        className="display-inline-block text-center soft-bottom"
                      />

                      <h6 className="push-bottom text-dark-tertiary">
                        {person.nickName || person.firstName} {person.lastName}
                      </h6>

                      {(() => {
                        const detail = transaction.payment;
                        if (detail && detail.accountNumber) {
                          return (
                            <h4 className="text-dark-secondary">
                              {detail.accountNumber.slice(-4)}&nbsp;

                              {(() => {
                                if (detail.paymentType && detail.paymentType === "ACH") {
                                  return (
                                    <AccountType width="30px" height="20px" type="Bank" />
                                  );
                                } else if (detail.paymentType) {
                                  return (
                                    <AccountType
                                      width="30px"
                                      height="20px"
                                      type={detail.paymentType}
                                    />
                                  );
                                }
                                return null;
                              })()}

                            </h4>
                          );
                        }
                        return null;
                      })()}
                      <p
                        className={
                          "text-center soft-ends soft-double@anchored " +
                          "flush-bottom soft-ends soft-sides@portable"
                        }
                      >
                        Thank you for your contribution to NewSpring Church. Because you are obedient in giving, we&#39;ll be able to connect more people to Jesus and each other.
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
          <div className="soft-half soft-sides@portable soft-double-sides@anchored">

            <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
              Recent Articles About Giving
            </h4>
            {(() => {
              if (loadingEntries) {
                return <div className="one-whole soft text-center"><Spinner /></div>;
              }
              return (
                <div className="grid">
                  {entries && entries.map((entry, key) => (
                    <div
                      key={key}
                      className={
                        "grid__item one-whole push-half-bottom push-bottom@portable hard-bottom"
                      }
                    >
                      <SideBySide
                        classes={["push-bottom@lap-and-up"]}
                        images={entry.content.images}
                        defaultImage={entry.content.images[0].url}
                      >
                        <h4 className="push-half-top@portable push-top@anchored">
                          {entry.title}
                        </h4>

                        <p><small dangerouslySetInnerHTML={{ __html: entry.meta.summary }} /></p>
                        {(() => {
                          if (process.env.WEB) {
                            return (
                              <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://newspring.cc/articles/${entry.meta.urlTitle}`}
                                className={
                                  "h6 btn--small btn--dark-tertiary " +
                                  "soft-sides@portable one-whole@handheld"
                                }
                              >
                                Read more
                              </a>
                            );
                          }

                          if (process.env.NATIVE) {
                            return (
                              <Link
                                to={`/articles/${entry.entryId}`}
                                className={
                                  "h6 btn--small btn--dark-tertiary " +
                                  "soft-sides@portable one-whole@handheld"
                                }
                              >
                                Read more
                              </Link>
                            );
                          }

                          return null;
                        })()}


                      </SideBySide>
                    </div>
                  ))}
                </div>
              );
            })()}

          </div>
        </Left>
      </div>

    );
  }
  /* eslint-enable max-len */
}
