import { Component } from "react";
import { Link } from "react-router";
import Slider from "react-slick";

class Welcome extends Component {

  render() {
    const containerStyles = {
      position: "relative",
    };
    const skipStyles = {
      position: "absolute",
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
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div><img src="http://placekitten.com/g/414/736" /></div>
          <div>
            <Link to="/">
              <img src="http://placekitten.com/g/414/736" />
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
