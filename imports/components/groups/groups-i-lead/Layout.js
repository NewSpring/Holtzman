// @flow

import { MiniCard } from "../../@primitives/UI/cards";
import inAppLink from "../../../util/inAppLink";
import type { IGroup } from "./";

export default ({ groups, loading = false }: { groups: IGroup[], loading: boolean}) => loading || !groups || !groups.length ? null : (
  <div
    className="soft-half-sides soft-half-top soft-double-top@lap-and-up soft-bottom soft-double-bottom@lap-and-up"
  >
    <h3 className="push-ends text-center">
      Groups I Lead
    </h3>

    <div className="" style={{maxWidth: "480px", margin: "0 auto"}}>
      {groups && groups.length && groups.map(g => (
        <MiniCard
          title={g.name}
          link={`/groups/${g.id}`}
          image={g.photo}
          key={g.id}
        />
      ))}
    </div>

    <div className="one-whole text-center">
      <a
        href="//rock.newspring.cc/groups/leader"
        className="btn--dark-tertiary push-half-top push-half-bottom push-bottom@lap-and-up"
        onClick={inAppLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Leader Toolbox
      </a>
    </div>
  </div>
);
