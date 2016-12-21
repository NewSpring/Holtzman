
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
  flush: boolean,
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

  onLinkClick = (e: Event) => {
    e.preventDefault();
    this.handleChangeTabs(1);
  }

  render() {
    const { index } = this.state;
    const { isLight, toggleColor, flush } = this.props;

    // XXX is this a perf killer?
    const styles = StyleSheet.create({
      arrow: {
        ":after": { borderTopColor: `#${toggleColor}` },
        ":before": { borderTop: "none" },
      },
      toggle: {
        color: isLight ? "#505050" : "#f7f7f7",
        ":hover": { color: isLight ? "#505050 !important" : "#f7f7f7 !important" },
      },
      active: {
        color: isLight ? "#303030" : "#ffffff",
        ":hover": { color: isLight ? "#303030 !important" : "#ffffff !important" },
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
              borderWidth: "0px",
              backgroundColor: `#${toggleColor}`,
              zIndex: 100,
            }}
            toggleClass={css(styles.toggle)}
            activeClass={css(styles.active)}
            arrowClass={css(styles.arrow)}
            flush={flush}
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
