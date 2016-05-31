
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

const Serving = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="background--primary soft-double-top@lap-and-up" style={{overflow: "visible"}}>
      <Stats>

        <FitText compressor={1.3}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            Each week
          </h3>
        </FitText>

        <FitText compressor={.3}>
          <h1 className="uppercase text-light-primary" style={{
            fontWeight: "900",
          }}>
            5,270
          </h1>
        </FitText>

        <FitText compressor={1.3}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            served by being a
          </h3>
        </FitText>

        <FitText compressor={.7}>
          <h1 className="uppercase text-light-primary" style={{
            fontWeight: "900",
          }}>
            Volunteer
          </h1>
        </FitText>
      </Stats>


      <div className="soft-double-ends"></div>
      <Leaves>
        <SolidLeaf
          className="locked-bottom locked-right"
          size="200px"
          color="text-secondary"
          style={{
            transform: "rotate(-225deg)",
            marginBottom: "-50px",
            marginRight: "-150px",
          }}
        />
        <SolidLeaf
          className="locked-bottom locked-right"
          size="130px"
          color="text-tertiary"
          style={{
            transform: "rotate(-270deg)",
            marginBottom: "-100px",
            marginRight: "-10px",
          }}
        />
        <StripedLeaf
          className="locked-bottom locked-right"
          size="90px"
          color="text-tertiary"
          style={{
            transform: "rotate(180deg)",
            marginBottom: "60px",
            marginRight: "-20px",
          }}
        />

        <SolidLeaf
          className="locked-bottom locked-left"
          size="250px"
          color="text-secondary"
          style={{
            transform: "rotate(-135deg)",
            marginBottom: "-90px",
            marginLeft: "-150px",
          }}
        />

        <StripedLeaf
          className="locked-bottom locked-left"
          size="120px"
          color="text-tertiary"
          style={{
            transform: "rotate(-90deg)",
            marginBottom: "-20px",
            marginLeft: "0px",
          }}
        />

      </Leaves>



    </div>

    <div className="soft-double-ends push-double-ends soft-sides text-center">
      <div className="grid" style={{ verticalAlign: "middle" }}>
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-09.jpg" />

        <Body>
          <p>
            "It’s an indescribable feeling to know that I was a part of setting up a blank room on a Sunday morning and watch families walk in with their kids ready for church"
          </p>
          <h6
            className="italictext-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Kandi Kreiner, Boiling Springs Campus
          </h6>
        </Body>
      </div>

    </div>

  </div>
)

export default Serving
