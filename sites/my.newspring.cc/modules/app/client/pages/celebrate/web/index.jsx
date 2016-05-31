
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

const webNumbers = [
  { count: "3,581,508", label: "Total Unique Users (All sites + apps)" },
]

const Web = () => (
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
            We filled Death Valley and Williams Brice combined over
          </h3>
        </FitText>


        <FitText compressor={.2}>
          <h1 className="uppercase flush-bottom text-light-primary" style={{
            fontSize: "150px",
            fontWeight: "900",
          }}>
            22
          </h1>
        </FitText>

        <FitText compressor={.4}>
          <h1 className="uppercase push-back-top push-back-double-top@lap-wide-and-up text-light-primary" style={{
            fontSize: "40px",
            fontWeight: "900",
          }}>
            times
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
            with people on our sites and apps
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
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-03.jpg" />

        <Body rev={true}>
          <p>
            "I was talking with a childhood friend in South Carolina who I reconnected with through Facebook, and she told me about NewSpring.  I checked out the website right after we spoke, and I have watched online live (almost!) every Sunday since then. On the morning of the Feb. 22, 2015, I realized that I didn’t know Christ and I bowed my head and prayed to Jesus. I can honestly say that my life hasn’t been the same since then."
          </p>
          <h6
            className="italic text-dark-primary"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
          Maria Suppa, Montreal, Canada
          </h6>
        </Body>
      </div>

    </div>
    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >Web</h3>


      <List items={webNumbers} />
    </div>
  </div>
)

export default Web
