// @flow
import { Link } from "react-router";

import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import ProgressBar from "../../../components/giving/giving-progress";
import Story from "../components/story";

const fundData = [
  { campus: "Aiken", amount: 730435.15 },
  { campus: "Anderson", amount: 11243591.08 },
  { campus: "Boiling Springs*", amount: 309139.0 },
  { campus: "Central", amount: 98323.65 },
  { campus: "Charleston", amount: 2586687.61 },
  { campus: "Clemson", amount: 1888688.38 },
  { campus: "Columbia", amount: 4344099.72 },
  { campus: "Florence", amount: 2312139.63 },
  { campus: "Greenville", amount: 6518651.54 },
  { campus: "Greenwood", amount: 1401734.45 },
  { campus: "Hilton Head", amount: 394393.01 },
  { campus: "Myrtle Beach", amount: 1680226.18 },
  { campus: "Northeast Columbia", amount: 477516.62 },
  { campus: "Powdersville", amount: 2758991.23 },
  { campus: "Rock Hill", amount: 427965.39 },
  { campus: "Spartanburg", amount: 3305614.0 },
  { campus: "Sumter*", amount: 89416.38 },
  { campus: "Web", amount: 230173.23 },
];

const generalFundAmountTotal = 40797789.0;
const overflowOfferingTotal = "1180357.03";

/* eslint-disable max-len */
export const Finances = () => {
  let count = 0;
  return (
    <div className="text-dark-primary">
      <Meta title="Finances" />
      {/* Header */}
      <div className="background--primary text-center text-light-primary soft-double-ends">
        <h3 className="push-top soft-half-sides">General Tithes and Offerings</h3>
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
                  <div className="soft-left two-fifths@lap-and-up push-half-bottom" key={key}>
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
                  <div className="grid__item two-fifths@lap-and-up push-half-bottom" key={key}>
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
                <div className="grid__item two-fifths@lap-and-up push-half-bottom" key={key}>
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
        <div className="soft-sides">
          <small className="text-center">
            <em>* Boiling Springs campus merged with Spartanburg campus on March 5.</em>
          </small>
          <br />
          <small className="text-center">
            <em>* Sumter campus closed on May 28.</em>
          </small>
        </div>
      </div>
      <div className="background--light-primary text-center soft-double-top soft-sides">
        <h3 className="push-top push-half-bottom">Giving to Overflow Offering</h3>
        {}
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
              className="visuallyhidden@handheld push-ends"
              style={{ borderTop: "1px solid #dddddd" }}
            />
          </div>
          <h3 className="push-top push-bottom">Your Generosity Makes a Difference</h3>
          <Story
            image={"//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/Kenya.jpg"}
            content={`
              <p style="font-family: colfax-web"><strong style="font-family: colfax-web">CARE for AIDS</strong> benefits from our kingdom mentality.</p>
              <p style="font-family: colfax-web">NewSpring made a new commitment in 2017 to give 10 percent of tithes to support community organizations, ministries, and churches. Following the pledge, that amount totaled <strong style="font-family: colfax-web">$1.6 million</strong>.</p>
              <p style="font-family: colfax-web">CARE for AIDS got $75,000 — in addition to $288,000 given in the Overflow Offering — to provide medical care, job training, and the hope of the Gospel to families in Kenya and Tanzania dealing with HIV/AIDS. The combined total was the largest gift in the organization’s history.</p>
              `}
            linkUrl={
              "https://newspring.cc/news/how-our-newspring-family-is-embracing-african-families-living-with-hiv-aids"
            }
            linkClass={"h6 btn--small@next btn--dark-secondary"}
            linkText={"Learn about the work of CARE for AIDS"}
          />
        </div>
      </div>

      <div className="soft-ends background--light-secondary floating">
        <div className="grid push-double-ends three-quarters@lap-wide-and-up nine-tenths@lap soft-sides@handheld floating__item">
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
                2,975
              </h1>
            </FitText>
            <h3>first-time givers</h3>
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
                13,749
              </h1>
            </FitText>
            <div className="floating text-center">
              <h3 className="floating__item push-half-bottom">
                households that gave $250 or more.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div
        className="soft-ends visuallyhidden@handheld"
        style={{
          backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/audit_2x1.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50em",
        }}
      />
      <div
        className="soft-ends visuallyhidden@lap-and-up"
        style={{
          backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/audit_1x1.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "25em",
        }}
      />
      <div className="background--light-primary soft-sides soft-double-ends">
        <h3 className="text-center push-top">Annual Audit</h3>
        <p style={{ fontFamily: "colfax-web" }} className="constrain-copy text-center">
          NewSpring is audited annually by an external accounting firm according to Generally
          Accepted Accounting Principles. God calls His people to live above reproach, so for us,
          the annual audit is a financial and spiritual responsibility (<a
            href={"https://www.bible.com/search/bible?q=philippians%202:15&version_id=111"}
            alt={"Philippians 2:15"}
            target={"_blank"}
          >
            Philippians 2:15
          </a>).
        </p>
        <br />
        <p style={{ fontFamily: "colfax-web" }} className="constrain-copy text-center push-bottom">
          We&#39;ll update this section in May after the audit is complete. If you have any
          questions not answered here, please email us at finance@newspring.cc.
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
        <Link className="btn--light push-double-bottom" to="/annualreport/next-steps">
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
