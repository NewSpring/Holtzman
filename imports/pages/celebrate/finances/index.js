// @flow
import Meta from "../../../components/shared/meta";

/* eslint-disable max-len */
const Finances = () => (
  <div>
    <Meta title="Finances" />
    {/* Header */}
    <div className="background--light-secondary outlined--top outlined--light">
      <h2>FINANCES</h2>
    </div>
  </div>
);

const Routes = [
  {
    path: "finances",
    component: Finances,
  },
];

export default {
  Finances,
  Routes,
};
