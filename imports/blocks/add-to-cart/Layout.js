/* eslint-disable max-len */
import { Component, PropTypes } from "react";

import Forms from "../../components/forms";

import GiveNow from "../action-buttons";

import SubFund from "./Subfund";

export default class Layout extends Component {

  static propTypes = {
    accounts: PropTypes.array, // eslint-disable-line
    preFill: PropTypes.func,
    total: PropTypes.number,
    monentize: PropTypes.func,
    donate: PropTypes.bool,
  }

  state = {
    SubFundInstances: 1,
    instances: [
      // {
      //   id: Number,
      //   accountId: Number
      // }
    ],
  }

  update = (key, value, amount) => {
    const getInstance = () => {
      const instance = this.state.instances.filter(x => (x.id === key));

      return instance && instance[0];
    };

    const instance = getInstance();
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
      if (this.props.accounts.length === this.state.SubFundInstances) return;
      this.setState({
        SubFundInstances: this.state.SubFundInstances + 1,
        instances: [...this.state.instances, ...[
          { id: key, accountId: Number(value), amount },
        ]],
      });
    }
  }

  remove = (key) => {
    let newInstances = this.state.instances.filter(x => (x.id !== key));

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

              const existingInstance = this.state.instances[key];
              if (existingInstance) {
                selectVal = existingInstance.accountId;
                inputVal = existingInstance.amount;
              }

              const instanceAccounts = this.state.instances.map(x => (x.accountId));

              const copiedAccounts = [...accounts].filter((x) => {
                const alreadySelectedByThisInstance =
                  this.state.instances.filter(y => (y.id === key));

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
            <GiveNow
              disabled={total <= 0}
            />
          </div>

        </Forms.Form>
      </div>
    );
  }
}
