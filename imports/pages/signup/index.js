/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';

import { Component } from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import gql from "graphql-tag";
import graphql from "../../data/graphql";
import AccountsWithData from "../../components/people/accounts";
import Loading from "../../components/@primitives/UI/loading";
import Meta from "../../components/shared/meta";

class TemplateWithoutData extends Component {

  render() {
    if (Meteor.isServer) {
      return (
        <div
          className={
            "scrollable background--fill background--light-secondary " +
            "locked-sides@palm-wide-and-up locked-ends@palm-wide-and-up " +
            "floating soft-double-ends push-double-left@lap-and-up soft-double-left@lap-and-up"
          }
          style={{ backgroundImage: "url('https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/event.auditorium.2x1_1700_850_c1.png')" }}
        >
          <Meta title="Sign up" />
          <div className="floating__item" style={{ maxWidth: "460px" }}>
            <div className="card flush-bottom">
              <div
                className="card__item"
                style={{
                  minWidth: "420px",
                  minHeight: "500px",
                }}
              >
                <div className="soft-double">
                  <Loading />
                </div>

              </div>
            </div>

          </div>
        </div>
      );
    }
    const { breakpoints } = this.props;
    if (breakpoints.length && breakpoints.indexOf("lap-and-up") > -1) {
      return (
        <div
          className={
            "scrollable background--fill background--light-secondary " +
            "locked-sides@palm-wide-and-up locked-ends@palm-wide-and-up " +
            "floating soft-double-ends push-double-left@lap-and-up soft-double-left@lap-and-up"
          }
          style={{
            backgroundImage: "url('https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/event.auditorium.2x1_1700_850_c1.png')",
          }}
        >
          <Meta title="Sign up" />
          <div className="floating__item" style={{ maxWidth: "460px" }}>
            <div className="card flush-bottom">
              <div
                className="card__item"
                style={{
                  minWidth: "420px",
                  minHeight: "500px",
                }}
              >
                <AccountsWithData />
              </div>
            </div>

          </div>
        </div>
      );
    }

    return (
      <div>
        <Meta title="Sign up" />
        <AccountsWithData />
      </div>
    );
  }
}

TemplateWithoutData.propTypes = {
  breakpoints: PropTypes.array.isRequired,
};

const Template = connect((state) => ({ breakpoints: state.responsive.breakpoints }))(
  TemplateWithoutData
);

const Routes = [
  {
    path: "/signup",
    component: Template,
    onEnter: (nextState, replace, callback) => {
      const { query } = nextState.location;

      // XXX no query param - check if logged in. redirect to profile if so
      if (!query.redirect) {
        if (!Meteor.userId()) { callback(); return; }
        replace({ pathname: Meteor.isCordova ? "profile" : "profile/settings" });
        callback();
        return;
      }

      if (typeof query.return_person_guid === "undefined" || !Meteor.userId()) {
        callback();
        return;
      }

      const whiteListed = (url) =>
        url.indexOf("https://alpha-rock.newspring.cc") === 0 ||
        url.indexOf("https://beta-rock.newspring.cc") === 0 ||
        url.indexOf("https://rock.newspring.cc") === 0;

      if (!whiteListed(query.redirect)) {
        callback(); return;
      }

      // assume logged in
      graphql.query({
        query: gql`{ currentPerson { guid }}`,
        forceFetch: true,
      })
      .then(({ data }) => {
        replace({
          pathname: `${query.redirect}&person_guid=${data.currentPerson.guid}`,
        });
        callback();
      })
      .catch((e) => {
        console.error(e);
        callback();
      });
    },
  },
];

export default {
  Routes,
};

export {
  TemplateWithoutData,
};
