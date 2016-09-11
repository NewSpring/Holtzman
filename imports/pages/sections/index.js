import { Component, PropTypes } from "react";

import Sections from "../../blocks/sections";

const Template = () => {
  return (
    <div className="background--light-primary">
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
