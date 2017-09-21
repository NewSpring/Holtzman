/* eslint-disable react/no-danger */
import { PropTypes } from "react";
import Meta from "../../../components/shared/meta";
import Loading from "../../../components/@primitives/UI/loading";
import Forms from "../../../components/@primitives/UI/forms";

import GroupFinderFeedItem from "../../../components/content/feed-item-card";
import SideBySide from "../../../components/@primitives/UI/cards/SideBySideCard";

import GroupsILead from "../../../components/groups/groups-i-lead";
import KeywordSelect from "./Fields/Keyword";
import CampusSelect from "./Fields/CampusSelect";
import Location from "./Fields/Location";
import Validate from "../../../util/validate";
import Svg from "../../../components/@primitives/UI/svg";

/* eslint-disable max-len */
const Layout = ({
  tags,
  tagOnClick,
  submitForm,
  canSubmit,
  campuses,
  zip,
  zipDisabled,
  selectedCampus,
  searchQuery,
  inputOnChange,
  content,
  getLocation,
  geoLocationLoading,
}) =>
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta
      title="Group Finder"
      description="Who are your people? We know it's important to be connected, but it's hard to build lasting friendships. What if taking one simple step changed everything? At NewSpring, we’re trying to make it easier for you to find people who share your interests. We know that when you get together with people and have fun, you’ll begin to grow into a strong community that serves and grows together. What if you are one step away from saying, “These are my people”?"
      image="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.2x1_2000_1000_90_a789ae07aae81961.jpg"
    />

    <GroupsILead />

    <div
      className="background--light-primary soft soft-double-top soft-double-top@lap-and-up text-center"
      style={{ overflow: "visible" }}
    >
      <div>
        <h3>Find Your People</h3>
        <h6 className="soft-half-bottom@handheld soft-bottom">
          <em>
            Select your interests, campus, and location <br />to search for
            groups near you.
          </em>
        </h6>
        <Forms.Form
          classes={[
            "soft",
            "one-whole",
            "two-thirds@portable",
            "one-half@anchored",
            "display-inline-block",
            "push-bottom",
          ]}
          submit={submitForm}
          keypress={submitForm}
          action
        >
          <KeywordSelect
            tags={tags}
            searchQuery={searchQuery}
            tagOnClick={tagOnClick}
            onChange={inputOnChange}
          />
          <CampusSelect
            campuses={campuses}
            selectedCampus={selectedCampus}
            onChange={inputOnChange}
          />
          <Location
            zip={zip}
            validation={Validate.isLocationBasedZipCode}
            onChange={inputOnChange}
            disabled={zipDisabled}
            unLocate={getLocation}
          />
          {(() => {
            if (geoLocationLoading) {
              return (
                <div className="one-whole text-center soft">
                  <Loading />
                </div>
              );
            }

            const color =
              !geoLocationLoading && zip === "Using your location"
                ? "#6BAC43"
                : "#505050";

            return (
              <div className={"text-left soft-half-sides"}>
                <a onClick={e => getLocation(e)} style={{ color }}>
                  <Svg
                    name={"locate"}
                    title={"Locate Icon"}
                    fill={color}
                    classes={"display-inline-block"}
                  />
                  <h6
                    className="display-inline-block push-half-left"
                    style={{ fontWeight: "400", verticalAlign: "super" }}
                  >
                    Use my current location
                  </h6>
                </a>
              </div>
            );
          })()}
        </Forms.Form>
      </div>
    </div>
    <div className="soft-double-bottom text-center background--light-primary">
      <div className="background--light-primary soft-double-sides@lap-wide-and-up">
        {(() => {
          if (!tags.length && !campuses.length) {
            return (
              <div className="one-whole text-center">
                <Loading />
              </div>
            );
          } else if (geoLocationLoading) {
            return null;
          }

          const classes = ["btn", "push-top@lap-and-up"];
          if (!canSubmit) {
            classes.push("btn--disabled");
          }
          // XXX why can't I just pass in the function here?
          return (
            <button
              disabled={!canSubmit}
              onClick={submitForm}
              className={classes.join(" ")}
            >
              Let&#39;s Go!
            </button>
          );
        })()}
      </div>
    </div>

    {/* Group Stories */}
    <div
      className={
        "soft-half soft-sides@palm-wide-and-up soft-double-ends " +
        "soft-double@lap-wide-and-up text-center"
      }
    >
      <h3 className="push-top">You Can&#39;t Do Life Alone</h3>
      <div className="grid">
        {content &&
          content.map((entry, key) => {
            if (process.env.WEB) {
              return (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://newspring.cc/articles/${entry.meta.urlTitle}`}
                  className="plain grid__item one-whole"
                  key={key}
                >
                  <SideBySide
                    classes={["push-bottom@lap-and-up"]}
                    images={entry.content.images}
                    defaultImage={entry.content.images[0].url}
                  >
                    <h4 className="text-dark-primary push-half-top@portable push-top@anchored">
                      {entry.title}
                    </h4>

                    <p className="text-dark-primary">
                      <small
                        dangerouslySetInnerHTML={{ __html: entry.meta.summary }}
                      />
                    </p>
                    <span
                      className={
                        "h6 btn--small btn--dark-tertiary " +
                        "soft-sides@portable one-whole@handheld"
                      }
                    >
                      Read more
                    </span>
                  </SideBySide>
                </a>
              );
            }
            return (
              <div
                className="grid__item one-whole one-half@palm-wide-and-up"
                key={key}
              >
                <GroupFinderFeedItem item={entry} />
              </div>
            );
          })}
      </div>
    </div>
  </section>;
/* eslint-enable max-len */

Layout.propTypes = {
  tags: PropTypes.array.isRequired,
  campuses: PropTypes.array.isRequired,
  zip: PropTypes.string.isRequired,
  selectedCampus: PropTypes.object.isRequired,
  tagOnClick: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  zipDisabled: PropTypes.bool.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  searchQuery: PropTypes.array.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  content: PropTypes.array.isRequired,
  getLocation: PropTypes.func.isRequired,
  geoLocationLoading: PropTypes.bool.isRequired,
};

export default Layout;
