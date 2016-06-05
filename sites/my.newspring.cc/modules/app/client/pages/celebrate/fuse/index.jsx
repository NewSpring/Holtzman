
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
  { count: "4,286", label: "Average Weekely Attendance" },
  { count: "3,982", label: "Salvations" },
  { count: "13,427", label: "First Timers" },
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
            Each week in 2015, an average of
          </h3>
        </FitText>

        <FitText compressor={.3}>
        <h1 className="uppercase text-light-primary" style={{
          fontWeight: "900",
        }}>
            4,286
        </h1>
        </FitText>

        <FitText compressor={.55}>
        <h1 className="uppercase push-back-top text-light-primary" style={{
          fontWeight: "900",
        }}>
            Students
        </h1>
        </FitText>

        <FitText compressor={1.5}>
        <h3
          className="flush-bottom push-back-half-top soft-bottom text-tertiary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          got to belong at Fuse
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
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/BrooklinKuipers.jpg" />

        <Body rev={true}>
          <p>
            "My parents were in the middle of a huge divorce in 2015.  Fuse was the best environment for me, my sister, and my brother. Fuse held us together, and stopped us from falling apart. Everybody was so fun and loving all the time. I felt like I actually belonged. Meeting Jesus helped me see that God actually loves me at a time when I was questioning what real love looked like."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Brooklin Kuipers, Aiken Campus
          </h6>
        </Body>
      </div>

    </div>

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >Fuse:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >The Next Generation</h5>

    <List items={fuseNumbers} />
    </div>
  </div>
)

export default Fuse
