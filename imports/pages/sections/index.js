import Sections from "../../blocks/sections";
import Meta from "../../components/meta";

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
