import { Component, PropTypes} from "react"
import Meta from "apollos/dist/core/components/meta";
import Forms from "apollos/dist/core/components/forms";
import Loading from "apollos/dist/core/components/loading";
import { Link } from "react-router";

import SideBySide from "apollos/dist/core/components/cards/SideBySide";
import Tag from "../components/Tag";

export default ({ tags, tagOnClick, submitTags, canSearchTags, findByQuery, inputOnChange, content }) => (
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta title="Group Finder" description={"#TheseAreMyPeople"} />

    {/* Tags :rocket: */}
    <div className="soft soft-double-ends push-double@lap-and-up soft-double@lap-wide-and-up text-center">
      <h3 className="flush-bottom soft-half-bottom">Find My People</h3>
      <h6 className="soft-half-bottom@handheld soft-bottom@anchored">
        <em>Select multiple tags to find even more groups</em>
      </h6>
      <div className="push-ends soft-double-sides@lap-and-up push-double-sides@anchored soft-sides@handheld">
        {tags.map((tag, i) => <Tag onClick={tagOnClick} key={i} val={tag.value} />)}
      </div>
      {(() => {
        if (!tags.length ) {
          return <div className="one-whole text-center"><Loading /></div>
        }

        let classes = ["btn", "push-top@lap-and-up"];
        if (!canSearchTags) classes.push("btn--disabled")
        // XXX why can't I just pass in the function here?
        return (
          <button
            disabled={!canSearchTags}
            onClick={(e) => submitTags(e)}
            className={classes.join(" ")}
          >
            Let's Go!
          </button>
        )
      })()}
    </div>

    {/* Search */}
    <div className="soft soft-double-ends soft-double@lap-and-up text-center background--light-primary">
      <div>
        <h3 className="soft-ends@anchored push-top@lap-and-up flush-bottom">Don't see what you're looking for?</h3>
        <Forms.Form
          classes={[
            "soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block", "push-bottom"
          ]}
          submit={(e) => findByQuery(e)}
        >
          <Forms.Input
            hideLabel={true}
            classes={["hard-bottom"]}
            placeholder="Type your search here..."
            type="text"
            onChange={(e) => inputOnChange(e)}
          />
          <div className="one-whole text-left">
            <h6><em>Find a group by zipcode, name, or description</em></h6>
          </div>
        </Forms.Form>
      </div>
    </div>

    {/* Group Stories */}
    <div className="soft-half soft-double-ends soft-double@lap-wide-and-up text-center">
      <h3 className="push-top">You Can't Do Life Alone</h3>
      {content && content.map((entry, key) => (
        <SideBySide
          key={key}
          classes={["push-bottom@lap-and-up"]}
          images={entry.content.images}
          defaultImage={entry.content.images[0].cloudfront}
        >
          <h4 className="push-half-top@portable push-top@anchored">
            {entry.title}
          </h4>
          <p><small dangerouslySetInnerHTML={{ __html: entry.meta.summary }}></small></p>
          {(() => {

            if (process.env.WEB) {
              return (
                <a
                  target="_blank"
                  href={`https://newspring.cc/articles/${entry.meta.urlTitle}`}
                  className="h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                >
                  Read more
                </a>
              )
            }
          })()}

        </SideBySide>
      ))}
    </div>
  </section>
)
