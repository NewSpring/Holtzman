// @flow
import { Component, PropTypes } from "react";
import { Link } from "react-router";
import moment from "moment";
import Filter from "./Filter";
import Currency from "./../../../components/currency";

import { Spinner } from "../../../components/loading";
import Meta from "../../../components/meta";

export function formatDate(date: string) {
  return moment(date).format("MMM D, YYYY");
}

export function monentize(value: string | number, fixed: boolean) {
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

type ITransactionDetail = {
  transactionDetail: Object,
  transaction: Object,
  icon: boolean,
  status?: string,
  failure?: boolean,
  person: Object,
};

export const TransactionDetail = ({
  transactionDetail,
  transaction,
  icon,
  status,
  failure,
  person,
}: ITransactionDetail) => (
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

        <Currency
          amount={transactionDetail.amount}
          baseHeadingSize="3"
          className="text-dark-tertiary text-right soft-right@handheld soft-double-right@lap-and-up"
        />
        {(() => {
          if (icon) {
            return (
              <span
                className="text-primary icon-arrow-next locked"
                style={{
                  right: "-5px",
                  top: "6px",
                }}
              />
            );
          }
          return null;
        })()}
      </div>

    </div>

  </div>
);

type ITransactionCard = {
  transactionDetail: Object,
  transaction: Object,
  person: Object,
};

export const TransactionCard = ({
  transactionDetail,
  transaction,
  person,
}: ITransactionCard) => {
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

export default class Layout extends Component {

  static propTypes = {
    transactions: PropTypes.array.isRequired,
    ready: PropTypes.bool,
    Loading: PropTypes.func.isRequired,
    done: PropTypes.bool,
    reloading: PropTypes.bool,
    family: PropTypes.array.isRequired,
    filterTransactions: PropTypes.func.isRequired,
  }

  monentize = monentize
  formatDate = formatDate

  render() {
    const {
      transactions,
      ready,
      Loading,
      done,
      reloading,
      filterTransactions,
    } = this.props;


    /* eslint-disable max-len */
    return (

      <div>
        <Meta title="Giving History" />
        <Filter
          family={this.props.family}
          filterTransactions={filterTransactions}
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


      </div>
    );
    /* eslint-enable max-len */
  }
}
