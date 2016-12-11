// @flow
import { monetize } from "../../../../util/format";
import Currency from "../../../../components/currency";

type IListItem = {
  transaction: Object,
};

const ListItem = ({
  transaction,
}: IListItem) => (
  <div className="soft-half-ends hard-sides">

    <div className="grid" style={{ verticalAlign: "middle" }}>

      <div className="grid__item two-thirds" style={{ verticalAlign: "middle" }}>
        <h5 className="text-dark-primary flush text-left">
          {transaction.label}
        </h5>
      </div>

      <div className="grid__item one-third text-right" style={{ verticalAlign: "middle" }}>
        <Currency
          amount={monetize(transaction.value)}
          baseHeadingSize="4"
          className="display-inline-block"
        />
      </div>

    </div>
  </div>
);

export default ListItem;
