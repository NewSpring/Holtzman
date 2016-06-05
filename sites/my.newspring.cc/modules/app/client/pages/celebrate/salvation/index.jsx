
import {
  OutlinedLeaf,
  SolidLeaf,
  StripedLeaf,
  Logo,
} from "../components/leaves"

import {
  Image,
  Body,
} from "../components/layout"

import FitText from "../components/fit-text"
import List from "../components/list"

const salvationList = [
  { count: "11,130", label: "Total Salvations" },
  { count: "3,982", label: "Student Salvations at Fuse and Gauntlet" },
]

const Salvation = () => (
  <div style={{ overflow: "hidden" }}>

    <div className="soft soft-double-bottom@lap-and-up push-double-ends text-center">

      <div className="grid" style={{ verticalAlign: "middle" }}>
        <Image url="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016.annualreport-11.jpg" />

        <Body>
          <p >
            "The year 2015 was the worst year and best year of my life. I went through a divorce, a lot of depression and lost my job. I thought my world was crashing down. When I started going to church it was hard to believe that Jesus loves all people, even somebody as messed up as me. I realized that I couldn’t do things by myself anymore, and I couldn’t live life on my own. At Easter, I felt like it was time to ask Jesus into my life."
          </p>
          <h6
            className="italic text-dark-primary text-left"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif"
            }}
          >
            Jamie Hill, Anderson Campus
          </h6>
        </Body>
      </div>

    </div>



    <div className="hard-sides soft-ends background--light-secondary soft-double-ends@lap-wide-and-up">

      <h3
        className="text-center soft-half-top flush-bottom"
      >Salvations:</h3>

      <h5
        className="text-center soft-half-bottom flush-bottom italic"
        style={{fontFamily: "ff-meta-serif-web-pro, serif"}}
      >Every Number has a Name</h5>

      <List items={salvationList} />

    </div>
  </div>
)

export default Salvation
