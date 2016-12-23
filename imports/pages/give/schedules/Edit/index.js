// @flow
import Layout from "./Layout";

const EditSchedule = () => (
  <Layout />
);

const Routes = [
  { path: "schedules/edit/:id",
    component: EditSchedule,
  },
];

export default {
  EditSchedule,
  Routes,
};
