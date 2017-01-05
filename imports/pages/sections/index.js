import Sections from "../../components/shared/sections";
import Meta from "../../components/shared/meta";

const Template = () => (
  <div className="background--light-secondary">
    <Meta title="Sections" />
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

export {
  Template,
};
