import PropTypes from "prop-types";
import Meta from "../../../components/shared/meta";
import Forms from "../../../components/@primitives/UI/forms";
import Loading from "../../../components/@primitives/UI/loading";

import FeedItem from "../../../components/content/feed-item-card";
import SideBySide from "../../../components/@primitives/UI/cards/SideBySideCard";
import Tag from "../../../components/@primitives/UI/tags";

import GroupsILead from "../../../components/groups/groups-i-lead";

/* eslint-disable max-len */
const Layout = ({
  tags,
  tagOnClick,
  submitTags,
  canSearchTags,
  findByQuery,
  inputOnChange,
  content,
}) => (
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta
      title="Group Finder"
      description="Who are your people? We know it's important to be connected, but it's hard to build lasting friendships. What if taking one simple step changed everything? At NewSpring, we’re trying to make it easier for you to find people who share your interests. We know that when you get together with people and have fun, you’ll begin to grow into a strong community that serves and grows together. What if you are one step away from saying, “These are my people”?"
      image="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.2x1_2000_1000_90_a789ae07aae81961.jpg"
    />

    <GroupsILead />

    {/* Tags :rocket: */}
    <div className="background--light-primary soft-double-sides@lap-wide-and-up">
      <div
        className={
          "soft soft-double-ends " +
          "push-double@lap-and-up soft@lap-wide-and-up text-center"
        }
      >
        <h3 className="flush-bottom">Find Your People</h3>
        <h6 className="soft-half-bottom@handheld soft-bottom@anchored">
          <em>Select multiple tags to find even more groups</em>
        </h6>
        <div className="push-ends soft-double-sides@lap-and-up push-double-sides@anchored">
          {/* weird SSR stuff here to investigate */}
          {tags.map((tag, i) => <Tag className="" onClick={tagOnClick} key={i} val={tag.value} />)}
        </div>
        {(() => {
          if (!tags.length) {
            return <div className="one-whole text-center"><Loading /></div>;
          }

          const classes = ["btn", "push-top@lap-and-up"];
          if (!canSearchTags) classes.push("btn--disabled");
          // XXX why can't I just pass in the function here?
          return (
            <button
              disabled={!canSearchTags}
              onClick={(e) => submitTags(e)}
              className={classes.join(" ")}
            >
              Let&#39;s Go!
            </button>
          );
        })()}
      </div>
    </div>

    <div className="soft-sides soft-double-sides@lap-and-up background--light-primary">
      <div className="soft@lap-and-up">
        <hr className="flush outlined--light" style={{ borderWidth: "1px", borderTopWidth: 0 }} />
      </div>
    </div>

    {/* Search */}
    <div
      className="soft soft-double-ends soft-double@lap-and-up text-center background--light-primary"
    >
      <div>
        <h3 className="soft-ends@anchored push-top@lap-and-up flush-bottom">
          Don&#39;t see what you&#39;re looking for?
        </h3>
        <Forms.Form
          classes={[
            "soft",
            "one-whole",
            "two-thirds@portable",
            "one-half@anchored",
            "display-inline-block",
            "push-bottom",
          ]}
          submit={(e) => findByQuery(e)}
          action
        >
          <Forms.Input
            hideLabel
            classes={["hard-bottom"]}
            placeholder="Type your search here..."
            type="text"
            name="search"
            onChange={(e) => inputOnChange(e)}
          />
          <div className="one-whole text-center@handheld text-left@lap-and-up">
            <h6><em>Find a group by zipcode, name, campus, or description</em></h6>
          </div>
        </Forms.Form>
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
        {content && content.map((entry, key) => {
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
                    <small dangerouslySetInnerHTML={{ __html: entry.meta.summary }} />
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
            <div className="grid__item one-whole one-half@palm-wide-and-up" key={key} >
              <FeedItem item={entry} />
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
/* eslint-enable max-len */

Layout.propTypes = {
  tags: PropTypes.array.isRequired,
  tagOnClick: PropTypes.func.isRequired,
  submitTags: PropTypes.func.isRequired,
  canSearchTags: PropTypes.bool.isRequired,
  findByQuery: PropTypes.func.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  content: PropTypes.array.isRequired,
};

export default Layout;
