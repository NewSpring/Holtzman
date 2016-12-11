// @flow
import Layout from "./Layout";

const EditSavedPayment = () => (
  <Layout />
);

const Routes = [
  { path: "saved-payments/edit/:id",
    component: EditSavedPayment,
  },
];

export default {
  EditSavedPayment,
  Routes,
};
