import { PropTypes } from "react";

import Meta from "../../../../components/meta";
import Loading from "../../../../components/loading";

import Back from "../Back";

import SavedPayment from "./SavedPayment";

const styles = {
  overflow: "visible",
  zIndex: 1,
};

const Layout = ({ details, remove, loading }) => (
  <div
    className={
      "background--light-primary text-center soft-double-top " +
      "push-double-bottom push-top push-double-top@lap-and-up soft-double-sides@palm-wide"
    }
    style={styles}
  >
    <Meta title="Saved Payments" />
    <Back />
    <div className="one-whole two-thirds@anchored display-inline-block push-double-top">
      <h3>Saved Accounts</h3>
      <div className="soft-sides soft-double-sides@lap-and-up text-center">
        {loading && <Loading />}
        {!loading && details && details.map((account, key) => (
          <SavedPayment account={account} remove={remove} key={key} />
        ))}
        <p className="soft-ends text-left">
          To add a saved account, click the option to save account on your next gift!
        </p>
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  details: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Layout;
