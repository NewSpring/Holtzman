import { Component } from "react";
import { connect } from "react-apollo";
import { Link } from "react-router";
import Truncate from "truncate";
import gql from "apollo-client/gql";
import SideBySide from "apollos/dist/core/components/cards/SideBySide";
import Loading from "apollos/dist/core/components/loading/index";
import Tag from "../components/Tag";


const mapQueriesToProps = () => ({
  attributes: {
    query: gql`
      query GetGroupAttributes {
        tags: groupAttributes {
          id
          description
          value
        }
      }
    `,
  },
})

let defaultTags = [];
@connect({ mapQueriesToProps })
class Filter extends Component {

  state = { toggled: false }

  onClick = () => {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    const { attributes } = this.props;
    let tags = attributes.tags ? attributes.tags : defaultTags;
    const { toggled } = this.state;
    return (
      <div>
        <div
          onClick={this.onClick}
          style={{verticalAlign: "middle"}}
          className="background--light-primary soft-half-bottom soft-top soft-sides soft-double-sides@anchored outlined--light outlined--bottom"
        >
          <h6 className="float-left flush-bottom text-dark-tertiary" style={{verticalAlign: "middle"}}>
            {toggled ? "Hide" : "See"} All Tags
          </h6>
          <span className={`float-right icon-arrow-${toggled ? "up" : "down"}`} style={{verticalAlign: "middle"}}></span>

        </div>

        {/* filter internals */}
        {(() => {
          if (!toggled) return null; // hidden
          if (!tags.length) return null; // XXX loading....
          return (
            <div className="outlined--light outlined--bottom soft-half-sides soft-ends soft-double-ends@anchored text-center background--light-primary">
              <h4 className="soft-half-bottom flush-bottom">
                Featured Tags
              </h4>
              <div className="two-thirds@anchored display-inline-block soft-ends@anchored">
                {tags.map((tag, key) => <Tag key={key} val={tag.value} />)}
              </div>
            </div>
          )
        })()}
      </div>
    )
  }

}

const Group = ({ group }) => {
  if (!group) group = {};
  const leaders = group && group.members && group.members
    .filter(x => x.role.toLowerCase() === "leader");

  return (
    <button to={`/groups/${group.id}`} className="relative one-whole push-bottom@lap-and-up plain" >
      <SideBySide
        defaultImage={group.photo ? group.photo : "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png" }
        left={["one-whole", "two-thirds@lap-and-up"]}
        right={["one-whole", "one-third@lap-and-up"]}
      >
        {/* Name */}
        <h4 className="plain text-dark-primary push-half-top push-top@anchored">
          {group.name}
        </h4>

        {/* Leaders */}
        <h5 className="plain text-dark-tertiary">
          {leaders && leaders.map((x, i) => {
            let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`;
            if (leaders.length - 1 != i) string += ", ";
            return <span key={i}>{string}</span>
          })}</h5>

        {/* Distance */}
        {/*{(() => {
          if (!group.locations || !group.locations[0].location) return null;
          if (!group.locations[0].location.distance) return null;
          return (
            <h6 className="em text-dark-tertiary">
              {group.locations[0].location.distance.toFixed(2)} miles away
            </h6>
          )
        })()}*/}


        {/* Description */}
        <p className="plain text-dark-primary">{Truncate(group.description, 120)}</p>

        {/* Tags */}
        <div className="soft-half-top">
          {group.tags && group.tags.filter(x => x).map((tag, i) => (
            <Tag val={tag.value} key={i} />
          ))}
          {(() => {
            if (!group.type) return null;
            return <Tag val={group.type} />
          })()}
          {/*{(() => {
            if (!group.kidFriendly) return null;
            return <Tag value="childcare" />
          })()}*/}
          {(() => {
            if (!group.demographic) return null;
            return <Tag val={group.demographic} />
          })()}
        </div>

      </SideBySide>
    </button>
  )
}


export default ({ groups, tags, loading, count, query, removeQueryString }) => (
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
      {(() => {
        if (!query) return null
        return (
          <Tag
            className="flush-bottom"
            active={true}
            val={query}
            onClick={() => removeQueryString()}
          />
        )
      })()}
      {tags && tags.map((tag, key) => (
        <Tag className="flush-bottom" val={tag} key={key} />
      ))}
    </div>

    {/* Filter */}
    <Filter />

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
            <span className="float-right icon-search" style={{verticalAlign: "middle"}}></span>

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
        <Group group={group} id={group.id} key={key} />
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
                <Link to="https://rock.newspring.cc/workflows/10" className="btn push-top">
                  Start My Group
                </Link>
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
