import { Component } from "react";
import { Link } from "react-router";
import Slider from "react-slick";

class Template extends Component {

  componentWillUnmount() {
    if (typeof NativeStorage === "undefined") return;
    NativeStorage.setItem("welcomed", true,
      // success
      () => {},
      // error
      () => {},
    );
  }

  next = event => {
    const index = Number(event.target.dataset.index);
    this.refs.welcomeSlider.slickGoTo(index + 1);
  }

  skip = event => {
    event.preventDefault();
    this.refs.welcomeSlider.slickGoTo(7);
  }

  render() {
    const containerStyles = {
      position: "absolute",
      height: "100%",
      width: "100%",
      overflowY: "hidden",
    };
    const skipStyles = {
      position: "fixed",
      bottom: "5px",
      right: "10px",
      color: "white",
      textDecoration: "none",
      fontSize: "15px",
    };
    const imagePrefix = window.innerWidth >= 480 ? "tablet" : "phone";

    return (
      <div className="background--primary" style={containerStyles}>
        <Slider
          ref="welcomeSlider"
          dots
          arrows={false}
          infinite={false}
          speed={300}
          edgeFriction={0}
        >
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img1.jpg`}
              onClick={this.next}
              data-index={0}
            />
          </div>
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img2.jpg`}
              onClick={this.next}
              data-index={1}
            />
          </div>
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img3.jpg`}
              onClick={this.next}
              data-index={2}
            />
          </div>
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img4.jpg`}
              onClick={this.next}
              data-index={3}
            />
          </div>
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img5.jpg`}
              onClick={this.next}
              data-index={4}
            />
          </div>
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img6.jpg`}
              onClick={this.next}
              data-index={5}
            />
          </div>
          <div>
            <img
              role="presentation"
              src={`/welcome/${imagePrefix}/onboard-img7.jpg`}
              onClick={this.next}
              data-index={6}
            />
          </div>
          <div>
            <Link to="/">
              <img
                role="presentation"
                src={`/welcome/${imagePrefix}/onboard-img8.jpg`}
              />
            </Link>
          </div>
        </Slider>
        <Link to="/" onClick={this.skip} style={skipStyles}>Skip</Link>
      </div>
    );
  }

}

const Routes = [
  {
    path: "/welcome",
    component: Template,
  },
];

export default {
  Routes,
};

export {
  Template,
};
