// @flow
import { monetize } from "../../../../../util/format";
import Currency from "../../../../@primitives/typography/currency";

type IListItem = {
  transaction: Object,
};

const ListItem = ({
  transaction,
}: IListItem) => (
  <div className="soft-half-ends hard-sides">

    <div className="grid" style={{ verticalAlign: "middle" }}>

      <div className="grid__item one-half" style={{ verticalAlign: "middle" }}>
        <h5 className="text-dark-primary flush text-left">
          {transaction.label}
        </h5>
      </div>

      <div className="grid__item one-half text-right" style={{ verticalAlign: "middle" }}>
        <Currency
          amount={monetize(transaction.value)}
          baseHeadingSize="4"
          className="text-left display-inline-block"
        />
      </div>

    </div>
  </div>
);

export default ListItem;
