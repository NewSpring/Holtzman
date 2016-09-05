
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

const fuseNumbers = [
  { count: "4,539", label: "Students" },
  { count: "1,066", label: "Salvations" },
  { count: "1,544", label: "Baptisms" },
  { count: "1,324", label: "Volunteers" },
]

const Fuse = () => (
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
            At Gauntlet X we saw
          </h3>
        </FitText>

        <FitText compressor={.3}>
          <h1 className="uppercase text-light-primary" style={{
            fontWeight: "900",
          }}>
              1,066
          </h1>
        </FitText>

        <FitText compressor={.65}>
          <h1 className="uppercase push-back-top text-light-primary" style={{
            fontWeight: "900",
          }}>
              Salvations
          </h1>
        </FitText>

        <FitText compressor={1.7}>
          <h3
            className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
              fontSize: "23px"
            }}
          >
            because you cared about
          </h3>
        </FitText>

        <FitText compressor={.55}>
          <h1 className="uppercase text-light-primary" style={{
            fontSize: "53px",
            fontWeight: "900",
          }}>
              Students
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
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/KhaleeBeard.jpg" />

        <Body>
          <blockquote>
            <p >
               I have a lot more joy in my life now.
            </p>
          </blockquote>

          <p>
            "People thought I had been saved and I knew Jesus, but the reality was that I didn’t. At Gauntlet X, I realized I knew Him in my head but not in my heart. I prayed to receive Christ and was baptized in the ocean. I am really a different person. I was really insecure all throughout high school, but I have a lot more joy in my life now."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Khalee Beard, Columbia Campus
          </h6>
        </Body>
      </div>

    </div>

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >Gauntlet X:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >Every Story Matters To God</h5>

      <List items={fuseNumbers} />
    </div>
  </div>
)

export default Fuse
