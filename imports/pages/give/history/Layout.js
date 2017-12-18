// @flow
import { Link } from "react-router";
import moment from "moment";
import Filter from "./Filter";
import TransactionCard from "../../../components/giving/cards/TransactionCard";

import { Spinner } from "../../../components/@primitives/UI/loading";
import Meta from "../../../components/shared/meta";

type ITransactionList = {
  transactions?: [Object]
}

export const TransactionList = ({ transactions }: ITransactionList) => {
  let lastYear = null;
  return (
    <div>
      {transactions && transactions.map((transaction, key) => {
        const { details, person } = transaction;
        return (
          <div key={key}>
            {details.filter(x => (x.amount && Number(x.amount) !== 0)).map((detail, i) => {
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
                      transactionDetail={detail}
                      person={person}
                    />
                  </div>
                );
              }

              return (
                <TransactionCard
                  transaction={transaction}
                  transactionDetail={detail}
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
};

type ILayout = {
  transactions: [Object],
  ready: boolean,
  Loading: Function,
  done: boolean,
  reloading: boolean,
  family: [Object],
  filterTransactions: Function,
  onPrintClick: Function,
  printLoading: boolean,
};

let canPrint;
// eslint-disable-next-line
try { canPrint = !!new Blob; } catch (e) {}

export default ({
  transactions,
  ready,
  Loading,
  done,
  reloading,
  filterTransactions,
  family,
  onPrintClick,
  printLoading,
}: ILayout) => (
  <div>
    <Meta title="Giving History" />
    <Filter
      family={family}
      filterTransactions={filterTransactions}
    />
    <div
      className={
        "soft-half soft@portable soft-double@anchored " +
        "soft-double-bottom@anchored soft-bottom@portable"
      }
    >
      {(reloading || (!transactions.length && !ready)) && (
        <div className="text-center soft">
          <Spinner styles={{ width: "40px", height: "40px" }} />
        </div>
      )}

      {process.env.WEB && canPrint && transactions.length > 0 && (
        <div
          className="visuallyhidden@lap-and-up"
          style={{ cursor: "pointer" }}
          onClick={onPrintClick}
        >
          {!printLoading && (
            <div
              style={{ position: "absolute", right: "17px", marginTop: "13px" }}
            >
              <span className="icon-print" style={{ fontSize: "22px" }} />
            </div>
          )}

          {printLoading && (
            <div style={{ position: "absolute", right: "14px", marginTop: "13px" }}>
              <Spinner styles={{ width: "30px", height: "30px", borderWidth: "3px" }} />
            </div>
          )}
        </div>
      )}

      {!transactions.length && ready && !reloading && (
        <div className="text-left soft-ends soft-half-sides">
          <p>
            We didn&#39;t find any contributions associated with your account.
            If you would like to start giving, click <Link to="/give/now">here</Link>
          </p>
          <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
            >
              contact us
            </a> and someone will be happy to assist you.</em>
          </p>
        </div>
      )}

      <TransactionList transactions={transactions} />
    </div>

    {/* Load more */}
    <div className="one-whole text-center">
      {ready && transactions.length > 0 && !reloading && done && (
        <p><small><em>No More Contributions</em></small></p>
      )}
      {ready && transactions.length > 0 && !reloading && !done && <Loading />}
    </div>

    {/* Print Button */}
    {process.env.WEB && canPrint && transactions.length > 0 && (
      <div
        className="fixed visuallyhidden@handheld"
        style={{
          bottom: "175px",
          left: "58.33%",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        <div
          className="card"
          style={{ borderRadius: "50%", marginLeft: "2px" }}
          onClick={onPrintClick}
        >
          {!printLoading && (
            <div
              className="card__item background--light-secondary soft-half"
              style={{ padding: "15px 17px" }}
            >
              <span className="icon-print" style={{ fontSize: "28px" }} />
            </div>
          )}

          {printLoading && (
            <div
              style={{ padding: "12px 12px 9px 12px" }}
              className="card__item background--light-secondary"
            >
              <Spinner styles={{ width: "35px", height: "35px" }} />
            </div>
          )}
        </div>
      </div>
    )}

  </div>
);
