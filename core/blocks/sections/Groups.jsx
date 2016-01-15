
import Item from "./Item"

const Groups = ({ items }) => (
  <section className="hard-sides soft-ends">
    {items.map((section, i) => {
      return <Item sections={sections} key={i} />
    })}
  </section>
)
