/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import styled from "styled-components";

import Readme from "./progress-bar.md";

const Wrapper = styled.div`
  background-color: #6bac43;
  color: white;
  height: 500px;
  padding: 8px;
`;
const Title = styled.h6`
  display: inline-block;
`;
const Total = styled.h5`
  display: inline-block;
`;
const Progress = styled.div`
  &:after {
    background-color: #1c683e;
  }
`;
const ProgressItem = styled.div`
  width: 50%;
  height: 100%;
  background-color: #ffffff;
`;

const ProgressBar = () => {
  return (
    <Wrapper>
      <div className="floating floating--left one-half" style={{display:"inline-block"}}>
        <Title className="floating--item">Fund Title</Title>
      </div>
      <div className="floating floating--right one-half" style={{display:"inline-block"}}>
        <Total>$1000</Total>
      </div>
      <Progress className="progress">
        <ProgressItem className="" />
      </Progress>
    </Wrapper>
  );
};

const story = storiesOf("ProgressBar", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Dark", withReadme(
    Readme,
    () => (
      <ProgressBar />
    )
  ));
