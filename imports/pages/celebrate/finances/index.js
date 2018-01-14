// @flow
import { Link } from "react-router";

import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import ProgressBar from "../../../components/giving/giving-progress";
import Story from "../components/story";
// import { Leaves } from "../components/layout";
// import { SolidLeaf, StripedLeaf } from "../components/leaves";

const fundData = [
  { campus: "Aiken", amount: 492202.38 },
  { campus: "Anderson", amount: 14034355.56 },
  { campus: "Boiling Springs", amount: 1243993.92 },
  { campus: "Charleston", amount: 3268977.86 },
  { campus: "Clemson", amount: 1232141.32 },
  { campus: "Columbia", amount: 4657366.47 },
  { campus: "Florence", amount: 2884996.14 },
  { campus: "Greenville", amount: 8224077.56 },
  { campus: "Greenwood", amount: 1820647.55 },
  { campus: "Hilton Head", amount: 338145.47 },
  { campus: "Myrtle Beach", amount: 2317189.53 },
  { campus: "Northeast Columbia", amount: 555401.77 },
  { campus: "Powdersville", amount: 2583636.26 },
  { campus: "Rock Hill", amount: 476788.68 },
  { campus: "Spartanburg", amount: 3136052.53 },
  { campus: "Sumter", amount: 288200.25 },
];

// -1 for rounding correction
const generalFundAmountTotal =
  fundData.reduce((acc, fund) => acc + fund.amount, 0) - 1;
const overflowOfferingTotal = "4567422.90";

/* eslint-disable max-len */
export const Finances = () => {
  let count = 0;
  return (
    <div>
      <Meta title="Finances" />
      {/* Header */}
      <div className="background--primary text-center text-light-primary soft-double-ends">
        <h3 className="push-top soft-half-sides">
          General Tithes and Offerings
        </h3>
        <div className="push-half-bottom">
          <div className="display-inline-block">
            <FitText compressor={1.5} maxFontSize={18}>
              <Currency
                amount={generalFundAmountTotal.toString()}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
                roundCurrency
              />
            </FitText>
          </div>
        </div>
        <div className="floating push-right push-bottom">
          <div className="grid floating__item three-quarters@lap-wide-and-up nine-tenths@lap-and-up text-center">
            {fundData.map(({ campus, amount }, key) => {
              count += 1;
              if (count === fundData.length && count % 2 === 1) {
                return (
                  <div
                    className="soft-left two-fifths@lap-and-up push-half-bottom"
                    key={key}
                  >
                    <div className="grid__item one-whole">
                      <ProgressBar
                        theme={"dark"}
                        title={campus}
                        total={amount.toString()}
                        percentDone={100 * (amount / generalFundAmountTotal)}
                        style={{}}
                        key={key}
                      />
                    </div>
                  </div>
                );
              }
              if (count <= fundData.length / 2) {
                return (
                  <div
                    className="grid__item two-fifths@lap-and-up push-half-bottom"
                    key={key}
                  >
                    <div className="grid__item one-whole">
                      <ProgressBar
                        theme={"dark"}
                        title={campus}
                        total={amount.toString()}
                        percentDone={100 * (amount / generalFundAmountTotal)}
                        style={{}}
                        key={key}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className="grid__item two-fifths@lap-and-up push-half-bottom"
                  key={key}
                >
                  <div className="grid__item one-whole">
                    <ProgressBar
                      theme={"dark"}
                      title={campus}
                      total={amount.toString()}
                      percentDone={100 * (amount / generalFundAmountTotal)}
                      style={{}}
                      key={key}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {
          // <div
          //   style={{
          //     position: "absolute",
          //     top: "800px",
          //     right: "0",
          //   }}
          //   className="visuallyhidden@handheld visuallyhidden@lap one-half display-inline-block"
          // >
          //   <Leaves>
          //     <SolidLeaf
          //       className="locked-bottom locked-right"
          //       size="200px"
          //       color="text-secondary"
          //       style={{
          //         transform: "rotate(225deg)",
          //         marginBottom: "-80px",
          //         marginRight: "-50px",
          //       }}
          //     />
          //     <SolidLeaf
          //       className="locked-bottom locked-right"
          //       size="100px"
          //       color="text-primary"
          //       style={{
          //         transform: "rotate(90deg)",
          //         marginBottom: "-55px",
          //         marginRight: "170px",
          //       }}
          //     />
          //     <SolidLeaf
          //       className="locked-bottom locked-right"
          //       size="200px"
          //       color="text-tertiary"
          //       style={{
          //         transform: "rotate(0deg)",
          //         marginBottom: "-170px",
          //         marginRight: "-10px",
          //       }}
          //     />
          //     <StripedLeaf
          //       className="locked-bottom locked-right"
          //       size="120px"
          //       color="text-secondary"
          //       style={{
          //         transform: "rotate(270deg)",
          //         marginBottom: "-180px",
          //         marginRight: "150px",
          //       }}
          //     />
          //   </Leaves>
          // </div>
        }
      </div>
      <div className="background--light-primary text-center soft-double-top">
        <h3 className="push-top push-half-bottom">
          Giving to Overflow Offering
        </h3>
        {
          // <p className="text-center">
          //   <i>for land and buildings</i>
          // </p>
        }
        <div className="push-top">
          <FitText compressor={1.5} maxFontSize={18}>
            <Currency
              amount={overflowOfferingTotal}
              baseHeadingSize="1"
              className="display-inline-block text-center soft-bottom text-dark-primary"
              style={{ fontWeight: "900" }}
            />
          </FitText>
        </div>
        <div className="floating">
          <div className="soft-double-sides soft-sides@handheld text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
            <hr
              className="push-ends"
              style={{ borderTop: "1px solid #dddddd" }}
            />
          </div>
          <h3 className="push-top push-half-bottom">
            Your Generosity Makes a Difference
          </h3>
          <Story
            image={
              "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/20172Kenya-110.jpg"
            }
            content={`
              <p>NewSpring made a new commitment in 2017 to give 10 percent of tithes to support community organizations, ministries, and churches. Following the pledge, that amount totaled <strong>$1.6 million</strong>.</p>
              <p>CARE for AIDS got $75,000 — in addition to $288,000 given in the Overflow Offering — to provide medical care, job training and the hope of the Gospel to families in Kenya and Tanzania dealing with HIV/AIDS. The combined total was the largest gift in the organization’s history.</p>
              <p>Learn about the work of <a href="https://newspring.cc/news/how-our-newspring-family-is-embracing-african-families-living-with-hiv-aids">CARE for AIDS</a>...</p>
              `}
            overriddenHeader={
              "Care for AIDS benefits from our Kingdom mentality"
            }
          />
        </div>
      </div>

      <div className="soft-ends background--light-secondary">
        <div className="grid push-ends">
          <div className="grid__item text-center one-half@lap-and-up one-whole">
            <h3
              className="italic"
              style={{
                fontFamily: "ff-meta-serif-web-pro, serif",
                color: "#bc9b67",
              }}
            >
              We had
            </h3>
            <FitText compressor={0.5}>
              <h1
                className="uppercase flush-bottom soft-half-bottom"
                style={{
                  fontWeight: "900",
                }}
              >
                5,400
              </h1>
            </FitText>
            <h3>First time givers</h3>
          </div>
          <div className="grid__item text-center one-half@lap-and-up">
            <h3
              className="italic"
              style={{
                fontFamily: "ff-meta-serif-web-pro, serif",
                color: "#bc9b67",
              }}
            >
              and
            </h3>
            <FitText compressor={0.5}>
              <h1
                className="uppercase flush-bottom soft-half-bottom"
                style={{
                  fontWeight: "900",
                }}
              >
                18,173
              </h1>
            </FitText>
            <div className="floating text-center">
              <h3 className="floating__item push-half-bottom">
                Households that gave $250 or more.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div
        className="soft-ends"
        style={{
          backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/2x1.audit.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "36em",
        }}
      />
      <div className="background--light-primary soft">
        <h3 className="text-center push-top">Annual Audit</h3>
        <p className="constrain-copy text-center">
          NewSpring is audited annually by an external accounting firm according
          to Generally Accepted Accounting Principles. God calls His people to
          live above reproach, so for us, the annual audit is a financial and
          spiritual responsibility (<a
            href={
              "https://www.bible.com/search/bible?q=philippians%202:15&version_id=111"
            }
            alt={"Philippians 2:15"}
            target={"_blank"}
          >
            Philippians 2:15
          </a>).
        </p>
        <br />
        <p className="constrain-copy text-center push-bottom">
          We&#39;ll update this section in May after the Audit is complete. If
          you have any questions not answered here, please email us at
          finance@newspring.cc.
        </p>
        {
          // TODO: Update once 2017 Audit is Complete
          // <div className="text-center">
          //   <a
          //     className="btn push-bottom"
          //     target={"_blank"}
          //     href="https://s3.amazonaws.com/ns.assets/apollos/annual+report/2016/2016+Audit.pdf"
          //     onClick={inAppLink}
          //   >
          //     Detailed Report
          //   </a>
          // </div>
        }
      </div>
      <div className="background--primary text-center text-light-primary soft">
        <h3 className="push-double-top">Keep Reading</h3>
        <Link
          className="btn--light push-double-bottom"
          to="/annualreport/next-steps"
        >
          Go To Next Steps Report
        </Link>
      </div>
    </div>
  );
};

const Routes = [
  {
    path: "finances",
    component: Finances,
  },
];

export default {
  Finances,
  Routes,
};
