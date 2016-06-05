
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

const missionNumbers = [
  { count: "14,424", label: "Students got school supply packs" },
  { count: "31,477", label: "Pounds of Food Given" },
  // { count: "47", label: "Salvations on Mission Trips" },
]

const Missions = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="background--primary soft-double-top@lap-and-up" style={{overflow: "visible"}}>
      <Stats>
        <FitText compressor={1.4}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
              fontSize: "25px"
            }}
          >
            With your help, we saw
          </h3>
        </FitText>


        <FitText compressor={.2}>
          <h1 className="uppercase text-light-primary" style={{
            fontSize: "150px",
            fontWeight: "900",
          }}>
              47
          </h1>
        </FitText>

        <FitText compressor={.7}>
          <h1 className="uppercase push-back-top text-light-primary" style={{
            fontSize: "40px",
            fontWeight: "900",
          }}>
            Salvations
          </h1>
        </FitText>

        <FitText compressor={1.4}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
              fontSize: "21px"
            }}
          >
            on NewSpring Mission Trips
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
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/MichelleCarson9.jpg" />

        <Body>
          <p>
            "My daughter Quintasia was telling me that the church was giving away some book bags, and I didn’t want them to go without because I couldn’t afford a book bag. If I hadn't gone to the school that day, I would never have started going to NewSpring, and I wouldn’t have given my life to God. I can feel God working in my life because a lot of things have changed. I know I have people who care about me, and if I need to talk to someone I can. I don’t feel alone."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
          The Carson Family, Powdersville Campus
          </h6>
        </Body>
      </div>

    </div>

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >Missions:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >Every Name Has a Story</h5>

    <List items={missionNumbers} />
    </div>
  </div>
)

export default Missions
