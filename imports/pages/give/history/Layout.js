// @flow
import { Link } from "react-router";
import moment from "moment";
import Filter from "./Filter";
import TransactionCard from "../../../components/cards/TransactionDetail";

import { Spinner } from "../../../components/loading";
import Meta from "../../../components/meta";

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
            {details.filter((x) => (x.account && Number(x.account) !== 0)).map((detail, i) => {
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
};

export default ({
  transactions,
  ready,
  Loading,
  done,
  reloading,
  filterTransactions,
  family,
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

      {!transactions.length && ready && !reloading && (
        <div className="text-left soft-ends soft-half-sides">
          <p>
            We didn&#39;t find any contributions associated with your account.
            If you would like to start giving, click <Link to="/give/now">here</Link>
          </p>
          <p><em>If you have any questions, please call our Finance Team at 864-965-9990 or
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
          >
            contact us
          </a> and someone will be happy to assist you.</em></p>
        </div>
      )}

      <TransactionList transactions={transactions} />
    </div>

    {/* Load more */}
    <div className="one-whole text-center">
      {ready && transactions.length && !reloading && done && (
        <p><small><em>No More Contributions</em></small></p>
      )}
      {ready && transactions.length && !reloading && !done && <Loading />}
    </div>
  </div>
);
