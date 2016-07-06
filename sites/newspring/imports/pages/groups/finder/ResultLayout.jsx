
import { Link } from "react-router";
import Forms from "apollos/dist/core/components/forms";
import SideBySide from "apollos/dist/core/components/cards/SideBySide";
import Loading from "apollos/dist/core/components/loading/index";
import Tag from "../components/Tag";

import Group from "../components/GroupCard";
import Filter from "./Filter";

export default ({
  groups,
  tags,
  loading,
  count,
  query,
  removeQueryString,
  showSearch,
  toggleSearch,
  showTags,
  toggleTags,
  onCardHover,
}) => (
  <section className="background--light-secondary hard">
    {/* Meta */}

    {/* Tag List */}
    <div
      className="background--light-primary soft soft-double-left@anchored outlined--light outlined--bottom"
      style={{
        whiteSpace: "nowrap",
        overflowY: "hidden",
        overflowX: "scroll",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {tags && tags.map((tag, key) => (
        <Tag className="flush-bottom" val={tag} key={key} />
      ))}
      <Tag
        style={{verticalAlign: "bottom"}}
        className="flush-bottom background--dark-tertiary"
        val="..."
        canBeActive={false}
        onClick={() => toggleTags()}
      />

    </div>

    {/* Filter */}
    <Filter
      showSearch={showSearch}
      toggleSearch={toggleSearch}
      showTags={showTags}
      toggleTags={toggleTags}
      q={query}
    />

    {/* Results */}
    <div className="soft-half soft@portable soft-double-sides@anchored soft-ends@lap-and-up">
      {/* Result count + search icon */}
      {(() => {
        if (loading || !count) return null;
        return (
          <div
            style={{verticalAlign: "middle"}}
            className="push-bottom push-double-bottom@lap-and-up soft-half-ends soft-half-sides"
          >
            <h6 className="em float-left flush-bottom text-dark-tertiary" style={{verticalAlign: "middle"}}>
              {count} Results
            </h6>
            {(() => {
              if (showSearch) return null;
              return (
                <span
                  className="float-right icon-search"
                  style={{verticalAlign: "middle"}}
                  onClick={() => toggleSearch()}
                ></span>
              )
            })()}
          </div>
        )
      })()}

      {/* Loading */}
      {(() => {
        if (!loading) return null;
        return (
          <div className="one-whole text-center soft-ends">
            <Loading />
          </div>
        )
      })()}

      {/* Results */}

      {groups.map((group, key) => (
        <Group onHover={onCardHover} group={group} id={group.id} key={key} />
      ))}

      {/* Ad unit */}
      {(() => {
        if (loading) return null;
        return (
          <button className="relative one-whole" >
            <SideBySide
              defaultImage="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.2x1_1700_850_90_c1.jpg"
              left={["one-whole", "two-thirds@lap-and-up"]}
              right={["one-whole", "one-third@lap-and-up"]}
            >
              <div className="one-whole text-center@handheld">
                {/* Name */}
                <h4 className="soft-half-top push-top@anchored">
                  {groups.length === 0 ? "We didn't find any groups, would you like to create one?": "Can't find what you're looking for? Start your own group!"}
                </h4>

                {/* CTA */}
                <a href="https://rock.newspring.cc/workflows/93/?Interest=Next%20Steps" className="btn push-top">
                  Start My Group
                </a>
              </div>
            </SideBySide>
          </button>
        )
      })()}

      {/* Load more */}
      <div className="one-whole text-center">
        {(() => {
          let btnClasses = [
            "btn--dark-tertiary",
            "push-ends"
          ];
          if (loading) return null

          if (count === groups.length) {
            return (
              <button className="disabled soft-ends btn" disabled>
                No more groups
              </button>
            )
          }

          // if (loadingMoreGroups) {
          //   return (
          //     <button className="disabled one-whole@handheld btn" disabled>
          //       Loading...
          //     </button>
          //   )
          // }

          return (
            <button className={btnClasses.join(" ")}>
              Load More Groups
            </button>
          )
        })()}
      </div>


    </div>


  </section>
)
