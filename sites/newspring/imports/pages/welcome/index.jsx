import { Component } from "react";
import { Link } from "react-router";
import Slider from "react-slick";

class Welcome extends Component {

  componentWillUnmount() {
    if (typeof NativeStorage === "undefined") return;
    NativeStorage.setItem("welcomed", true,
      (success) => {},
      (error) => { console.error("could not set welcomed"); },
    );
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

    return (
      <div style={containerStyles}>
        <Slider
          dots={true}
          arrows={false}
          infinite={false}
        >
          <div><img src="/welcome/onboard-img1.jpg" /></div>
          <div><img src="/welcome/onboard-img2.jpg" /></div>
          <div><img src="/welcome/onboard-img3.jpg" /></div>
          <div><img src="/welcome/onboard-img4.jpg" /></div>
          <div><img src="/welcome/onboard-img5.jpg" /></div>
          <div><img src="/welcome/onboard-img6.jpg" /></div>
          <div><img src="/welcome/onboard-img7.jpg" /></div>
          <div>
            <Link to="/">
              <img src="/welcome/onboard-img8.jpg" />
            </Link>
          </div>
        </Slider>
        <Link to="/" style={skipStyles}>Skip</Link>
      </div>
    );
  }

}

const Routes = [
  {
    path: "/welcome",
    component: Welcome,
  },
];

export default {
  Routes,
};
