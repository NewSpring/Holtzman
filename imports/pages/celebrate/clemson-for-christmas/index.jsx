
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

const giveNumbers = [
  { count: "$64,297,130", label: "Total Income" },
  { count: "$7,602,781", label: "Step Up Offering" },
  { count: "$3,819,908", label: "Total Given to Missions" },
  { count: "$3,165,713", label: "Clemson For Christmas" },
]

const ClemsonForChristmas = () => (
  <div className="display-inline-block text-center one-whole ">
    <div className="soft-double-top@lap-and-up" style={{overflow: "visible"}}>
      <Stats>
        <FitText compressor={1.2}>
          <h3
            className="flush-bottom soft-half-bottom soft-double-top text-dark-secondary italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            Because of your generosity, we raised
          </h3>
        </FitText>

        <FitText compressor={.5}>
        <h1 className="uppercase text-primary" style={{
          fontWeight: "900",
        }}>
          $3,165,713
        </h1>
        </FitText>

        <FitText compressor={1.2}>
        <h3
          className="flush-bottom push-back-half-top soft-bottom text-dark-secondary italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          during our year end offering - Clemson for Christmas
        </h3>
        </FitText>
      </Stats>


      <div className="soft-double-top push-double-top@lap-wide-and-up push-top"></div>
      {/*
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
          color="text-secondary"
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
      */}


    </div>
    {/*

    <div className="soft-double-ends push-double-ends soft-sides text-center">
      <div className="grid" style={{ verticalAlign: "middle" }}>

        <div className="grid__item one-half@lap-wide-and-up one-whole two-thirds@lap soft@lap-and-up soft-double-ends@lap-and-up soft-double-top">
          <p className="flush-bottom">
            "I thought being Christian was about being a good person and checking off a list of things. At the Best Weekend Ever service at the Clemson Campus, I realized I didn’t have a relationship with Jesus. I didn’t remember a time I accepted him into my life. I didn’t want to live with doubt any longer. A permanent facility in Clemson is so exciting because I know it will reach students like me."
          </p>
        </div>
      </div>

    </div>

    */}

    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >Giving:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >You Can't Outgive God</h5>

      <List items={giveNumbers} />
    </div>


  </div>
)

export default ClemsonForChristmas
