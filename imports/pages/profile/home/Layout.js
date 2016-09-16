import { Component, PropTypes} from "react";
import { Link } from "react-router";
import Meta from "react-helmet";

import Split, { Left, Right } from "../../../blocks/split";
import Toggle from "../../../components/controls/toggle";


const Layout = ({ photo, person, onToggle, content, onUpload }, context) => (
  <div>
    <Split nav classes={["background--light-primary"]}>

      <Meta
          title={person ? `${person.nickName} ${person.lastName}` : "Sign In"}
          titleTemplate="%s | NewSpring Church"
      />

      <Right
          mobile
          classes={["floating", "overlay--solid-dark"]}
          ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
          background={photo}
          blur
      >
        <div className="soft one-whole">
          <label htmlFor="file"
              className="background--fill ratio--square round two-fifths display-inline-block"
              style={{ backgroundImage: `url('${photo}')`, position: "relative"}}
          >
            {(() => {
              if (!Meteor.isCordova) {
                return (
                  <input onChange={onUpload} type="file" className="locked-ends locked-sides" style={{opacity: 0}} />
                )
              }

              return (
                <div onClick={onUpload} className="locked-ends locked-sides" style={{opacity: 0}} />
              )
            })()}

          </label>
        <h4 className="text-light-primary soft-half-top flush-bottom">{person.nickName} {person.lastName}</h4>
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
      <Toggle items={["Likes", "Following"]} toggle={onToggle} />
      <div>
        {content}
      </div>
    </Left>
  </div>

);

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout;
