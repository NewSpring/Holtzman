import { Component } from "react";
import { Link } from "react-router";
import Slider from "react-slick";

class Welcome extends Component {

  state = {
    slickGoTo: 0,
  }

  componentWillUnmount() {
    if (typeof NativeStorage === "undefined") return;
    NativeStorage.setItem("welcomed", true,
      (success) => {},
      (error) => { console.error("could not set welcomed"); },
    );
  }

  updateState = (index) => {
    this.setState({ slickGoTo: Number(index) });
  }

  next = (event) => {
    const index = Number(event.target.dataset.index);
    this.setState({ slickGoTo: index + 1 });
  }

  skip = (event) => {
    event.preventDefault();
    this.setState({ slickGoTo: 7 });
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
          speed={300}
          edgeFriction={0}
          afterChange={this.updateState}
          slickGoTo={this.state.slickGoTo || 0}
        >
          <div><img src="/welcome/onboard-img1.jpg" onClick={this.next} data-index={0} /></div>
          <div><img src="/welcome/onboard-img2.jpg" onClick={this.next} data-index={1} /></div>
          <div><img src="/welcome/onboard-img3.jpg" onClick={this.next} data-index={2} /></div>
          <div><img src="/welcome/onboard-img4.jpg" onClick={this.next} data-index={3} /></div>
          <div><img src="/welcome/onboard-img5.jpg" onClick={this.next} data-index={4} /></div>
          <div><img src="/welcome/onboard-img6.jpg" onClick={this.next} data-index={5} /></div>
          <div><img src="/welcome/onboard-img7.jpg" onClick={this.next} data-index={6} /></div>
          <div>
            <Link to="/">
              <img src="/welcome/onboard-img8.jpg" />
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
    component: Welcome,
  },
];

export default {
  Routes,
};
