// @flow
import { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import modal from "../../../data/store/modal";

import AccountType from "../../../components/giving/account-type";
import Forms from "../../../components/@primitives/UI/forms";
import SavedPaymentCard from "../../../components/giving/cards/SavedPaymentCard";

import Loading from "./components/Loading";
import Success from "./components/Success";

export const REMOVE_PAYMENT_MUTATION = gql`
  mutation RemoveSavedPayment($id: Int!) {
    payment: cancelSavedPayment(entityId: $id) {
      error
      code
      success
    }
  }
`;

export const updateQuery = (id: string, name: ?string) => (
  prev: Object,
  { mutationResult }: Object,
) => {
  const { error } = mutationResult.data.payment;
  if (error) return prev;
  let index;
  prev.savedPayments.forEach((payment, i) => {
    if (payment.id === id) index = i;
  });

  if (!name) prev.savedPayments.splice(index, 1);
  // eslint-disable-next-line
  if (name) prev.savedPayments[index].name = name;
  return prev;
};

export const withPaymentRemove = graphql(REMOVE_PAYMENT_MUTATION, {
  props: ({ mutate }) => ({
    remove: id => mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        payment: {
          error: null,
          code: null,
          success: true,
          __typename: "SavePaymentMutationResponse",
        },
      },
      updateQueries: {
        GivingDashboard: updateQuery(id),
        GetSavedPaymentAccounts: updateQuery(id),
      },
    }),
  }),
});

export const EDIT_PAYMENT_MUTATION = gql`
  mutation UpdateSavedPayment($id: Int, $name: String!) {
    payment: updateSavedPayment(entityId: $id, name: $name) {
      error
      code
      success
      savedPayment { name }
    }
  }
`;

export const withPaymentUpdate = graphql(EDIT_PAYMENT_MUTATION, {
  props: ({ mutate }) => ({
    save: (id, name) => mutate({
      variables: { id, name },
      optimisticResponse: {
        __typename: "Mutation",
        payment: {
          error: null,
          code: null,
          success: true,
          payment: {
            __typename: "SavedPayment",
            name,
          },
          __typename: "SavePaymentMutationResponse",
        },
      },
      updateQueries: {
        GivingDashboard: updateQuery(id, name),
        GetSavedPaymentAccounts: updateQuery(id, name),
      },
    }),
  }),
});

type IWithPaymentRemove = {
  payment: Object,
  remove: Function,
  save: Function,
  dispatch: Function,
};

export class EditWithOutMutations extends Component {

  props: IWithPaymentRemove;

  state = { name: "", loading: false, success: false, action: "" }

  componentWillMount() {
    this.setState({ name: this.props.payment.name });
  }

  changeName = (name: string) => this.setState({ name })

  save = () => {
    this.setState({ loading: true, action: "update" });
    this.props.save(this.props.payment.id, this.state.name)
      .then(() => {
        this.setState({ loading: false, success: true, action: "update" });
      });
  }

  remove = () => {
    this.setState({ loading: true, action: "remove" });
    this.props.remove(this.props.payment.id)
      .then(() => {
        this.setState({ loading: false, success: true, action: "remove" });
      });
  }

  render() {
    const { payment, dispatch } = this.props;

    if (this.state.loading) return <Loading type={this.state.action} />;
    if (this.state.success) {
      return (
        <Success
          type={this.state.action}
          onClick={() => dispatch(modal.hide())}
        />
      );
    }

    return (
      <div className="soft">
        <div className="one-whole text-center soft-ends">
          <h4 className="text-dark-primary flush-bottom soft-bottom">Edit Account</h4>
          <div style={{ verticalAlign: "middle" }}>
            <h6
              className="text-dark-tertiary flush soft-half-right display-inline-block"
              style={{ verticalAlign: "middle" }}
            >
              {payment.payment.accountNumber.slice(-4)}
            </h6>
            <div className="display-inline-block" style={{ verticalAlign: "top" }}>
              <AccountType
                width="30px"
                height="20px"
                type={payment.payment.paymentType}
              />
            </div>
          </div>
        </div>
        <div className="push-double-top">
          <Forms.Input
            type="input"
            label="Saved Account Name"
            defaultValue={this.state.name}
            onChange={this.changeName}
          />
          <button
            className="btn one-whole push-half-ends"
            onClick={this.save}
          >
            Save Changes
          </button>
          <button
            className="btn--alert one-whole push-half-ends"
            onClick={this.remove}
          >
            Delete Account
          </button>
        </div>
      </div>
    );
  }
}

const Edit = withPaymentUpdate(withPaymentRemove(EditWithOutMutations));

export default connect()(({ payment, dispatch }) => (
  <SavedPaymentCard
    classes={"grid__item one-whole one-half@anchored"}
    key={`${payment.id}_${payment.name}`}
    payment={payment}
    onClick={() => dispatch(modal.render(Edit, { payment, dispatch }))}
  />
));

