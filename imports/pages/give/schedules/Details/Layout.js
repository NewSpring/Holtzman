/* eslint-disable react/no-danger */
// @flow
import moment from "moment";
import { Link } from "react-router";

import Split, { Left, Right } from "../../../../components/@primitives/layout/split";
import { Spinner } from "../../../../components/@primitives/UI/loading";
import Currency from "../../../../components/@primitives/typography/currency";
import SideBySide from "../../../../components/@primitives/UI/cards/SideBySideCard";
import Meta from "../../../../components/shared/meta";
import SmallButton from "../../../../components/@primitives/UI/buttons/SmallButton";

import AccountType from "../../../../components/giving/account-type";
import { TransactionList } from "../../history/Layout";


type ILayout = {
  schedule?: Object,
  stop: Function,
  active: boolean,
  complete: boolean,
  ready: boolean,
  entries: [Object],
  loadingEntries: boolean,
}

const capitalizeFirstLetter = string => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

/* eslint-disable max-len */
export default ({
  schedule,
  stop,
  active,
  complete,
  ready,
  entries,
  loadingEntries,
}: ILayout) => (
  <div>
    <Split nav classes={["background--light-primary"]}>
      <Meta title="Giving Schedule" />
      <Right
        background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg"
        mobile={false}
      />
    </Split>
    <Left scroll classes={["background--light-secondary"]}>
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
          <div className="soft-double-ends">
            {(!schedule || !ready) && (
              <div className="text-center soft">
                <Spinner styles={{ width: "40px", height: "40px" }} />
              </div>
            )}

            {schedule && (
              <div className="text-center">
                {/*
                <p className="push-half-bottom">
                  <em>Started on {formatDate(schedule.start)}</em>
                </p>
                */}
                <Currency
                  amount={schedule.details.reduce((i, { amount }) => i + amount, 0).toFixed(2)}
                  baseHeadingSize="1"
                  className="flush-bottom soft-half-bottom text-center display-inline-block"
                />

                <h4 className="text-dark-primary flush-bottom">
                  {capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
                </h4>


                {schedule.payment && schedule.payment.accountNumber && (
                  <h4 className="text-dark-primary soft-half-top">
                    {schedule.payment.accountNumber.slice(-4)} {"  "}

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
              </div>
            )}

          </div>
          <hr
            className="hard push-bottom outlined--light outlined--bottom"
            style={{ borderColor: "#ddd" }}
          />

          {schedule && (
            <div className="soft-top">
              {schedule.details.map(({ amount, account: { name } }, i) => (
                <div className="floating one-whole display-inline-block" key={i}>
                  <div className="floating__item float-left">
                    <h4 className="hard text-dark-primary">{name}</h4>
                  </div>
                  <div className="floating__item float-right">
                    <Currency
                      baseHeadingSize="4"
                      amount={amount}
                      className="text-right text-dark-secondary"
                    />
                  </div>
                </div>
              ))}
              <p className="flush soft-top">
                <span
                  className="h7 text-dark-tertiary push-half-right"
                  style={{ verticalAlign: "middle" }}
                >
                  Start Date:
                </span>
                <em className="text-dark-primary">
                  {moment.utc(schedule.start).format("MMM D, YYYY")}
                </em>
              </p>

              {schedule.transactions.length > 0 && (
                <p className="flush">
                  <span
                    className="h7 text-dark-tertiary push-half-right"
                    style={{ verticalAlign: "middle" }}
                  >
                    Latest Contribution:
                  </span>
                  <em className="text-dark-primary">
                    {moment(schedule.transactions[0].date).format("MMM D, YYYY")}
                  </em>
                </p>
              )}
              <div className="one-whole soft-double-top text-center">
                {complete && (
                  <SmallButton text={"Schedule Completed"} disabled />
                )}

                {!complete && active && (
                  <SmallButton
                    className="text-alert"
                    onClick={stop}
                    text={"Stop Contribution"}
                  />
                )}

                {!complete && !active && (
                  <SmallButton text={"Contribution Stopped"} disabled />
                )}
              </div>
              <div>
                <p className="soft-double-top soft-half-sides text-left@handheld text-center">
                  <small><em>To change details about a schedule, please cancel the current one and create a new schedule with the desired information. We are sorry for any inconvenience this may cause and are working to provide the ability to edit contribution schedules in the future.</em></small>
                </p>
              </div>
            </div>
        )}
        </div>
      </div>


      <div className="soft-half soft-sides@portable soft-double-sides@anchored">
        {schedule && !schedule.transactions.length && ready && (
          <div className="text-left soft-double-top soft-half-sides">
            <p>
              We didn&#39;t find any contributions associated with this schedule.
            </p>
            <p><em>
              If you have any questions, please call our Finance Team at 864-965-9990 or {" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
              >
                contact us
              </a>
              {" "} and someone will be happy to assist you.
            </em></p>
          </div>
        )}

        {schedule && schedule.transactions && (
          <TransactionList transactions={schedule.transactions} />
        )}

        <hr className="push-double-top flush-bottom" />
        <h4 className="soft soft-double-ends text-center@lap-and-up flush-bottom">
          Recent Articles About Giving
        </h4>

        {loadingEntries && (
          <div className="one-whole soft text-center"><Spinner /></div>
        )}
        {!loadingEntries && (
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
                  {process.env.WEB && (
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
                  )}
                  {process.env.NATIVE && (
                    <Link
                      to={`/articles/${entry.entryId}`}
                      className={
                        "h6 btn--small btn--dark-tertiary " +
                        "soft-sides@portable one-whole@handheld"
                      }
                    >
                      Read more
                    </Link>
                  )}
                </SideBySide>
              </div>
            ))}
          </div>
        )};
      </div>
    </Left>
  </div>
);
/* eslint-enable react/no-danger */
