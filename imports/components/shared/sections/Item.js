import { Component, PropTypes } from "react";
import { Link } from "react-router";

import { VelocityTransitionGroup } from "velocity-react";

import { ImageLoader } from "../../@primitives/UI/loading";

export const ExternalLinkWrapper = props => {
  let url = props.to;
  if (props.to.match("//") === null) {
    return (
      <Link {...props} to={url} >
        {props.children}
      </Link>
    );
  }

  if (url[0] !== "/") {
    url = `/${url}`;
  }
  return (
    <a
      {...props}
      href={url}
    >
      {props.children}
    </a>
  );
};

ExternalLinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.object,
};

// context from ImageLoader
export function preloader() {
  return (
    <div
      id={this.id}
      className={`${this.imageclasses.join(" ")}`}
    >
      {this.children}
    </div>
  );
}

// context from ImageLoader
export function renderElement() {
  return (
    <div
      id={this.id}
      className={this.imageclasses.join(" ")}
      style={this.style}
    >
      {this.children}
    </div>
  );
}

export const ChildItem = ({ section, go }) => {
  if (!section) {
    return (
      <div className="one-whole grid__item">
        <div className="rounded ratio--landscape soft-ends">
          <div className="ratio__item" />
        </div>
      </div>
    );
  }

  const imageclasses = [
    "background--fill",
    "background--dark-tertiary",
    "ratio--landscape",
    "soft-ends",
  ];

  return (
    <div className="one-whole soft-half-left grid__item push-half-bottom">
      <ExternalLinkWrapper
        to={section.link}
        className="plain"
        onClick={go}
        id={section.id}
      >
        <div className="rounded one-whole grid rounded flush background--light-primary">
          <div className="grid__item two-thirds hard" style={{ verticalAlign: "middle" }}>
            <h6 className="soft-left text-dark-primary flush-bottom">{section.text}</h6>
          </div>
          <div className="grid__item one-third hard" style={{ verticalAlign: "middle" }}>
            <ImageLoader
              src={section.image}
              preloader={preloader}
              renderElement={renderElement}
              force
              imageclasses={imageclasses}
              style={{
                backgroundImage: `url('${section.image}')`,
                borderRadius: "0px 6px 6px 0px",
              }}
            >
              <div className="ratio__item" />
            </ImageLoader>
          </div>
        </div>

      </ExternalLinkWrapper>
    </div>
  );
};

ChildItem.propTypes = {
  section: PropTypes.object,
  go: PropTypes.func,
};

export const SingleItem = ({ section, go, children }) => {
  if (!section) {
    return (
      <div className="one-half grid__item">
        <div className="rounded ratio--landscape">
          <div className="ratio__item" />
        </div>
      </div>
    );
  }

  const imageclasses = [
    "overlay--gradient",
    "background--fill",
    "background--dark-tertiary",
    "rounded",
    "ratio--square",
    "floating--bottom",
    "floating--left",
  ];

  return (
    <div className="one-half soft-half-left grid__item push-half-bottom">
      <ExternalLinkWrapper
        to={section.link}
        className="plain"
        onClick={go}
        id={section.id}
      >
        <ImageLoader
          src={section.image}
          preloader={preloader}
          renderElement={renderElement}

          imageclasses={imageclasses}
          style={{ backgroundImage: `url('${section.image}')` }}
        >
          <div className="overlay__item floating__item ratio__item">
            <h6 className="text-light-primary soft-left">{section.text}</h6>
          </div>
        </ImageLoader>
      </ExternalLinkWrapper>
      {children}
    </div>
  );
};

SingleItem.propTypes = {
  section: PropTypes.object,
  go: PropTypes.func,
  children: PropTypes.object,
};

export default class SectionItem extends Component {

  static propTypes = {
    sections: PropTypes.array,
    hide: PropTypes.func.isRequired,
  }

  state = {
    section: null,
  }

  expandOrGo = e => {
    const { id } = e.currentTarget;

    for (const section of this.props.sections) {
      if (section.id === id && section.children.length) {
        e.preventDefault();

        // if a section is open and a different section is clicked
        // then change the opened section to the one clicked
        if (this.state.section != null && this.state.section.id !== id) {
          this.setState({ section: null });
          setTimeout(() => {
            this.setState({ section });
          }, 400);
        } else if (this.state.section != null && section.id === id) {
          // if a section is open and that section is clicked
          // then close the section clicked
          this.setState({ section: null });
        } else {
          // else nothing is open
          // and open the section clicked
          this.setState({ section });
        }

        return;
      }
    }

    this.props.hide();
  }

  renderChildren = () => {
    const { section } = this.state;

    if (!section) {
      return null;
    }

    const children = [];

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const child in section.children) {
      children.push(section.children[child]);
    }

    return (
      <div className="soft-half-right soft-left soft-top background--dark-primary push-bottom">
        {/* <h4 className="soft-half-bottom text-light-primary text-center">{section.text}</h4> */}
        <div className="grid ">

          {children.map((sectionItem, i) => (
            <ChildItem section={sectionItem} key={i} go={this.expandOrGo} />
          ))}

        </div>
      </div>

    );
  }

  renderArrow = sectionItem => {
    const { section } = this.state;

    if (!section) {
      return null;
    }

    if (section.id !== sectionItem.id) {
      return null;
    }

    return (
      <div
        className="locked background--dark-primary"
        style={{
          height: 0,
          width: 0,
          background: "transparent",
          borderWidth: "0 15px 10px 15px",
          borderColor: "transparent transparent #303030 transparent",
          borderStyle: "solid",
          marginBottom: "-10px",
          left: "50%",
          marginLeft: "-10px",
          marginTop: "2px",
        }}
      />
    );
  }

  render() {
    const { sections } = this.props;

    return (
      <div>
        <div className="soft-half-right soft-left">
          <div className="grid">
            <div className="grid__item one-whole" >
              <div className="grid">
                {sections.map((sectionItem, i) => (
                  <SingleItem section={sectionItem} key={i} go={this.expandOrGo}>
                    {this.renderArrow(sectionItem)}
                  </SingleItem>
                ))}
              </div>

            </div>
          </div>
        </div>

        <div className="one-whole">
          <VelocityTransitionGroup
            enter={{
              animation: "slideDown", duration: 250,
            }}
            leave={{
              animation: "slideUp", duration: 250,
            }}
          >
            {this.renderChildren()}
          </VelocityTransitionGroup>
        </div>
      </div>
    );
  }
}
