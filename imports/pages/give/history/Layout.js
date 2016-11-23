
import { Component, PropTypes } from "react";
import { Link } from "react-router";
import moment from "moment";
import Filter from "./Filter";

import { Spinner } from "../../../components/loading";
import Split, { Left, Right } from "../../../blocks/split";
import Meta from "../../../components/meta";

export function formatDate(date) {
  return moment(date).format("MMM D, YYYY");
}

export function monentize(value, fixed) {
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

export const TransactionDetail = ({
  transactionDetail,
  transaction,
  icon,
  status,
  failure,
  person,
}) => (
  <div className="grid" style={{ verticalAlign: "middle" }}>
    <div className="grid__item three-fifths" style={{ verticalAlign: "middle" }}>
      <div className="relative">
        <div
          className="background--fill soft visuallyhidden@palm float-left round push-half-top"
          style={{ backgroundImage: `url("${person.photo}")` }}
        />
        <div className="soft-double-left@palm-wide-and-up push-left@palm-wide-and-up">
          <h5
            className="text-dark-secondary flush"
            style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {transactionDetail.account.name}
          </h5>
          <h6 className="text-dark-tertiary soft-half-bottom flush">
            {person.firstName} {person.lastName}
          </h6>
          <p className={`flush italic small ${failure ? "text-alert" : "text-dark-tertiary"}`}>
            {status ? `${status} - ` : ""}{formatDate(transaction.date)}
          </p>
        </div>
      </div>

    </div>

    <div className="grid__item two-fifths text-right" style={{ verticalAlign: "middle" }}>
      <div className="soft-half-right">

        <h4
          className={
            "text-dark-tertiary one-whole flush " +
            "soft-right@handheld soft-double-right@lap-and-up"
          }
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {monentize(transactionDetail.amount)}
          {(() => {
            if (icon) {
              return (
                <span
                  className="text-primary icon-arrow-next locked"
                  style={{
                    right: "-5px",
                    top: "1px",
                  }}
                />
              );
            }
            return null;
          })()}

        </h4>


      </div>

    </div>

  </div>
);

TransactionDetail.propTypes = {
  transactionDetail: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  icon: PropTypes.bool.isRequired,
  status: PropTypes.string,
  failure: PropTypes.bool,
  person: PropTypes.object.isRequired,
};

export const TransactionCard = ({ transactionDetail, transaction, person }) => {
  const { status } = transaction;

  /*

    turn on a couple pendings for UI testing

  */
  if (status && status.toLowerCase().indexOf("pending") > -1) {
    return (
      <div
        className="soft card"
        style={{
          borderStyle: "solid",
          borderColor: "f1f1f1",
          boxShadow: "none",
          borderWidth: "2px",
          backgroundColor: "transparent",
        }}
      >
        <TransactionDetail
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={false}
          status="Pending"
          person={person}
        />
      </div>
    );
  }

  /* eslint-disable max-len */
  if (status && status.toLowerCase().indexOf("failed") > -1) {
    return (
      <div
        className="soft card"
      >
        <TransactionDetail
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={false}
          status="Failed to Process"
          failure
          person={person}
        />
        <p className="flush-bottom soft-top" style={{ lineHeight: ".9" }}><small><em>
          For more information about why this contribution failed to process, please contact our Finance Team at <a href="tel:864-965-9990">864-965-9990</a> or <a rel="noopener noreferrer" target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us</a>
        </em></small></p>
      </div>
    );
  }
  /* eslint-enable max-len */
  return (
    <div className="soft card">
      <Link to={`/give/history/${transaction.id}`}>
        <TransactionDetail
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon
          person={person}
        />
      </Link>
    </div>
  );
};

TransactionCard.propTypes = {
  transactionDetail: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
};

export default class Layout extends Component {

  static propTypes = {
    transactions: PropTypes.array.isRequired,
    ready: PropTypes.bool,
    Loading: PropTypes.func.isRequired,
    done: PropTypes.bool,
    changeFamily: PropTypes.func.isRequired,
    changeDates: PropTypes.func.isRequired,
    reloading: PropTypes.bool,
    family: PropTypes.array.isRequired,
  }

  monentize = monentize
  formatDate = formatDate

  render() {
    const {
      transactions,
      ready,
      Loading,
      done,
      changeFamily,
      changeDates,
      reloading,
    } = this.props;


    /* eslint-disable max-len */
    return (

      <div>
        <Split nav classes={["background--light-primary"]}>

          <Meta title="Giving History" />

          <Right
            background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg"
            mobile={false}
          />


        </Split>
        <Left scroll ref="container" classes={["background--light-secondary"]}>


          <div
            className="soft-double-sides@lap-and-up soft-ends@lap-and-up background--light-primary"
          >
            <div className="soft soft-double-ends hard-left@lap-and-up">
              <h2 className="flush hard">Giving History</h2>
            </div>
          </div>

          <Filter
            family={this.props.family}
            changeFamily={changeFamily}
            changeDates={changeDates}
          />
          <div
            className={
              "soft-half soft@portable soft-double@anchored " +
              "soft-double-bottom@anchored soft-bottom@portable"
            }
            ref="history"
          >
            {(() => {
              if (reloading || (!transactions.length && !ready)) {
                // loading
                return (
                  <div className="text-center soft">
                    <Spinner styles={{ width: "40px", height: "40px" }} />
                  </div>

                );
              } else if (!transactions.length && ready) {
                return (
                  <div className="text-left soft-ends soft-half-sides">
                    <p>
                      We didn&#39;t find any contributions associated with your account. If you would like to start giving, click <Link to="/give/now">here</Link>
                    </p>
                    <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or <a rel="noopener noreferrer" target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.</em></p>
                  </div>
                );
              }

              let lastYear = null;
              return (
                <div>
                  {transactions.map((transaction, key) => {
                    const { details, person } = transaction;
                    return (
                      <div key={key}>
                        {details.map((transactionDetail, i) => {
                          if (!transactionDetail.account) return null;

                          if (Number(transactionDetail.amount) === 0) return null;

                          const year = moment(transaction.date).year();
                          if (year !== lastYear) {
                            lastYear = year;
                            return (
                              <div key={i}>
                                <div className="soft soft-half-left text-left">
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
                              person={person}
                              key={i}
                            />
                          );
                        })}
                      </div>

                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Load more */}
          <div className="one-whole text-center">
            {(() => {
              if (!ready && !transactions.length) return null;
              if (!transactions.length && ready) return null;
              if (reloading) return null;

              if (done) return <p><small><em>No More Contributions</em></small></p>;
              return <Loading />;
            })()}
          </div>


        </Left>
      </div>
    );
    /* eslint-enable max-len */
  }
}
