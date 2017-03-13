import { Link } from "react-router";

import { PropTypes } from "react";
import Meta from "../../../components/shared/meta";

import Tag from "../../../components/@primitives/UI/tags";
import Group from "../components/GroupCard";

import Filter from "./Filter";

const Layout = ({
  groups,
  tags,
  loading,
  LoadingComponent,
  count,
  query,
  campuses,
  schedules,
  showSearch,
  toggleSearch,
  showTags,
  toggleTags,
  onCardHover,
}) => (
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta title="Group Finder" />

    {/* Tag List */}
    <div
      className={
        "background--light-primary soft soft-double-left@anchored " +
        "outlined--light outlined--bottom"
      }
      style={{
        whiteSpace: "nowrap",
        overflowY: "hidden",
        overflowX: "scroll",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {tags && tags.map((tag, key) => (
        <Tag
          style={{ verticalAlign: "bottom" }}
          className="flush-bottom"
          val={tag}
          key={key}
          canBeActive
        />
      ))}
      {schedules && schedules.map((schedule, key) => (
        <Tag
          style={{ verticalAlign: "bottom" }}
          className="flush-bottom"
          val={schedule}
          urlKey="schedules"
          key={key}
          canBeActive
        />
      ))}
      {campuses && campuses.map((campus, key) => (
        <Tag
          style={{ verticalAlign: "bottom" }}
          className="flush-bottom"
          val={campus}
          urlKey="campuses"
          key={key}
          canBeActive
        />
      ))}
      <Tag
        style={{ verticalAlign: "bottom" }}
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
            style={{ verticalAlign: "middle" }}
            className="push-bottom push-double-bottom@lap-and-up soft-half-ends soft-half-sides"
          >
            <h6
              className="em float-left flush-bottom text-dark-tertiary"
              style={{ verticalAlign: "middle" }}
            >
              {count} Results
            </h6>
            {(() => (
              <button
                className="float-right icon-search"
                style={{ marginTop: "-4px" }}
                onClick={() => toggleSearch()}
              />
            ))()}
          </div>
        );
      })()}

      {/* Results */}

      {groups.map((group, key) => (
        <Group onHover={onCardHover} group={group} id={group.id} key={key} />
      ))}

      {(() => {
        if (!count) return null;
        return (
          <div
            className={
              "text-center soft-half-top push-top push-double-top@lap-and-up " +
              "soft-half-bottom soft-half-sides"
            }
          >
            <h6 className="em text-dark-secondary flush">
              {groups.length} results of {count}
            </h6>
          </div>
        );
      })()}

      {/* Loading */}
      <LoadingComponent />

      <div className="one-whole text-center push-bottom">
        {(() => {
          if (loading || groups.length) return null;
          return (
            <div className="card push-top">
              <div className="card__item soft-ends soft-half-sides soft-double@palm-wide-and-up">
                <p className="flush hard"><em><small>
                  Unfortunately, we didn&#39;t find any groups matching your search. You can start a group <a href="https://rock.newspring.cc/workflows/81">here!</a>
                </small></em></p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Ad unit */}
      <button
        className={
          "relative one-whole push-double-top@lap-and-up " +
          "push-double-top push-bottom@lap-and-up"
        }
      >
        <div className="card soft soft-double-sides@lap-and-up">
          <div className="card__item soft-double-sides@lap-and-up">
            <div className="one-whole text-center@handheld">
              {/* Name */}
              <h4 className="soft-half-top push-top@anchored capitalize">
                Can&#39;t find what you&#39;re looking for, or want to start your own group?
              </h4>

              {/* CTA */}
              <Link
                href="https://rock.newspring.cc/workflows/81"
                className="btn push-half-top"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </button>

    </div>
  </section>
);

Layout.propTypes = {
  groups: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  showTags: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  toggleTags: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  campuses: PropTypes.array,
  schedules: PropTypes.array,
  LoadingComponent: PropTypes.func,
};

export default Layout;
