
// @flow

import { Link } from "react-router";

import styled from "styled-components";

const defaultStyles = `
  padding: 5px 15px 4px;
  font-weight: normal;
  font-size: .75em;
  border-radius: 50px;
  border: 2px solid #858585;
  color: #858585;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #505050;
    border-color: #505050;
  }
`;

const disabledStyles = `
  color: #dddddd;
  border-color: #dddddd;
  &:hover {
    color: #dddddd;
    border-color: #dddddd;
  }
`;

const SmallButtonWrapper = styled.button`${defaultStyles}`;
const StyledLink = styled(Link)`${defaultStyles}`;

type ISmallButton = {
  linkUrl?: String,
  onClick?: Function,
  disabled?: Boolean,
  text: String,
  className?: String,
  style?: Object,
};

const SmallButton = (props: ISmallButton) => {
  let ButtonWrapper;

  // if there's a url, we need a react-router Link component
  props.linkUrl ? (ButtonWrapper = StyledLink) : (ButtonWrapper = SmallButtonWrapper);

  // create a disabled style for the component chosen
  const DisabledButtonWrapper = styled(ButtonWrapper)`${disabledStyles}`;

  if (props.disabled) {
    return (
      <DisabledButtonWrapper
        className={props.className || ""}
        style={props.style || {}}
      >
        {props.text || "See All"}
      </DisabledButtonWrapper>
    );
  } else {
    return (
      <ButtonWrapper
        className={props.className || ""}
        onClick={props.onClick}
        style={props.style || {}}
        to={props.linkUrl || "yo"}
      >
        {props.text || "See All"}
      </ButtonWrapper>
    );
  }
};

export default SmallButton;
