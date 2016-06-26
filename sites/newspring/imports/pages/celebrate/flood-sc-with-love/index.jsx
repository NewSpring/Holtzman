
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

const floodNumbers = [
  { count: "730,000", label: "Bottles of Water" },
  { count: "1,900", label: "Volunteers" },
  { count: "160", label: "Homes restored" },
  { count: "101", label: "Thanksgiving meals/groceries purchased" },
  { count: "88", label: "Shelters supplied with food and water" },
  { count: "$422,201.56", label: "Given in donations" },
]

let primary = "#0088BB",
    secondary = "#006290";

const Fuse = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="background--light-primary soft-double-top@lap-and-up" style={{overflow: "visible"}}>
      <Stats>

        <FitText compressor={1.5}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",

            }}
          >
            Your hard work restored
          </h3>
        </FitText>

        <FitText compressor={.2}>
          <h1 className="uppercase text-light-primary" style={{
            fontWeight: "900",
            color: primary,
          }}>
            160
          </h1>
        </FitText>

        <FitText compressor={.4}>
          <h1 className="uppercase push-back-top text-light-primary" style={{
            fontWeight: "900",
            color: primary,
          }}>
              Homes
          </h1>
        </FitText>

        <FitText compressor={1.3}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            destroyed in the flood
          </h3>
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



    </div>

    <div className="soft-double-ends push-double-ends soft-sides text-center">
      <div className="grid" style={{ verticalAlign: "middle" }}>
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-04.jpg" />

        <Body>
          <blockquote>
            <p>
              When the flood hit in 2015, I was overwhelmed.
            </p>
          </blockquote>
          <p>
            "When the flood hit in 2015, I was overwhelmed. I couldn’t handle it by myself. What impressed me was that a NewSpring volunteer came on his own to help us with the mold and flooding in the basement. He prayed with me, and the next Sunday I went to church. The week after that, I gave my life to Jesus. It’s been completely different. I smile more. I am more relaxed. I know I can have a relationship with the Lord, and he will guide me through the darkness of the world in which we live."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Michael Walsh, Columbia Campus
          </h6>
        </Body>
      </div>

    </div>

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >#FloodSCWithLove:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >Saved People Serve People</h5>

    <List items={floodNumbers} />
    </div>
  </div>
)

export default Fuse
