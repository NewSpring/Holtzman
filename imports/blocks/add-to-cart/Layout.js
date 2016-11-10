/* eslint-disable max-len */
import { Component, PropTypes } from "react";

import Forms from "../../components/forms";

import CheckoutButtons from "../checkout-buttons";

import SubFund from "./Subfund"; //eslint-disable-line

export default class Layout extends Component {

  static propTypes = {
    accounts: PropTypes.array, // eslint-disable-line
    preFill: PropTypes.func,
    total: PropTypes.number,
    monentize: PropTypes.func,
    donate: PropTypes.bool,
  }

  state = {
    SubFundInstances: 1, //number of subfunds to show
    instances: [
      // {
      //   id: Number,
      //   accountId: Number
      // }
    ],
  }

  // :boolean || undefined
  getInstance = () => {
    const instance = this.state.instances.filter((x) => (x.id === key));
    return instance && instance[0];
  }

  update = (key, value, amount) => {
    console.log("instances", this.state.instances);

    const instance = this.getInstance();
    console.log("test instance:", instance);
    // updates the array of accounts.
    if (instance) {
      const current = [...this.state.instances];
      const updated = current.map((x) => {
        if (x.id === key) {
          return {
            id: key,
            accountId: Number(value),
            amount,
          };
        }

        return x;
      });

      this.setState({
        SubFundInstances: updated.length + 1,
        instances: updated,
      });
    } else {
      console.log("accounts len:", this.props.accounts.length, "subFundInstances:", this.state.SubFundInstances);

      //cant have more sf instances than funds
      if (this.props.accounts.length === this.state.SubFundInstances) return;

      // less sf instances than funds, so add another instance
      // add the new fund
      this.setState({
        SubFundInstances: this.state.SubFundInstances + 1,
        instances: [...this.state.instances, ...[
          { id: key, accountId: Number(value), amount },
        ]],
      });

      console.log("accounts len:", this.props.accounts.length, "subFundInstances:", this.state.SubFundInstances);
    }
  }

  remove = (key) => {
    let newInstances = this.state.instances.filter((x) => (x.id !== key));

    // if an instance is removed and that instance is not at the end
    if (key !== 0 &&
      this.state.instances.length > newInstances.length &&
      this.state.instances.length !== key + 1) {
      // currently no good way to reorder sub funds
      // so, force re-render and fill the data back in
      this.setState({ SubFundInstances: 1 });

      // remap ids
      newInstances = newInstances.map((newInstance, i) => {
        const retInstance = newInstance;
        retInstance.id = i;
        return retInstance;
      });

      setTimeout(() => {
        this.setState({
          SubFundInstances: newInstances.length + 1,
          instances: newInstances,
        });
      }, 100);
      return;
    }

    this.setState({
      SubFundInstances: newInstances.length + 1,
      instances: newInstances,
    });
  }

  render() {
    const {
      accounts,
      preFill,
      total,
      monentize,
      donate,
    } = this.props;

    const accountsCount = [];
    for (let i = 0; i < this.state.SubFundInstances; i += 1) {
      accountsCount.push(i);
    }

    return (
      <div className="push-top@handheld soft-half-top@lap-and-up">
        <Forms.Form
          classes={["text-left", "hard"]}
          submit={(e) => { e.preventDefault(); }}
          id="add-to-cart"
        >

          <div className="display-inline-block">
            {accountsCount.map((key) => {
              // collect data for re-render on reorder
              let selectVal;
              let inputVal;

              // checks if account.key is in state.instances[]
              const existingInstance = this.state.instances[key];
              // if so, pull out the account id and $ value
              if (existingInstance) {
                selectVal = existingInstance.accountId;
                inputVal = existingInstance.amount;
              }

              // array of account ids in state.instances
              const instanceAccounts = this.state.instances.map((x) => (x.accountId));

              // array of
              const copiedAccounts = [...accounts].filter((x) => {
                const alreadySelectedByThisInstance =
                  this.state.instances.filter((y) => (y.id === key));

                if (alreadySelectedByThisInstance.length
                    && Number(alreadySelectedByThisInstance[0].accountId) === x.value) {
                  return true;
                }

                return instanceAccounts.indexOf(x.value) === -1;
              });
              if (key === 0) {
                return (
                  <SubFund
                    accounts={copiedAccounts}
                    preFill={preFill}
                    primary
                    key={key}
                    update={this.update}
                    remove={this.remove}
                    instance={key}
                    donate={donate}
                    selectVal={selectVal}
                    inputVal={inputVal}
                  />
                );
              }
              return (
                <SubFund
                  accounts={copiedAccounts}
                  preFill={preFill}
                  key={key}
                  update={this.update}
                  remove={this.remove}
                  instance={key}
                  selectVal={selectVal}
                  inputVal={inputVal}
                />
              );
            })}
            <h3 className="display-inline-block text-dark-tertiary push-half-bottom push-half-right">so my total is</h3>
            <h3 className="display-inline-block text-brand push-half-bottom">{monentize(total, true)}</h3>
          </div>

          <div className="push-top">
            <CheckoutButtons
              disabled={total <= 0}
            />
          </div>

        </Forms.Form>
      </div>
    );
  }
}
