import { PropTypes } from "react";
import { Link } from "react-router";

import Split, { Left, Right } from "../../../blocks/split";
import Meta from "../../../components/meta";

const Close = () => (
  <Link to="/profile" className="text-light-primary plain soft overlay__item locked-top locked-right">
    <i className="icon-close h4" />
  </Link>
);

const Layout = ({ person, children, mobile, onUpload }) => (
  <div>
    <Meta
      title={person.nickName ? `${person.nickName} ${person.lastName}` : "Profile"}
      image={person.photo ? person.photo : null}
    />
  <Split nav classes={mobile ? ["background--light-secondary"] : ["background--light-primary"]}>
      <Right
        mobile={mobile}
        classes={["floating", "overlay--solid-dark"]}
        ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
        background={person.photo ? person.photo : null}
        blur
      >
        <div className="soft one-whole">
          <label htmlFor="file"
            className="background--fill ratio--square round two-fifths display-inline-block"
            style={{ backgroundImage: `url('${person.photo ? person.photo : ""}')`, position: "relative" }}
          >
            <input onChange={onUpload} type="file" className="locked-ends locked-sides" style={{ opacity: 0 }} />
          </label>
        <h4 className="text-light-primary soft-half-top flush-bottom">{person.nickName || person.firstName} {person.lastName}</h4>
          <p className="text-light-primary flush"><em>{person.home && person.home.city}, {person.home && person.home.state}</em></p>
        </div>

      </Right>

    </Split>

    <Left scroll classes={["background--light-primary"]}>
      {children}
    </Left>
  </div>

);

Layout.propTypes = {
  photo: PropTypes.string,
  person: PropTypes.object,
};

export default Layout;
