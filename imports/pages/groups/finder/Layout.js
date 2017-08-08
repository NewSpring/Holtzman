/* eslint-disable react/no-danger */
import { PropTypes } from "react";
import { css } from "aphrodite";
import Meta from "../../../components/shared/meta";
import Loading from "../../../components/@primitives/UI/loading";
import Forms from "../../../components/@primitives/UI/forms"

import FeedItem from "../../../components/content/feed-item-card";
import SideBySide from "../../../components/@primitives/UI/cards/SideBySideCard";
import Tag from "../../../components/@primitives/UI/tags";

import GroupsILead from "../../../components/groups/groups-i-lead";
import KeywordSelect from "./Fields/Keyword";

// import Styles from "./style-css";

const modalFocusedStyle = {
  border: "1px solid #f0f0f0",
  borderRadius: 7,
  boxShadow: "0px 2px 9px #DDD",
};

const modalHiddenStyle = {
  border: 0,
}

/* eslint-disable max-len */
const Layout = ({
  tags,
  tagOnClick,
  selectedTags,
  submitTags,
  canSearchTags,
  searchQuery,
  findByQuery,
  inputOnChange,
  content,
}) =>
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta
      title="Group Finder"
      description="Who are your people? We know it's important to be connected, but it's hard to build lasting friendships. What if taking one simple step changed everything? At NewSpring, we’re trying to make it easier for you to find people who share your interests. We know that when you get together with people and have fun, you’ll begin to grow into a strong community that serves and grows together. What if you are one step away from saying, “These are my people”?"
      image="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.2x1_2000_1000_90_a789ae07aae81961.jpg"
    />

    <GroupsILead />

    <div className="background--light-primary soft soft-double-top soft-double-top@lap-and-up text-center" style={{ overflow: "visible" }}>
      <div>
        <h3>Find Your People</h3>
        <h6 className="soft-half-bottom@handheld soft-bottom">
          <em>
            Select your interests, campus, and location <br />to search for groups near you.
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
          submit={e => findByQuery(e)}
          action
        >
          <KeywordSelect
            tags={tags}
            searchQuery={searchQuery}
            tagOnClick={tagOnClick}
            selectedTags={selectedTags}
            onChange={e => inputOnChange(e)}
          />
          <Forms.Input
            inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
            type="text"
            label={"Campus"}
            name="Campus"
            onChange={e => inputOnChange(e)}
          />
          <Forms.Input
            inputClasses={"outlined--dotted outlined--light h6 flush-bottom text-black"}
            label={"Location (zip)"}
            // show tel if mobile
            type="text"
            name="Zip"
            onChange={e => inputOnChange(e)}
          />
        </Forms.Form>
      </div>
    </div>
    <div className="soft-double-bottom text-center background--light-primary">
      <div className="background--light-primary soft-double-sides@lap-wide-and-up">
        {(() => {
          if (!tags.length) {
            return (
              <div className="one-whole text-center">
                <Loading />
              </div>
            );
          }

          const classes = ["btn", "push-top@lap-and-up"];
          if (!canSearchTags) classes.push("btn--disabled");
          // XXX why can't I just pass in the function here?
          return (
            <button
              disabled={!canSearchTags}
              onClick={e => submitTags(e)}
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
                <FeedItem item={entry} />
              </div>
            );
          })}
      </div>
    </div>
  </section>;
/* eslint-enable max-len */

Layout.propTypes = {
  tags: PropTypes.array.isRequired,
  tagOnClick: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  submitTags: PropTypes.func.isRequired,
  canSearchTags: PropTypes.bool.isRequired,
  searchQuery: PropTypes.array.isRequired,
  findByQuery: PropTypes.func.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  inputOnFocus: PropTypes.func.isRequired,
  content: PropTypes.array.isRequired,
};

export default Layout;
