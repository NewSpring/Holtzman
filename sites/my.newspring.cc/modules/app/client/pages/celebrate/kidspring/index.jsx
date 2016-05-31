
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
import List from "../components/list"

const kidspringNumbers = [
  { count: "6,366", label: "Average Weekely Attendance" },
  { count: "13,344", label: "First Timers" },
]

const KidSpring = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="background--primary soft-double-top@lap-and-up" style={{overflow: "visible"}}>
      <Stats>
        <FitText compressor={1.5}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            Each week in 2015, an average of
          </h3>
        </FitText>

        <FitText compressor={.3}>
        <h1 className="uppercase text-light-primary" style={{
          fontWeight: "900",
        }}>
            6,366
        </h1>
        </FitText>

        <FitText compressor={.25}>
        <h1 className="uppercase push-back-top text-light-primary" style={{
          fontWeight: "900",
        }}>
            Kids
        </h1>
        </FitText>

        <FitText compressor={1.5}>
        <h3
          className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          heard about Jesus on their level
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
      <div className="grid grid--rev" style={{ verticalAlign: "middle" }}>
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-10.jpg" />

        <Body rev={true}>
          <blockquote>
            <p>
              She wanted to know she would spend eternity with Jesus.
            </p>
          </blockquote>
          <p>
            "Easter 2015 was special for me because I was able to lead my daughter, who is 7, in a prayer of salvation at home that night while we were getting ready for bed. It all stemmed from what she heard at church that day. I was so thankful for the story that KidSpring shared because I knew it was on her level where she understood it, and she knew from the service she wanted to know she would spend eternity with Jesus."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Jada and Ava Barnette, Greenville Campus
          </h6>
        </Body>
      </div>

    </div>

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >KidSpring:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >Meeting Jesus on Their Level</h5>

    <List items={kidspringNumbers} />
    </div>
  </div>
)

export default KidSpring
