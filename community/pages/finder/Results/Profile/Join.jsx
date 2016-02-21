

import Forms from "../../../../../core/components/forms"

const Join = ({ group, onExit, onClick, person }) => (
  <div className="soft soft-double-ends one-whole text-center">

    <h4 className="text-center push-ends">
      Request to Join {group.name}
    </h4>

    <Forms.Form
      id="message-form"
      classes={["hard"]}
      submit={onClick}
    >
      <Forms.TextArea
        label="Your Message"
        name="message"
        classes={["hard-bottom", "push-half-ends"]}
        style={{border: "none"}}
        inputClasses="text-dark-secondary"
        rows={16}
        defaultValue={"\nHi there,\n\nPraesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n\nThanks!"}
      />

      <Forms.Input
        name="name"
        hideLabel={true}
        placeholder="Your Name Here"
        defaultValue={person.firstName ? `${person.nickName || person.firstName} ${person.lastName}` : ""}
      />

      <div className="grid">
        <div className="grid__item one-half">
          <button className="btn--thin btn--small btn--dark-tertiary one-whole" onClick={onExit}>
            Cancel
          </button>
        </div>
        <div className="grid__item one-half">
          <button type="submit" className="one-whole btn" >
            Send
          </button>
        </div>
      </div>
    </Forms.Form>
  </div>
)

export default Join
