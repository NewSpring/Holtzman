/* DayPicker styles */
const Styles = () => (
  <style>{`\
    .DayPicker {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
              flex-wrap: wrap;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
          -ms-flex-pack: center;
              justify-content: center;
      position: relative;
      background-color: #f7f7f7;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
    }

    .DayPicker:focus {
      outline: none;
    }

    .DayPicker-Day:focus {
      outline: none;
    }

    .DayPicker-Month {
      width: 100%;
      display: table;
      border-collapse: collapse;
      border-spacing: 10px;
      border-spacing: 0;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;


    }

    .DayPicker-NavBar){
        position: absolute;
        left: 0;
        right: 0;
        padding: 1em;
      }

      .DayPicker-NavButton {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        cursor: pointer;
        top: 1rem;
      }

        .DayPicker-NavButton--prev {
          left: 1rem;
          background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcmV2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InByZXYiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjM5MzE5MywgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMy4zOTMxOTMsIC0yNS4wMDAwMDApIHRyYW5zbGF0ZSgwLjg5MzE5MywgMC4wMDAwMDApIiBmaWxsPSIjNTY1QTVDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsNDkuMTIzNzMzMSBMMCw0NS4zNjc0MzQ1IEwyMC4xMzE4NDU5LDI0LjcyMzA2MTIgTDAsNC4yMzEzODMxNCBMMCwwLjQ3NTA4NDQ1OSBMMjUsMjQuNzIzMDYxMiBMMCw0OS4xMjM3MzMxIEwwLDQ5LjEyMzczMzEgWiIgaWQ9InJpZ2h0IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
        }

        .DayPicker-NavButton--next {
          right: 1rem;
          background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5uZXh0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Im5leHQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUxNDUxLCAwLjAwMDAwMCkiIGZpbGw9IiM1NjVBNUMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMCw0OS4xMjM3MzMxIEwwLDQ1LjM2NzQzNDUgTDIwLjEzMTg0NTksMjQuNzIzMDYxMiBMMCw0LjIzMTM4MzE0IEwwLDAuNDc1MDg0NDU5IEwyNSwyNC43MjMwNjEyIEwwLDQ5LjEyMzczMzEgTDAsNDkuMTIzNzMzMSBaIiBpZD0icmlnaHQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
        }


      .DayPicker-Caption {
        display: table-caption;
        text-align: center;
        padding: 1em;
        font-family: "colfax-web";
        font-weight: 700;
        font-size: 1.125em;
        line-height: 1.25;
        color: #6bac43;
      }

      .DayPicker-Weekdays {
        display: table-header-group;
      }

        .DayPicker-WeekdaysRow {
          display: table-row;
        }

          .DayPicker-Weekday {
            display: table-cell;
            padding: .5rem;
            font-size: .875em;
            text-align: center;
            font-family: "colfax-web";
            font-weight: 500;
            color: #858585;
          }

      .DayPicker-Body {
        display: table-row-group;
        background-color: #fff;

      }

        .DayPicker-Week {
          display: table-row;
        }

          .DayPicker-Day {
            display: table-cell;
            padding: .75em;
            text-align: center;
            cursor: pointer;
            vertical-align: middle;
            color: #858585;
            font-family: "colfax-web";
            font-weight: 700;
            font-size: .825em
          }

      .DayPicker--interactionDisabled .DayPicker-Day {
        cursor: default;
      }

    /* Default modifiers */

    .DayPicker-Day--today {
      font-weight: 500;
      color: #6bac43;
    }

    .DayPicker-Day--disabled {
      color: #dddddd;
      cursor: default;
    }

    .DayPicker-Day--outside {
      cursor: default;
      color: #dddddd;
    }

    /* Example modifiers */

    /*.DayPicker-Day--sunday {
      color: #dce0e0;
      background-color: #f7f8f8;
    }*/

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      color: #fff;
      background-color: #6bac43;
    }
  `}</style>
);

export default Styles;
