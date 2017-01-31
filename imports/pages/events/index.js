// @flow
import Entry from "./Entry";

const Event = () => <Entry />;

const Routes = [
  { path: "events/:id", component: Entry },
];

export default {
  Event,
  Routes,
};
