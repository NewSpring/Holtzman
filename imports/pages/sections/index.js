import Sections from "../../blocks/sections";

const Template = () => (
  <div className="background--light-secondary">
    <Sections />
  </div>
);

const Routes = [
  {
    path: "/sections",
    component: Template,
  },
];

export default {
  Routes,
};
