// @flow

import { MiniCard } from "../../@primitives/UI/cards";
import type { IGroup } from "./";

/* eslint-disable */
export default ({ groups, loading = false }: { groups: IGroup[], loading: boolean }) =>
  loading || !groups || !groups.length ? null : (
    <div className="soft-half-sides soft-half-top soft-double-top@lap-and-up soft-bottom soft-double-bottom@lap-and-up">
      <h3 className="push-ends text-center">Groups You Lead</h3>

      <div className="" style={{ maxWidth: "480px", margin: "0 auto" }}>
        {groups &&
          groups.length &&
          groups.map(g => (
            <MiniCard title={g.name} link={`/groups/${g.id}`} image={g.photo} key={g.id} />
          ))}
      </div>
    </div>
  );
/* eslint-enable */
