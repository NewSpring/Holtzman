// @flow
import Single from "./Single";

const Event = () => <Single />;

const Routes = [
  { path: "events/:id", component: Single },
];

export default {
  Event,
  Routes,
};
