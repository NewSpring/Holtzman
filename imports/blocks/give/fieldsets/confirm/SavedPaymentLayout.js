
// @flow

import SavedAccount from "../shared/SavedAccount";

type IHeader = {
  override?: React$Element<any>,
};

const Header = ({ override }: IHeader) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Review
    </h4>
  );
};

type ISavedPaymentLayout = {
  data: Object,
  header: any,
  children: any,
};

export default ({ data, header, children }: ISavedPaymentLayout) => {
  return (
    <div>
      <div className="push-double@lap-and-up push">
        <Header override={header} />
      </div>

      {children}

      <div className="soft-sides">



        <button className="btn one-whole push-double-top soft-sides push-half-bottom" onClick={() => {}}>
          Save New Account
        </button>

        <button className="btn--small btn--dark-tertiary one-whole soft-sides push-half-ends" onClick={() => {}}>
          Enter New Payment
        </button>
      </div>
    </div>
  );
};
