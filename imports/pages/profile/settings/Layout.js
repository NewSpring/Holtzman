import PropTypes from 'prop-types';

import Split, { Left, Right } from "../../../components/@primitives/layout/split";
import Meta from "../../../components/shared/meta";

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
          <label
            htmlFor="file"
            className="background--fill ratio--square round two-fifths display-inline-block"
            style={{
              backgroundImage: `url('${person.photo ? person.photo : ""}')`,
              position: "relative",
            }}
          >
            <input
              onChange={onUpload}
              type="file"
              className="locked-ends locked-sides"
              style={{ opacity: 0 }}
            />
          </label>
          <h4
            className="text-light-primary soft-half-top flush-bottom"
          >
            {person.nickName || person.firstName} {person.lastName}
          </h4>
          <p
            className="text-light-primary flush"
          >
            <em>{person.home && person.home.city}, {person.home && person.home.state}</em>
          </p>
        </div>

      </Right>

    </Split>

    <Left scroll classes={["background--light-primary"]}>
      {children}
    </Left>
  </div>

);

Layout.propTypes = {
  person: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default Layout;
