// @flow
import { Link } from "react-router";

import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import ProgressBar from "../../../components/giving/giving-progress";
import inAppLink from "../../../util/inAppLink";
import Story from "../components/story";

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
const stepUpFundTotal = "4567422.90";

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
      </div>
      <div className="background--light-primary text-center soft-double-top">
        <h3 className="push-top push-half-bottom">Land and Building Giving</h3>
        <p className="text-center">
          <i>for land and buildings</i>
        </p>
        <div className="push-top">
          <FitText compressor={1.5} maxFontSize={18}>
            <Currency
              amount={stepUpFundTotal}
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
          <Story
            image={
              "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/stories/story-img2.1.png"
            }
            content={`<p>"We gave to the Clemson building campaign because we saw NewSpring's impact on our own daughter when she was at college. We're excited to see the lives that will be changed in and around Clemson and from all over the world because of the new campus."</p>`}
            overriddenHeader={"Meet givers Carol and Laurie Brown from Sumter"}
          />
        </div>
      </div>

      <div className="soft-ends background--light-secondary">
        <div className="grid push-ends">
          <div className="grid__item one-half@lap-and-up one-whole">
            <h3
              className="italic"
              style={{
                fontFamily: "ff-meta-serif-web-pro, serif",
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
            <h3>first time givers</h3>
          </div>
          <div className="grid__item one-half@lap-and-up">
            <h3
              className="italic"
              style={{
                fontFamily: "ff-meta-serif-web-pro, serif",
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
                households gave.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="background--light-primary soft">
        <h3 className="text-center push-top">Annual Audit</h3>
        <p className="constrain-copy push-bottom">
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
        <div className="text-center">
          <a
            className="btn push-bottom"
            target={"_blank"}
            href="https://s3.amazonaws.com/ns.assets/apollos/annual+report/2016/2016+Audit.pdf"
            onClick={inAppLink}
          >
            Detailed Report
          </a>
        </div>
      </div>
      <div className="background--primary text-center text-light-primary soft">
        <h3 className="push-double-top">Keep Reading</h3>
        <p>
          Up next in the NewSpring 2016 Annual Report is information on Next
          Steps.
        </p>
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
