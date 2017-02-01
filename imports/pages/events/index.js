// @flow
import Entry from "./Entry";

const Event = () => <div><p>This is an event</p></div>;

const Routes = [
  { path: "events/:id", component: Entry },
];

export default {
  Event,
  Routes,
};
