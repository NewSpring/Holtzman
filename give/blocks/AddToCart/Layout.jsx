import { Component, PropTypes} from "react"

import { Forms } from "../../../core/components"

import GiveNow from "../ActionButtons"

import SubFund from "./Subfund"
import Styles from "./styles.css"


export default class Layout extends Component {

  state = {
    SubFundInstances: 1,
    instances: [
      // {
      //   id: Number,
      //   accountId: Number
      // }
    ]
  }

  update = (key, value, amount) => {

    const getInstance = (id) => {
      let instance = this.state.instances.filter((x) => {
        return x.id === key
      })

      return instance && instance[0]
    }

    let instance = getInstance()

    if (instance) {
      let current = [...this.state.instances]
      let updated = current.map((x) => {
        if (x.id === key) {
          return {
            id: key,
            accountId: Number(value),
            amount: amount
          }
        }

        return x
      })

      this.setState({
        SubFundInstances: updated.length + 1,
        instances: updated
      })

    } else {
      this.setState({
        SubFundInstances: this.state.SubFundInstances + 1,
        instances: [...this.state.instances, ...[
          { id: key, accountId: Number(value), amount: amount }
        ]]
      })
    }

  }

  remove = (key, value) => {
    let newInstances = this.state.instances.filter((x) => {
      return x.id != key
    })

    // if an instance is removed and that instance is not at the end
    if (this.state.instances.length > newInstances.length &&
        this.state.instances.length !== key + 1)
      {
        // currently no good way to reorder sub funds
        // so, force re-render and fill the data back in
        this.setState({ SubFundInstances: 1 });

        // remap ids
        newInstances = newInstances.map((newInstance, i) => {
          newInstance.id = i
          return newInstance
        });

        setTimeout(() => {
          this.setState({
            SubFundInstances: newInstances.length + 1,
            instances: newInstances
          })
        }, 100);
        return
    }

    this.setState({
      SubFundInstances: newInstances.length + 1,
      instances: newInstances
    })
  }

  render () {
    const {
      accounts,
      save,
      format,
      preFill,
      total,
      transactions,
      monentize,
      donate,
    } = this.props

    let accountsCount = []
    for (let i = 0; i < this.state.SubFundInstances; i++) {
      accountsCount.push(i)
    }

    // console.log(this.state.instances.length, accountsCount.length)

    return (
      <div className="push-top@handheld soft-half-top@lap-and-up">
        <Forms.Form
          classes={["text-left", "hard"]}
          submit={(e) => {e.preventDefault()}}
          id="add-to-cart"
        >

          <div className="display-inline-block">
            {accountsCount.map((key) => {

              // collect data for re-render on reorder
              let selectVal, inputVal;
              let existingInstance = this.state.instances[key];
              if (existingInstance) {
                selectVal = existingInstance.accountId;
                inputVal = existingInstance.amount;
              }

              let instanceAccounts = this.state.instances.map((x) => {
                return x.accountId
              })

              let copiedAccounts = [...accounts].filter((x) => {

                let alreadySelectedByThisInstance = this.state.instances.filter((y) => {
                  return y.id === key
                })

                if (alreadySelectedByThisInstance.length && Number(alreadySelectedByThisInstance[0].accountId) === x.value) {
                  return true
                }

                return instanceAccounts.indexOf(x.value) === -1
              })

              if (key === 0) {
                return (
                  <SubFund
                    accounts={copiedAccounts}
                    preFill={preFill}
                    primary={true}
                    key={key}
                    update={this.update}
                    remove={this.remove}
                    instance={key}
                    donate={donate}
                    selectVal={selectVal}
                    inputVal={inputVal}
                  />
                )
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
              )

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
    )
  }
}

// <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
//   I'd like to give
// </h3>
//
// <Forms.Input
//   id={primary.id}
//   name={primary.name}
//   type="tel"
//   hideLabel={true}
//   classes={["soft-bottom", "input--active", "display-inline-block"]}
//   inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
//   placeholder="$0.00"
//   validate={save}
//   format={format}
//   defaultValue={preFill(primary.id)}
//   style={{maxWidth: "150px"}}
// />
//
// <h3 className={`text-dark-tertiary display-inline-block push-half-bottom push-half-right`}>
//   to
// </h3>
//
// <Forms.Select
//   items={accounts}
//   name="select-account"
//   id={`primary_select`}
//   hideLabel={true}
//   classes={["soft-bottom", "display-inline-block"]}
//   inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
//   placeholder="select fund"
//   includeBlank={true}
// />

// {() => {
  // if ((accounts && accounts.length > 1) || !accounts.length) {
  //   if (primary.id) {
  //     delete transactions[primary.id]
  //   } else {
  //     delete transactions[-1]
  //   }
  //
  //   return (
  //     <div>
  //       <SubFund accounts={otherAccounts} preFill={preFill} />
  //       <div className="clearfix"></div>
  //     </div>
  //
  //   )
  // }
  //
  // return (
  //   <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
  //     {`to ${accounts[0].name}`}&nbsp;
  //   </h3>
  // )

// }()}
