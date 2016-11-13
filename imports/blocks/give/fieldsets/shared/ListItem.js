import { PropTypes } from "react";
import { monetize } from "./";

const ListItem = ({
  transaction,
}) => (
  <div className="soft-half-ends hard-sides">

    <div className="grid" style={{ verticalAlign: "middle" }}>

      <div className="grid__item two-thirds" style={{ verticalAlign: "middle" }}>
        <h5 className="text-dark-secondary flush text-left">
          {transaction.label}
        </h5>
      </div>

      <div className="grid__item one-third text-right" style={{ verticalAlign: "middle" }}>
        <h5 className="text-dark-secondary flush">
          {monetize(transaction.value)}
        </h5>
      </div>

    </div>
  </div>
);

ListItem.propTypes = {
  transaction: PropTypes.object,
};

export default ListItem;
