import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";
import Meta from "../../../components/shared/meta";

import Split, { Left, Right } from "../../../components/@primitives/layout/split";
import Tabs from "../../../components/@primitives/UI/tabs";


const Layout = ({ photo, person, onToggle, content, onUpload }) => (
  <div>
    <Split nav classes={["background--light-primary"]}>

      <Meta
        title={person ? `${person.nickName} ${person.lastName}` : "Sign In"}
      />

      <Right
        mobile
        classes={["floating", "overlay--solid-dark"]}
        ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
        background={photo}
        blur
      >
        <div className="soft one-whole">
          <label
            htmlFor="file"
            className="background--fill ratio--square round two-fifths display-inline-block"
            style={{ backgroundImage: `url('${photo}')`, position: "relative" }}
          >
            {(() => {
              if (!Meteor.isCordova) {
                return (
                  <input onChange={onUpload} type="file" className="locked-ends locked-sides" style={{ opacity: 0 }} />
                );
              }

              return (
                <div onClick={onUpload} className="locked-ends locked-sides" style={{ opacity: 0 }} />
              );
            })()}
          </label>
          <h4
            className="text-light-primary soft-half-top flush-bottom"
          >
            {person.nickName} {person.lastName}
          </h4>
          {(() => {
            if (!person.home || !person.home.city) return null;
            return (
              <p className="text-light-primary flush"><em>{person.home.city}</em></p>
            );
          })()}
        </div>

      </Right>


    </Split>
    <Left scroll>
      <Tabs items={["Likes", "Following"]} toggle={onToggle} />
      <div>
        {content}
      </div>
    </Left>
  </div>

);

Layout.propTypes = {
  photo: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default Layout;
