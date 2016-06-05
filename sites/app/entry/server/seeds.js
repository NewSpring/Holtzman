import { Sections } from "apollos/core/collections";

const gridItems = [
  {
    name:"Series",
    path:"/series",
    link: "/series", // coexist with current app menu
    offsite: "//newspring.cc/series",
    external: false, // coexists with current app menu
    children: false,
  },
  {
    name:"Articles",
    path:"/articles",
    link: "/articles", // coexist with current app menu
    offsite: "//newspring.cc/articles",
    external: false, // coexists with current app menu
    children: false,
  },
  {
    name:"Devotionals",
    path:"/devotions",
    link: "/devotions", // coexist with current app menu
    offsite: "//newspring.cc/devotionals",
    external: false, // coexists with current app menu
    children: false,
  },
  {
    name:"Give",
    path:"/give",
    offsite: "//my.newspring.cc/give",
    external: "//my.newspring.cc/give", // coexists with current app menu
    image:"//dg0ddngxdz549.cloudfront.net/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/give.ways.inservice2.png",
    children: {
      give: {
        path: "/give",
        name: "Give Now",
        image: "//dg0ddngxdz549.cloudfront.net/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/give.ways.inservice2.png",
      },
      history: {
        name: "Giving History",
        path: "/give/history",
        image: "https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/tithing.pattern_1700_850_90_c1.jpg"
      },
      schedules: {
        name: "Reccuring Giving",
        path: "/give/recurring",
        image: "https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/1040.hero_1700_723_90_c1.jpg"
      }
    },
  },
  {
    name:"Stories",
    path:"/stories",
    link: "/stories", // coexist with current app menu
    external: false, // coexists with current app menu
    offsite: "//newspring.cc/stories",
    children: false,
  },
  {
    name:"Music",
    path:"/music",
    link: "/music", // coexist with current app menu
    external: false, // coexists with current app menu
    offsite: "//my.newspring.cc/albums",
  },
  // {
  //   name:"Next Steps",
  //   path: false,
  //   offsite: "//newspring.cc/nextsteps",
  //   external: "//newspring.cc/nextsteps", // coexists with current app menu
  //   image:"//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/editorial/articles/newspring.blog.hero.discipline.jogging.5_1700_850_90_c1.jpg"
  // },
  // {
  //   name:"Groups",
  //   path: false,
  //   offsite: "//newspring.cc/groups",
  //   external: "//newspring.cc/groups", // coexists with current app menu
  //   image:"//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.groups-flipped_1700_850_90_c1.jpg"
  // },
  // {
  //   name: "Profile",
  //   path: "/profile",
  //   link: "/profile", // coexist with current app menu
  //   external: false,
  //   image: "https://s3.amazonaws.com/ns.images/all/member_images/members.nophoto.green.jpg"
  // }
]

// clear sections and re add
Sections.remove({}, () => {
  let count = 0
  gridItems.map((item) => {
    item.order = count
    count++
    Sections.insert(item);
  });
});
