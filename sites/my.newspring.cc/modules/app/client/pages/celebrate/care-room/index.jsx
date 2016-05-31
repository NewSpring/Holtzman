
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

const CareRoom = () => (
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
            With your help,
          </h3>
        </FitText>

        <FitText compressor={.3}>
          <h1 className="uppercase text-light-primary" style={{
            fontWeight: "900",
          }}>
            13,162
          </h1>
        </FitText>

        <FitText compressor={1.3}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            people received care at a NewSpring Campus
          </h3>
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
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-05.jpg" />

        <Body>
          <blockquote>
            <p>
              A few months later, my wife and I were remarried.
            </p>
          </blockquote>
          <p>
            "I returned to NewSpring for the first time in years in February 2015. I felt like God said 'Just get to the care room and talk to someone,' so I did. For the first time in my life I opened up and confessed everything — the affair, the suicidal tendencies, and everything else. I told the volunteer I knew the reason I acted the way I did was because I wasn't saved, and he asked 'What are you waiting for?' I accepted Christ into my heart and life. A few months later, my wife and I were remarried."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Jake and Kristy Tilley, Anderson Campus
          </h6>
        </Body>
      </div>

    </div>
  </div>
)

export default CareRoom
