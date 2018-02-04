import Story from "../../components/story";

/* eslint-disable max-len */
const Rally = () => (
  <div className="background--dark-primary soft-double-bottom@lap-and-up soft-bottom">
    <div className="soft-double-top@lap-and-up text-center">
      <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
        <div className="one-whole">
          <div className="constrain-copy">
            <div
              className="push-double-bottom visuallyhidden@handheld"
              style={{
                backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Logos/rally_logo.svg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "15em",
              }}
            />
            <div
              className="push-double-bottom visuallyhidden@lap-and-up"
              style={{
                backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Logos/rally_logo.svg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "10em",
              }}
            />
            <p
              className="text-center text-light-primary push-double-bottom@handheld"
              style={{ fontFamily: "colfax-web" }}
            >
              In 2017, NewSpring launched Rally, a ministry for 18-to-25-year-olds.
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Story
              image={
                "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/Brianna_Yon.jpg"
              }
              content={`
                <p style="font-family: colfax-web"><strong style="font-family: colfax-web">Brianna Yon</strong> of <strong style="font-family: colfax-web">NewSpring Greenville</strong> rallied around Jesus with hundreds of others at monthly gatherings.</p>
                <p style="font-family: colfax-web">“I saw a clear example of how loving God looks: Different races coming together under one name, to serve one name, to worship one name — and that’s Jesus."</p>
                `}
              contentClass={"text-light-primary"}
            />
          </div>
        </div>
        {/* Image Gallery */}
        <div className="one-whole floating soft-top soft-double-bottom visuallyhidden@handheld">
          <div
            className="floating__item two-thirds"
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.1.2x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "25em",
              border: "1px solid white",
            }}
          />
          <div
            className="floating__item one-third"
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.2.1x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "25em",
              border: "1px solid white",
            }}
          />
          <div
            className="floating__item one-third"
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.3.1x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "25em",
              border: "1px solid white",
            }}
          />
          <div
            className="floating__item two-thirds"
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.4.2x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "25em",
              border: "1px solid white",
            }}
          />
        </div>
        <div className="soft-top soft-double-bottom visuallyhidden@lap-and-up">
          <div
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.1.1x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "15em",
              border: "1px solid white",
            }}
          />
          <div
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.2.1x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              height: "15em",
              border: "1px solid white",
            }}
          />
          <div
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.3.1x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              height: "15em",
              border: "1px solid white",
            }}
          />
          <div
            style={{
              backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Rally/rally.4.1x1.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "15em",
              border: "1px solid white",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Rally;
