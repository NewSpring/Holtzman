
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

const newspringNetworkNumbers = [
  { count: "58,903", label: "Resources Downloaded" },
  { count: "38,073", label: "Church Leaders in NewSpring Network" },
]

const NewSpringNetwork = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="background--primary soft-double-top@lap-and-up" style={{overflow: "visible"}}>
      <Stats>
        <FitText compressor={1.1}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            You helped over
          </h3>
        </FitText>

        <FitText compressor={.4}>
          <h1 className="uppercase text-light-primary" style={{
            fontWeight: "900",
          }}>
              38,073
          </h1>
        </FitText>

        <FitText compressor={.5}>
          <h1 className="uppercase push-back-top text-light-primary" style={{
            fontWeight: "900",
          }}>
            Church
          </h1>
        </FitText>

        <FitText compressor={.55}>
          <h1 className="uppercase push-back-top text-light-primary" style={{
            fontWeight: "900",
          }}>
            Leaders
          </h1>
        </FitText>

        <FitText compressor={1.1}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
              fontSize: "21px"
            }}
          >
            through NewSpring Network
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
        <Image url="https://s3.amazonaws.com/ns.assets/apollos/annual+report/JoeyGraves.jpg" />

        <Body rev={true}>

          <p>
            “In 2015, NTC Church moved to KidSpring Curriculum. We loved the idea of beginning small groups at a young age. We also loved the idea of live actors with video for consistency. It has affected our kids tremendously! They are having fun. They are learning more, and they are inviting. Kids are asking their parents about Christ and about baptism. In fact, we have had many complaints from parents that “my kids put up a fight when it’s time to leave!”
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
          Joey Graves, Lead Pastor NTC Church
          </h6>
        </Body>
      </div>

    </div>

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >NewSpring Network</h3>

    <List items={newspringNetworkNumbers} />
    </div>
  </div>
)

export default NewSpringNetwork
