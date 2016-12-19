
// @flow
import { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { css, StyleSheet } from "aphrodite";

import Toggle from "../../../components/controls/toggle";

import Content from "./Content";
import Scripture from "./ScriptureWrapper";

type ISliderProps = {
  studyEntry: Object,
  toggleColor: string,
  isLight: boolean,
  onTransitionEnd: Function,
}

type ISliderState = {
  index: number;
}

const TOGGLES = ["Devotional", "Scripture"];

export default class Slider extends Component {

  props: ISliderProps;
  state: ISliderState;

  state = { index: 0, reflow: false };

  handleChangeTabs = (index: number) => this.setState({ index })
  handleChangeIndex = (index: number) => this.setState({ index })

  onLinkClick = (e) => {
    e.preventDefault();
    this.handleChangeTabs(1);
  }

  render() {
    const { index } = this.state;
    const { isLight, toggleColor } = this.props;

    // XXX is this a perf killer?
    const styles = StyleSheet.create({
      arrow: {
        ":after": { borderTopColor: `#${toggleColor}` },
      },
    });

    return (
      <div>
        <div className="one-whole">
          <Toggle
            items={TOGGLES}
            state={index}
            toggle={this.handleChangeIndex}
            style={{
              borderWidth: "1px",
              backgroundColor: `#${toggleColor}`,
            }}
            toggleClass={isLight ? "text-dark-secondary" : "text-light-secondary"}
            activeClass={isLight ? "text-dark-primary" : "text-light-primary"}
            arrowClass={css(styles.arrow)}
          />
        </div>
        <SwipeableViews
          onTransitionEnd={() => this.setState({ reflow: true })}
          index={index}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
        >
          <div className="one-whole">
            <Content studyEntry={this.props.studyEntry} onClickLink={this.onLinkClick} />
          </div>
          <div className="one-whole">
            <Scripture studyEntry={this.props.studyEntry} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
