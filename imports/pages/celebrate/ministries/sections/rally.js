import Story from "../../components/story";

/* eslint-disable max-len */
const Rally = () => (
  <div className="background--dark-primary">
    <div className="soft-double-top@lap-and-up soft-top text-center">
      <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
        <div className="one-whole">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom" style={{ color: "#FFFFFF" }}>
              Rally
            </h1>
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
      </div>
    </div>
  </div>
);

export default Rally;
