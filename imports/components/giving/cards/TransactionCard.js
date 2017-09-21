
// @flow
import moment from "moment";
import { Link } from "react-router";

import Currency from "../../@primitives/typography/currency";

type IDetailCard = {
  transactionDetail: Object,
  transaction: Object,
  icon: boolean,
  status?: string,
  failure?: boolean,
  person?: Object,
};

export const DetailCard = ({
  transactionDetail,
  transaction,
  icon,
  status,
  failure,
  person,
}: IDetailCard) => (
  <div className="grid" style={{ verticalAlign: "middle" }}>
    <div className="grid__item one-half" style={{ verticalAlign: "middle" }}>
      <div className="relative">

        {/* person photo */}
        {person && (
          <div
            className="background--fill soft visuallyhidden@palm float-left round push-half-top"
            style={{ backgroundImage: `url("${person.photo}")` }}
          />
        )}

        <div className="soft-double-left@palm-wide-and-up push-left@palm-wide-and-up">

          {/* account name */}
          <h5
            className="text-dark-secondary flush"
            style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {transactionDetail.account.name}
          </h5>

          {/* person details */}
          {person && (
            <h6 className="text-dark-tertiary soft-half-bottom flush">
              {person.nickName || person.firstName} {person.lastName}
            </h6>
          )}

          {/* status and date */}
          <p className={`flush italic small ${failure ? "text-alert" : "text-dark-tertiary"}`}>
            {status ? `${status} - ` : ""}{moment(transaction.date).format("MMM D, YYYY")}
          </p>
        </div>
      </div>

    </div>

    <div className="grid__item one-half text-right" style={{ verticalAlign: "middle" }}>
      <div>

        <Currency
          amount={transactionDetail.amount.toFixed(2)}
          baseHeadingSize="4"
          className={`
            text-dark-tertiary text-right
            soft-half-right@handheld soft-double-right@lap-and-up
          `}
        />

        {icon && (
          <span
            className="text-primary icon-arrow-next locked"
            style={{
              right: "-13px",
              top: "2px",
            }}
          />
        )}
      </div>
    </div>
  </div>
);

const PendingWrapper = ({ children }: { children?: React$Element<any> }) => (
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
    {children}
  </div>
);

const FailedWrapper = ({ children }: { children?: React$Element<any> }) => (
  <div className="soft card">
    {children}
    <p className="flush-bottom soft-top" style={{ lineHeight: ".9" }}><small><em>
      For more information about why this contribution failed to process,
      please contact our Finance Team at{" "}
      <a href="tel:864-965-9990">864-965-9990</a> or{" "}
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
      >
        contact us
      </a>
    </em></small></p>
  </div>
);

type IWrapper = {
  children?: React$Element<any>,
  transaction: Object,
}

const Wrapper = ({ children, transaction }: IWrapper) => (
  <div className="soft card">
    <Link to={`/give/history/${transaction.id}`}>
      {children}
    </Link>
  </div>
);

type ITransactionCard = {
  transactionDetail: Object,
  transaction: Object,
  person: Object,
};

export default ({
  transactionDetail,
  transaction,
  person,
}: ITransactionCard) => {
  const { status } = transaction;

  if (status && status.toLowerCase().indexOf("pending") > -1) {
    return (
      <PendingWrapper>
        <DetailCard
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={false}
          status="Pending"
          person={person}
        />
      </PendingWrapper>
    );
  }

  if (status && status.toLowerCase().indexOf("failed") > -1) {
    return (
      <FailedWrapper>
        <DetailCard
          transactionDetail={transactionDetail}
          transaction={transaction}
          icon={false}
          status="Failed to Process"
          failure
          person={person}
        />
      </FailedWrapper>
    );
  }

  return (
    <Wrapper transaction={transaction}>
      <DetailCard
        transactionDetail={transactionDetail}
        transaction={transaction}
        icon
        person={person}
      />
    </Wrapper>
  );
};
