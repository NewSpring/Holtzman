import { Component, PropTypes } from "react";

import Sections from "apollos/core/blocks/sections";

const Template = () => {
  return (
    <div className="background--light-primary soft-double-bottom">
      <div className="soft-bottom">
        <Sections />
      </div>
    </div>
  );
}

const Routes = [
  {
    path: "/sections",
    component: Template,
  },
];

export default {
  Routes,
};
