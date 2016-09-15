import { Component, PropTypes } from "react";

import Sections from "../../blocks/sections";

const Template = () => {
  return (
    <div className="background--light-secondary">
      <Sections />
    </div>
  );
};

const Routes = [
  {
    path: "/sections",
    component: Template,
  },
];

export default {
  Routes,
};
