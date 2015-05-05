$(document).ready ->
  $.Velocity
    .RegisterEffect "transition.fillScreen",
      defaultDuration: 1000
      calls: [
        [
          {
            left: "-50%"
            top: "-50%"
            width: "200%"
            height: "200%"
          }
        ]
      ]
