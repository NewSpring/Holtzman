// @flow

import { Component } from "react";
import Tag from "../tags";

type ITagSelectProps = {
  items: Array<{
    label: ?string,
    value: string | number
  }>,
  onClick: ?Function,
  overrideActive?: boolean,
  currentActive?: string,
};

type ITagSelectState = {
  active: string | number,
};

export default class TagSelect extends Component {
  props: ITagSelectProps;
  state: ITagSelectState;

  state = {
    active: "",
  }

  componentWillMount = () => {
    if (this.props.currentActive !== "") {
      this.setState({ active: this.props.currentActive });
    }
  }

  handleTagClick = (value: any) => {
    if (value === this.state.active) {
      this.setState({ active: "" });
    } else {
      this.setState({ active: value });
    }

    if (this.props.onClick) this.props.onClick(value);
  }

  isActive = (value: string | number) => value === this.state.active

  canBeActive = (value: string | number) => {
    if (!this.state.active) return true;
    return this.isActive(value);
  }

  render() {
    const { items } = this.props;

    return (
      <div>
        {items.map(({ label, value }, key) => (
          <Tag
            key={key}
            label={label || value}
            val={value}
            onClick={this.handleTagClick}
            active={this.isActive(value)}
            className={this.props.overrideActive}
          />
        ))}
      </div>
    );
  }
}
