/*global Meteor, check */
import { api } from "../../../util/rock"
import { Sessions } from "../../../collections"
import { makeNewGuid } from "../../../util/guid"
import Moment from "moment"

Meteor.methods({
  "rock/routes/log": function(path, title) {
    check(path, String)
    check(title, String)

    let user = this.userId
    if (!user) {
      return
    }

    let session = Sessions.findOne({ userId: this.userId }, {
      sort: {
        updatedAt: -1
      }
    })

    if (!session) {
      return
    }

    const { ip, _id } = session

    let Session = {
      SessionId: makeNewGuid(),
      IpAddress: ip,
      Guid: makeNewGuid(),
      ForeignKey: _id
    }


    // this may not be possible yet :(
    return

    let PageViewSessionId = api.get.sync(`PageViewSessions?$filter=ForeignKey eq '${_id}'`)

    if (PageViewSessionId.statusText || !PageViewSessionId.length) {
      PageViewSessionId = api.post.sync("PageViewSessions", Session)
    } else {
      PageViewSessionId = PageViewSessionId[0].Id
    }

    console.log(PageViewSessionId)


    user = Meteor.users.findOne(user)
    user || (user = { services: { rock: {} } })

    const { PrimaryAliasId } = user.services.rock

    if (PrimaryAliasId) {
      let PageView = {
        PageViewSessionId,
        SiteId: api._.siteId,
        PersonAliasId: PrimaryAliasId,
        DateTimeViewed: `${Moment().toISOString()}`,
        Url: path,
        PageTitle: title,
        Guid: makeNewGuid()
      }

      console.log(PageView)

      // api.post("PageViews", PageView, (err, data) => {
      //   console.log(err, data)
      // })
    }

    return
  }
})
