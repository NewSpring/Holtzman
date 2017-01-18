// @flow
import { Link } from "react-router";

import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import ProgressBar from "../../../components/giving/giving-progress";
import Story from "../components/story";

const generalFundAmountTotal = 49221808.98;
const fundData = [
  { campus: "Aiken", amount: 492701.46 },
  { campus: "Anderson", amount: 14015345.70 },
  { campus: "Boiling Springs", amount: 1242511.92 },
  { campus: "Central", amount: 155652.91 },
  { campus: "Charleston", amount: 3267866.49 },
  { campus: "Clemson", amount: 1232783.48 },
  { campus: "Columbia*", amount: 4657572.66 },
  { campus: "Florence", amount: 2887278.55 },
  { campus: "Greenville", amount: 8117428.25 },
  { campus: "Greenwood", amount: 1818359.97 },
  { campus: "Hilton Head", amount: 353690.47 },
  { campus: "Lexington*", amount: 1267439.66 },
  { campus: "Myrtle Beach", amount: 2314687.53 },
  { campus: "Northeast Columbia", amount: 556184.78 },
  { campus: "Powdersville", amount: 2584053.46 },
  { campus: "Rock Hill", amount: 476468.63 },
  { campus: "Spartanburg", amount: 3125883.42 },
  { campus: "Sumter", amount: 264265.33 },
  { campus: "Web", amount: 391634.31 },
];
const stepUpFundTotal = "1,781,928.15";

/* eslint-disable max-len */
export const Finances = () => {
  let count = 0;
  return (
    <div>
      <Meta title="Finances" />
      {/* Header */}
      <div className="background--primary text-center text-light-primary soft-double-ends">
        <h3 className="push-top soft-half-sides">Giving to General Fund</h3>
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
              if (count === fundData.length && (count % 2 === 1)) {
                return (
                  <div className="soft-left one-half@lap-and-up push-half-bottom" key={key}>
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
                  <div className="grid__item one-half@lap-and-up push-half-bottom" key={key}>
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
                <div className="grid__item one-half@lap-and-up push-half-bottom" key={key}>
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
          <small className="text-center"><em>* This is where the copy for the Columbia & Lexington merger should go.</em></small>
        </div>
      </div>
      <div className="background--light-primary text-center soft-double-top">
        <h3 className="push-top push-half-bottom">Giving to Step Up</h3>
        <em>for land and buildings</em>
        <div className="push-top">
          <FitText compressor={1} maxFontSize={18}>
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
            <hr className="visuallyhidden@handheld push-ends" style={{ borderTop: "1px solid #dddddd" }} />
            <Story
              image={"//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/stories/story-img1.png"}
              content={"<p>&#34;We gave to the Clemson building campaign because we saw NewSpring's impact on our own daughter when she was at college. We're excited to see the lives that will be changed in and around Clemson and from all over the world because of the new campus.&#34;</p>"}
              name={"Carol and Laurie Brown"}
              location={"Sumter"}
              heading={"Meet givers"}
            />
          </div>
        </div>
      </div>
      <div className="one-whole floating text-center background--light-secondary soft-sides soft-double-ends">
        <div className="grid three-quarters@lap-wide-and-up floating__item push-ends">
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
            <h3>First time givers</h3>
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
              <h3 className="floating__item push-half-bottom">Households who gave $250 or more.</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="background--light-primary soft">
        <h3 className="text-center push-top">Annual Audit</h3>
        <p className="constrain-copy push-bottom">NewSpring is audited annually by an external accounting firm according to Generally Accepted Accounting Principles. God calls His people to live above reproach, so for us, the annual audit is a financial and spiritual responsibility (Philippians 2:15)</p>
        <p className="constrain-copy push-bottom soft-half-bottom">We&#39;ll update this section in May after the audit is complete. If you have any questions not answered here, please email us at finance@newspring.cc.</p>
      </div>
      <div className="background--primary text-center text-light-primary soft">
        <h3 className="push-double-top">Keep Reading</h3>
        <p>Up next in the NewSpring 2016 Annual Report is information on Next Steps.</p>
        <Link className="btn--light push-double-bottom" to="/celebrate/next-steps">
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
