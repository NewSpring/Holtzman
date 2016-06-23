
import Item from "./Item"

const Groups = ({ items, hide }) => (
  <section className="hard-sides soft-half-ends">
    {items.map((section, i) => {
      return <Item sections={section} key={i} hide={hide} />
    })}
  </section>
)

export default Groups
