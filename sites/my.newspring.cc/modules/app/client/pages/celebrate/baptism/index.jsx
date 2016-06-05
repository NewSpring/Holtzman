
import {
  OutlinedLeaf,
  SolidLeaf,
  StripedLeaf,
  Logo,
} from "../components/leaves"

import {
  Stats,
  Leaves,
  Image,
  Body,
} from "../components/layout"

import FitText from "../components/fit-text"

let primary = "#0088BB",
    secondary = "#006290";

const Baptism = () => (
  <div className="display-inline-block text-center one-whole" style={{ overflow: "hidden" }}>

    <Stats>
      <FitText compressor={1.4}>
        <h3
          className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          We saw
        </h3>
      </FitText>

      <FitText compressor={.3}>
        <h1 className="uppercase text-light-primary" style={{
          fontWeight: "900",
          color: primary,
        }}>
            5,253
        </h1>
      </FitText>

      <FitText compressor={1.6}>
        <h3
          className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          people go public for Jesus through
        </h3>
      </FitText>

      <FitText compressor={.55}>
        <h1 className="uppercase text-light-primary" style={{
          fontWeight: "900",
          color: primary,
        }}>
            Baptisms
        </h1>
      </FitText>

    </Stats>

    <div className="soft-double-ends"></div>

    <Leaves>
      <SolidLeaf
        className="locked-bottom locked-right"
        size="200px"
        style={{
          transform: "rotate(-225deg)",
          marginBottom: "-50px",
          marginRight: "-150px",
          color: secondary,
        }}
      />
      <SolidLeaf
        className="locked-bottom locked-right"
        size="130px"
        style={{
          transform: "rotate(-270deg)",
          marginBottom: "-100px",
          marginRight: "-10px",
          color: primary,
        }}
      />
      <StripedLeaf
        className="locked-bottom locked-right"
        size="90px"
        style={{
          transform: "rotate(180deg)",
          marginBottom: "60px",
          marginRight: "-20px",
          color: primary,
        }}
      />

      <SolidLeaf
        className="locked-bottom locked-left"
        size="250px"
        style={{
          transform: "rotate(-135deg)",
          marginBottom: "-90px",
          marginLeft: "-150px",
          color: secondary,
        }}
      />

      <StripedLeaf
        className="locked-bottom locked-left"
        size="120px"
        style={{
          transform: "rotate(-90deg)",
          marginBottom: "-20px",
          marginLeft: "0px",
          color: primary,
        }}
      />

    </Leaves>


    <div className="soft-double-ends push-double-ends soft-sides text-center">
      <div className="grid grid--rev@lap-wide-and-up" style={{ verticalAlign: "middle" }}>
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-07.jpg" />

        <Body rev={true}>
          <p>
            "My husband met Jesus at NewSpring in Florence and he tried to convince me for four years to come. I attended a Presbyterian church my whole life, but in 2015, I finally gave in and we started attending NewSpring as a family. I prayed with my two children to ask Jesus into their lives, and they wanted to be baptized with their father. I realized baptism by immersion was my next step, too. Baptism was our way of saying, 'We are a family, and we are following Jesus no matter what.'"
          </p>
          <h6
            className="italictext-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            The Crowley Family, Florence Campus
          </h6>
        </Body>
      </div>

    </div>
  </div>
)

export default Baptism
