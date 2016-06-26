
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

const Closing = () => (
  <div className="background--primary soft-top display-inline-block text-center one-whole" style={{
      overflow: "hidden"
    }}>

    <Stats>
      <FitText compressor={1.1}>
        <h3
          className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
            fontSize: "22px"
          }}
        >
          Because you listened to
        </h3>
      </FitText>

      <FitText compressor={.35}>
        <h1 className="uppercase flush-bottom text-light-primary" style={{
          fontSize: "80px",
          fontWeight: "900",
        }}>
          Jesus
        </h1>
      </FitText>

      <FitText compressor={1.1}>
        <h3
          className="flush-bottom push-double-bottom text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
            fontSize: "26px"
          }}
        >
          and did what He said,
        </h3>
      </FitText>

      <FitText compressor={1.1}>
        <h3
          className="flush-bottom soft-half-bottom text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
            fontSize: "25px"
          }}
        >
          we impacted our
        </h3>
      </FitText>

      <FitText compressor={.33}>
        <h1 className="uppercase flush-bottom text-light-primary" style={{
          fontSize: "63px",
          fontWeight: "900",
        }}>
          State
        </h1>
      </FitText>

      <div className="soft-top display-inline-block">
        <Logo size="60px" color="text-light-primary" />
      </div>


    </Stats>

    <div className="soft-double-bottom one-whole"></div>

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
          marginRight: "20px",
        }}
      />

    </Leaves>

    <div className="push-double-ends soft-double-ends"></div>


  </div>
)


export default Closing
