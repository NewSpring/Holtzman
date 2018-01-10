// @flow
import { Link } from "react-router";
import Meta from "../../../components/shared/meta";
import Tag from "../../../components/@primitives/UI/tags";
import Group from "../components/GroupCard";
import { Spinner } from "../../../components/@primitives/UI/loading";
import Filter from "./Filter";

type ILayout = {
  groups: [Object],
  tags: [String],
  loading: boolean,
  query: String,
  showSearch: boolean,
  toggleSearch: Function,
  showTags: boolean,
  count: number,
  toggleTags: Function,
  onCardHover: Function,
  campuses: [String],
  schedules: [String],
  LoadingComponent: Function,
  done: boolean,
};

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
  done,
}: ILayout) => (
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
      {tags &&
        tags.map((tag, key) => (
          <Tag
            style={{ verticalAlign: "bottom" }}
            className="flush-bottom"
            val={tag}
            key={key}
            canBeActive
          />
        ))}
      {schedules &&
        schedules.map((schedule, key) => (
          <Tag
            style={{ verticalAlign: "bottom" }}
            className="flush-bottom"
            val={schedule}
            urlKey="schedules"
            key={key}
            canBeActive
          />
        ))}
      {campuses &&
        campuses.map((campus, key) => (
          <Tag
            style={{ verticalAlign: "bottom" }}
            className="flush-bottom"
            val={campus}
            urlkey="campus"
            key={key}
            canBeActive
          />
        ))}
      <Tag
        style={{ verticalAlign: "bottom" }}
        className="flush-bottom"
        val="filter"
        canBeActive={false}
        onClick={() => toggleTags()}
        iconClass={showTags ? "icon-arrow-up" : "icon-arrow-down"}
        data-spec="iconTag"
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

      {/* Loading */}
      {loading && (
        <div className="text-center soft">
          <Spinner styles={{ width: "40px", height: "40px" }} />
        </div>
      )}

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
      {!loading && !done && <LoadingComponent />}

      <div className="one-whole text-center push-bottom">
        {(() => {
          if (loading || groups.length) return null;
          return (
            <div className="card push-top">
              <div className="card__item soft-ends soft-half-sides soft-double@palm-wide-and-up">
                <p className="flush hard">
                  <em>
                    <small>
                      Unfortunately, we didn&#39;t find any groups matching your search. You can
                      start a group <a href="https://rock.newspring.cc/workflows/81">here!</a>
                    </small>
                  </em>
                </p>
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
              <Link href="https://rock.newspring.cc/workflows/81" className="btn push-half-top">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </button>
    </div>
  </section>
);

export default Layout;
