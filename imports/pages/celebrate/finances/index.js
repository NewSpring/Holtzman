// @flow
import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import ProgressBar from "../../../components/giving/giving-progress";

// const dynamicSize = (text) => {
//   if (text.length < 4) {
//     return 0.2;
//   }
//
//   if (text.length < 6) {
//     return 0.35;
//   }
//
//   if (text.length < 8) {
//     return 0.4;
//   }
//
//   if (text.length < 10) {
//     return 0.5;
//   }
//
//
//   if (text.length < 12) {
//     return 0.6;
//   }
//
//   return 0.7;
// };

const generalFundAmountTotal = 1600000.00;
const fundData = [
  { campus: "Aiken", amountString: "100000", amountValue: 100000 },
  { campus: "Anderson", amountString: "100000", amountValue: 100000 },
  { campus: "Boiling Springs", amountString: "100000", amountValue: 100000 },
  { campus: "Charleston", amountString: "100000", amountValue: 100000 },
  { campus: "Clemson", amountString: "100000", amountValue: 100000 },
  { campus: "Columbia", amountString: "100000", amountValue: 100000 },
  { campus: "Florence", amountString: "100000", amountValue: 100000 },
  { campus: "Greenville", amountString: "100000", amountValue: 100000 },
  { campus: "Greenwood", amountString: "100000", amountValue: 100000 },
  { campus: "Hilton Head", amountString: "100000", amountValue: 100000 },
  { campus: "Myrtle Beach", amountString: "100000", amountValue: 100000 },
  { campus: "Northeast Columbia", amountString: "100000", amountValue: 100000 },
  { campus: "Powdersville", amountString: "100000", amountValue: 100000 },
  { campus: "Rock Hill", amountString: "100000", amountValue: 100000 },
  { campus: "Spartanburg", amountString: "100000", amountValue: 100000 },
  { campus: "Sumter", amountString: "100000", amountValue: 100000 },
];
const stepUpFundTotal = "4,567,422.90";

/* eslint-disable max-len */
const Finances = () => {
  let count = 0;
  return (
    <div>
      <Meta title="Finances" />
      {/* Header */}
      <div className="background--primary outlined--top outlined--light text-center text-light-primary soft-double-top soft-double-bottom">
        <h3 className="">Giving to General Fund</h3>
        <div className="push-half-bottom">
          {/* <h3 className="display-inline-block">$</h3> */}
          <div className="display-inline-block">
            <FitText compressor={1} maxFontSize={18}>
              <Currency
                amount={generalFundAmountTotal.toFixed(2)}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
              />
              {/*
              <h1
                className="uppercase flush-bottom soft-half-bottom"
                style={{
                  fontWeight: "900",
                }}
              >
                {generalFundAmount}
              </h1>
              */}
            </FitText>
          </div>
          {/* <h3 className="display-inline-block">.00</h3> */}
        </div>
        <div className="floating push-right">
          <div className="grid floating__item two-thirds@lap-and-up text-center">
            {fundData.map(({ campus, amountString, amountValue }, key) => {
              count += 1;
              if (count <= fundData.length / 2) {
                return (
                  <div className="grid__item one-half@lap-and-up push-half-bottom">
                    <div className="grid__item one-whole">
                      <ProgressBar
                        theme={"dark"}
                        title={campus}
                        total={amountString}
                        percentDone={100 * (amountValue / generalFundAmountTotal)}
                        style={{}}
                        key={key}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <div className="grid__item one-half@lap-and-up push-half-bottom">
                  <div className="grid__item one-whole">
                    <ProgressBar
                      theme={"dark"}
                      title={campus}
                      total={amountString}
                      percentDone={100 * (amountValue / generalFundAmountTotal)}
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
      <div className="background--light-primary text-center soft-double">
        <h3>Giving to Step Up</h3>
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
      </div>
      <div className="one-whole floating text-center background--light-secondary soft-double-top soft-double-bottom">
        <div className="grid two-thirds@lap-and-up floating__item">
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
                3,000
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
                4,000
              </h1>
            </FitText>
            <div className="floating text-center">
              <h3 className="two-thirds@lap-and-up floating__item">Households who gave $250 or more.</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="soft-double">
        <h3 className="text-center">Annual Audit</h3>
        <p className="constrain-copy push-bottom">NewSpring is audited annually by an external accounting firm according to Generally Accepted Accounting Principles. God calls His people to live above reproach, so for us, the annual audit is a financial and spiritual responsibility (Philippians 2:15)</p>
        <p className="constrain-copy">We&#39;ll update this section in May after the audit is complete. If you have any questions not answered here, please email us at finance@newspring.cc.</p>
      </div>
      <div className="background--primary text-center text-light-primary soft-double">
        <h3>Keep Reading</h3>
        <p>Up next in the NewSpring 2016 Annual Report is information on Next Steps.</p>
        <a className="btn--light">Go To Next Steps Report</a>
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
