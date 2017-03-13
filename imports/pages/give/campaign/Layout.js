// @flow
/* eslint-disable react/no-danger */
// $FlowMeteor
import { find } from "ramda";
import { Link } from "react-router";

import Split, { Left, Right } from "../../../components/@primitives/layout/split";
import Meta from "../../../components/shared/meta";
import AddToCart from "../../../components/giving/add-to-cart";

type ILayout = {
  account: Object,
};

const Layout = ({ account }: ILayout) => (
  <div>
    <Split nav classes={["background--light-primary"]}>
      <Meta
        title={account.name}
        description={account.summary}
        image={
          account.images ? find(account.images, { fileLabel: "2:1" }).cloudfront : account.image
        }
        meta={[
          { property: "og:type", content: "article" },
        ]}
      />

      <Right
        background={
          account.images ?
            find(account.images, { fileLabel: "2:1" }).cloudfront :
            account.image
        }
        mobile
      />
      <Right
        background={
          account.images ?
            find(account.images, { fileLabel: "1:2" }).cloudfront :
            account.image
        }
        mobile={false}
      />

    </Split>
    <Left scroll classes={["background--light-primary"]}>
      <Link
        to="/give/now"
        className={
          "locked-top locked-left soft-double@lap-and-up soft " +
          "h7 text-dark-secondary plain visuallyhidden@handheld"
        }
      >
        <i
          className="icon-arrow-back soft-half-right display-inline-block"
          style={{ verticalAlign: "middle" }}
        />
        <span
          className="display-inline-block"
          style={{ verticalAlign: "middle", marginTop: "5px" }}
        >
          Back
        </span>
      </Link>
      <div className="soft@lap-and-up soft-double-top@lap-and-up">
        <div className="soft soft-double-bottom soft-double-top@lap-and-up">

          <h2>{account.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: account.description }} />
        </div>
      </div>

      <div className="background--light-secondary">
        <div className="constrain-copy soft-double@lap-and-up">
          <div className="soft soft-double-bottom soft-double-top@lap-and-up">
            <AddToCart accounts={[account]} donate />
          </div>
        </div>
      </div>

    </Left>
  </div>
);

export default Layout;
