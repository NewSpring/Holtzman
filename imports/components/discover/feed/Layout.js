import PropTypes from "prop-types";
import { Link } from "react-router";
import Loading from "../../@primitives/UI/loading/Spinner";

import FeedItemCard from "../../content/feed-item-card";

import RecentLikes from "../../shared/likes-list";

import inAppLink from "../../../util/inAppLink";

function getImage(images, label = "2:1") {
  let selectedImage = "";

  for (const image of images) {
    if (image.fileLabel === label) {
      selectedImage = image.url;
      break;
    }
    selectedImage = image.url;
  }
  return selectedImage;
}

const RenderRecentLikes = ({ recentLikes, recentLoading, show }) => {
  if (!show) return null;
  return (
    <section className="soft-half background--light-secondary">
      {(recentLoading || (!recentLoading && recentLikes && recentLikes.length)) && (
      <div className="one-whole text-center">
        <h5 className="flush soft-bottom">Recently Liked By Others</h5>
      </div>
        )}
      {recentLoading && (
        <div className="text-center" data-spec="loading">
          <Loading />
        </div>
      )}
      {recentLikes && <RecentLikes likes={recentLikes} />}
    </section>
  );
};

RenderRecentLikes.propTypes = {
  recentLikes: PropTypes.object,
  recentLoading: PropTypes.bool,
  show: PropTypes.bool,
};

const Layout = ({ featuredItems, textItems, recentLikes, recentLoading }) => (
  <div style={{ overflowY: "hidden", height: "100%" }} className="background--light-primary">
    <section className="hard background--light-secondary">
      <h6 className="push-left hard-bottom soft-top">Recommended by NewSpring</h6>
    </section>

    <section className="soft-half background--light-secondary">
      <div className="grid flush">
        {featuredItems &&
          featuredItems.map((item, i) => (
            <FeedItemCard
              key={i}
              item={item}
              onClick={inAppLink}
              link={item.meta.urlTitle}
              disableLike
            />
          ))}
      </div>
    </section>

    <RenderRecentLikes
      recentLikes={recentLikes}
      recentLoading={recentLoading}
      show={!process.env.WEB}
    />

    {textItems && (
      <div className="soft-half background--light-secondary">
        <div className="card soft one-whole">
          <div className="card__item">
            <p className="flush">
              <small>
                <em>
                  Are you looking for&nbsp;
                  {textItems.map((x, i) => {
                    let delimeter = ", ";
                    if (textItems[i].id === textItems[textItems.length - 1].id) {
                      delimeter = "";
                    } else if (textItems[i].id === textItems[textItems.length - 2].id) {
                      delimeter = " or ";
                    }

                    return (
                      <span key={i}>
                        <Link to={x.meta.urlTitle}>{x.title}</Link>
                        {delimeter}
                      </span>
                    );
                  })}?
                </em>
              </small>
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

Layout.propTypes = {
  featuredItems: PropTypes.array,
  textItems: PropTypes.array,
  recentLikes: PropTypes.array,
  recentLoading: PropTypes.bool,
};

export default Layout;

export { RenderRecentLikes, getImage };
