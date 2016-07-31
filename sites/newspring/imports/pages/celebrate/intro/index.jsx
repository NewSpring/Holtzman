
import {
  OutlinedLeaf,
  SolidLeaf,
  StripedLeaf,
  Logo,
} from "../components/leaves"

import {
  Stats,
  Leaves
} from "../components/layout"

import FitText from "../components/fit-text"

const Intro = ({ width, height }) => (
  <div className="background--primary soft-top display-inline-block text-center one-whole" style={{
      overflow: "hidden"
    }}>

    <Stats>

      <div className="relative" style={{zIndex: 99}}>
        <FitText compressor={1.1}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            We had a lot to
          </h3>
        </FitText>

        <FitText compressor={0.73}>
          <h1 className="uppercase flush-bottom text-light-primary" style={{
            fontWeight: "900",
          }}>
              Celebrate In
          </h1>
        </FitText>

        <FitText compressor={.23}>
          <h1 className="uppercase flush-bottom text-light-primary" style={{
            fontWeight: "900",
          }}>
            2015
          </h1>
        </FitText>

        <FitText compressor={1.1}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            because of you
          </h3>
        </FitText>

        <div className="soft-top display-inline-block">
          <Logo size="60px" color="text-light-primary" />
        </div>
      </div>
    </Stats>

    <Leaves>
      <SolidLeaf
        className="locked-bottom locked-left"
        size="200px"
        color="text-tertiary"
        style={{
          transform: "rotate(45deg)",
          marginBottom: "-130px",
          marginLeft: "10px",
        }}
      />
      <SolidLeaf
        className="locked-bottom locked-left"
        size="200px"
        color="text-secondary"
        style={{
          transform: "rotate(-90deg)",
          marginBottom: "-50px",
          marginLeft: "-150px",
        }}
      />
      <StripedLeaf
        className="locked-bottom locked-left"
        size="70px"
        color="text-tertiary"
        style={{
          transform: "rotate(-90deg)",
          marginBottom: "30px",
          marginLeft: "10px",
        }}
      />
      <SolidLeaf
        className="locked-bottom locked-right"
        size="300px"
        color="text-tertiary"
        style={{
          transform: "rotate(-270deg)",
          marginBottom: "-100px",
          marginRight: "-240px",
        }}
      />

      <StripedLeaf
        className="locked-bottom locked-right"
        size="90px"
        color="text-secondary"
        style={{
          transform: "rotate(-135deg)",
          marginBottom: "-20px",
          marginRight: "30px",
        }}
      />

    </Leaves>

    <div className="soft-double-ends push-double-ends"></div>


    <Stats>
      <FitText compressor={1.1}>
      <h3
        className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
        style={{
          fontFamily: "ff-meta-serif-web-pro, serif",
        }}
      >
        See how you were a
      </h3>
      </FitText>

      <FitText compressor={.65}>
        <h1 className="uppercase flush-bottom text-light-primary" style={{
          fontWeight: "900",
        }}>
          Difference
        </h1>
      </FitText>

      <FitText compressor={.4}>
      <h1 className="uppercase flush-bottom text-light-primary" style={{
        fontWeight: "900",
      }}>
        Maker!
      </h1>
      </FitText>
    </Stats>
    <div className="soft-double-ends"></div>

  </div>
)


export default Intro
