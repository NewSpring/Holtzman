/* eslint-disable react/no-danger */
import { Component, PropTypes } from "react";
import moment from "moment";
import { Link } from "react-router";

import Split, { Left, Right } from "../../../../blocks/split";
import { Spinner } from "../../../../components/loading";
import SideBySide from "../../../../components/cards/SideBySide";
import Meta from "../../../../components/meta";

import AccountType from "../../../../components/accountType";
import { TransactionCard } from "../../history/Layout";


export default class Layout extends Component {

  static propTypes = {
    schedule: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    stop: PropTypes.func.isRequired,
    active: PropTypes.bool,
    complete: PropTypes.bool,
    ready: PropTypes.bool,
    entries: PropTypes.array,
    loadingEntries: PropTypes.bool,
  }

  formatDate = (date) => (
    moment(new Date(date)).add(4, "hours").format("MMM D, YYYY")
  )

  monentize = (value, fixed) => {
    let strVal = typeof value === "number" ? `${value}` : value;

    if (!strVal.length) {
      return "$0.00";
    }

    strVal = strVal.replace(/[^\d.-]/g, "");

    const decimals = strVal.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      strVal = Number(strVal).toFixed(2);
      strVal = String(strVal);
    }

    strVal = strVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${strVal}`;
  }

  capitalizeFirstLetter = (string) => (
    string.charAt(0).toUpperCase() + string.slice(1)
  )

  render() {
    const {
      schedule,
      stop,
      active,
      complete,
      ready,
      entries,
      loadingEntries,
    } = this.props;

    /* eslint-disable max-len */
    return (

      <div>
        <Split nav classes={["background--light-primary"]}>
          <Meta title="Giving Schedule" />
          <Right
            background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
            mobile={false}
          />
        </Split>
        <Left scroll classes={["background--light-secondary"]} ref="container">
          <div
            className={
              "soft-double-sides@lap-and-up soft-double-ends@lap-and-up " +
              "soft background--light-primary"
            }
          >
            {process.env.WEB && (
              <Link
                to="/give/schedules"
                className={
                  "locked-top locked-left soft-double@lap-and-up " +
                  "soft h7 text-dark-secondary plain"
                }
              >
                <i
                  className="icon-arrow-back soft-half-right display-inline-block"
                  style={{ verticalAlign: "middle" }}
                />
                <span
                  className="display-inline-block"
                  style={{ verticalAlign: "middle", marginTop: "3px" }}
                >
                  Back
                </span>
              </Link>
            )}
            <div
              className={
                "text-left soft-double-top hard-left@lap-and-up " +
                "soft-half-bottom soft@anchored"
              }
            >
              <div className="soft-double-ends@anchored">
                {(() => {
                  if (!schedule || !ready) {
                    // loading
                    return (
                      <div className="text-center soft">
                        <Spinner styles={{ width: "40px", height: "40px" }} />
                      </div>
                    );
                  }

                  return (
                    <div className="text-center">
                      <p className="push-half-bottom">
                        <em>Started on {this.formatDate(schedule.start)}</em>
                      </p>

                      <h4 className="text-dark-secondary flush-bottom">
                        {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                      </h4>
                      <h3 className="text-primary">{schedule.details[0].account.name}</h3>

                      <h1 className="text-dark-primary flush-bottom soft-half-bottom">
                        {this.monentize(schedule.details[0].amount)}
                      </h1>


                      {schedule.payment && schedule.payment.accountNumber && (
                        <h4 className="text-dark-secondary soft-half-top">
                          {schedule.payment.accountNumber.slice(-4)}&nbsp;

                          {
                            schedule.payment.paymentType &&
                            schedule.payment.paymentType === "ACH" &&
                            <AccountType width="30px" height="20px" type="Bank" />
                          }
                          {
                            schedule.payment.paymentType &&
                            schedule.payment.paymentType !== "ACH" &&
                            (
                              <AccountType
                                width="30px"
                                height="20px"
                                type={schedule.payment.paymentType}
                              />
                            )
                          }
                        </h4>
                      )}
                      {complete && (
                        <h6 className="text-brand">
                          Schedule Completed
                        </h6>
                      )}
                      {!complete && active && (
                        <h6 className="text-alert" onClick={stop} style={{ cursor: "pointer" }}>
                          Stop Contribution
                        </h6>
                      )}

                      {!complete && !active && (
                        <h6 className="text-brand">
                            Contribution Stopped
                          </h6>
                      )}
                      <p
                        className={
                          "text-center soft-ends soft-double@anchored " +
                          "flush-bottom soft-ends soft-sides@portable"
                        }
                      >
                        Thank you so much for your contributions! It is because of your generosity that we are able to continue telling stories of the greatness of Jesus and seeing lives changed.
                      </p>
                    </div>
                  );
                })()}

              </div>
            </div>
          </div>


          <div className="soft-half soft-sides@portable soft-double-sides@anchored">

            {(() => {
              if (!schedule) return null;
              const { transactions } = schedule;
              if (!transactions.length && ready) {
                return (
                  <div className="text-left soft-double-top soft-half-sides">
                    <p>
                      We didn&#39;t find any contributions associated with this schedule.
                    </p>
                    <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or <a rel="noopener noreferrer" target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.</em></p>
                  </div>
                );
              }

              let lastYear = null;
              return (
                <div>
                  <h4 className="soft soft-double-ends text-center flush-bottom">
                    Contributions from this Schedule
                  </h4>
                  {transactions.map((transaction, key) => {
                    const { details, person } = transaction;
                    return (
                      <div key={key}>
                        {details.map((transactionDetail, i) => {
                          if (!transactionDetail.account) return null;

                          if (Number(transactionDetail.amount) <= 0) return null;

                          const year = moment(transaction.date).year();
                          if (year !== lastYear) {
                            lastYear = year;
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
                            );
                          }

                          return (
                            <TransactionCard
                              transaction={transaction}
                              transactionDetail={transactionDetail}
                              key={i}
                              person={person}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            <hr className="push-double-top flush-bottom" />
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
                        "grid__item one-whole push-half-bottom " +
                        "push-bottom@portable hard-bottom"
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
