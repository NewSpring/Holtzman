// @flow
import React from "react";
import Meta from "../../components/shared/meta";
import Finances from "./finances";
import NextSteps from "./next-steps";

type ITemplate = {
  children: React$Element<any>,
}

const Template = ({
  children,
}:ITemplate) => (
  <div>
    <Meta title="Annual Report" />
    <h1>HELLO FROM THE ANNUAL REPORT</h1>
    {children}
  </div>
);

const Routes = [
  {
    path: "celebrate",
    component: Template,
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/celebrate/finances") },
    childRoutes: [
      ...Finances.Routes,
      ...NextSteps.Routes,
    ],
  },
];

export default {
  Template,
  Routes,
};
