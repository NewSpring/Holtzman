type ISvg = {
  classes: string,
  fill: string,
  height: string,
  name: string,
  title: string,
  width: string
};

const getIcon = (fill, height, name, title, width) => {
  const icons = {
    arrowDown: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 12"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M18 12c.02-.26-.07-.52-.26-.72L7.54 1.12c-.35-.35-.92-.35-1.28 0-.35.35-.35.92 0 1.27L15.9 12l-9.64 9.6c-.35.36-.35.93 0 1.28.36.35.93.35 1.28 0l10.2-10.16c.2-.2.28-.46.26-.72z"
            id={name}
          />
        </defs>
        <use fill={fill} fillRule="nonzero" transform="rotate(90 15 9)" xlinkHref={`#${name}`} />
      </svg>
    ),
    arrowUp: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 12"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M18 12c.02-.26-.07-.52-.26-.72L7.54 1.12c-.35-.35-.92-.35-1.28 0-.35.35-.35.92 0 1.27L15.9 12l-9.64 9.6c-.35.36-.35.93 0 1.28.36.35.93.35 1.28 0l10.2-10.16c.2-.2.28-.46.26-.72z"
            id={name}
          />
        </defs>
        <use fill={fill} fillRule="nonzero" transform="rotate(-90 9 9)" xlinkHref={`#${name}`} />
      </svg>
    ),
    campus: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M20.33 22v-9.17h.84c.5 0 .83.34.83.84v7.5c0 .5-.33.83-.83.83h-.84zm-16.66-.83V22h-.84c-.5 0-.83-.33-.83-.83v-7.5c0-.5.33-.84.83-.84h.84v8.34zM17.83 2c.5 0 .84.33.84.83v18.34c0 .5-.34.83-.84.83h-5v-3.33h-1.66V22h-5c-.5 0-.84-.33-.84-.83V2.83c0-.5.34-.83.84-.83h11.66zm-7.5 14.17V14.5h-2.5v1.67h2.5zm0-3.34v-1.66h-2.5v1.66h2.5zm0-3.33V7.83h-2.5V9.5h2.5zm0-3.33V4.5h-2.5v1.67h2.5zm5.84 10V14.5h-2.5v1.67h2.5zm0-3.34v-1.66h-2.5v1.66h2.5zm0-3.33V7.83h-2.5V9.5h2.5zm0-3.33V4.5h-2.5v1.67h2.5z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    error: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M22.9 20.53L12.9 1.5c-.36-.66-1.44-.66-1.78 0l-10 19.03c-.17.3-.16.7.02 1 .2.3.5.47.86.47h20c.35 0 .68-.18.86-.48.18-.3.2-.68.03-1zM12 19c-.55 0-1-.45-1-1 0-.56.45-1 1-1s1 .44 1 1c0 .55-.45 1-1 1zm1-4h-2V7.96h2V15z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    groups: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M17 2c2.2 0 4 1.8 4 4v1c0 2.2-1.8 4-4 4-.55 0-1.06-.1-1.54-.3.35-.84.54-1.75.54-2.7V7c0-1.57-.53-3-1.4-4.18.67-.5 1.5-.82 2.4-.82zM9 13c-2.76 0-5-2.24-5-5V7c0-2.76 2.24-5 5-5s5 2.24 5 5v1c0 2.76-2.24 5-5 5zm13.84 1.4c.7.33 1.16 1.04 1.16 1.82V19c0 .55-.45 1-1 1h-3.05c-.22-2.98-2.28-5.5-5.2-6.25-.36-.1-.74-.18-1.12-.26 1.02-.3 2.17-.5 3.37-.5 2.35 0 4.55.8 5.84 1.4zM17 22H1c-.55 0-1-.45-1-1v-.48c0-2.27 1.53-4.27 3.73-4.83C5.2 15.3 7.03 15 9 15c1.98 0 3.8.3 5.27.7 2.2.55 3.73 2.55 3.73 4.82V21c0 .55-.45 1-1 1z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    home: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" id={name} />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    list: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M3.62 10.4c-.9 0-1.62.7-1.62 1.6 0 .9.72 1.6 1.62 1.6.9 0 1.62-.7 1.62-1.6 0-.9-.72-1.6-1.62-1.6zm0-6.4C2.72 4 2 4.7 2 5.6c0 .9.72 1.6 1.62 1.6.9 0 1.62-.7 1.62-1.6 0-.9-.72-1.6-1.62-1.6zm0 12.8c-.9 0-1.62.73-1.62 1.6 0 .87.74 1.6 1.62 1.6.9 0 1.62-.73 1.62-1.6 0-.87-.72-1.6-1.62-1.6zm3.24 2.67H22v-2.14H6.86v2.14zm0-6.4H22v-2.14H6.86v2.14zm0-8.54v2.14H22V4.53H6.86z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    locate: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    location: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M12 1c-4.4 0-9 3.4-9 9 0 5.3 8 13.4 8.3 13.7.2.2.4.3.7.3.3 0 .5-.1.7-.3.3-.3 8.3-8.4 8.3-13.7 0-5.6-4.6-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    map: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M21.67 3.16c.25.17.33.4.33.66v14.73c0 .4-.25.73-.58.8l-5.25 1.5V4.38L20.92 3c.25 0 .58 0 .75.16zM14.5 4.4v16.44l-5-1.23V3.17l5 1.23zM7.83 3.15V19.6L3.08 21h-.25c-.16 0-.33-.08-.5-.16-.25-.17-.33-.4-.33-.66V5.45c0-.32.25-.65.58-.8l5.25-1.5z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    profile: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zM8 10c0-2.2 1.84-4 4-4s4 1.8 4 4v1c0 2.2-1.84 4-4 4s-4-1.8-4-4v-1zm4 12c-2.43 0-4.67-.88-6.4-2.33C6.44 18.1 8.08 17 10 17h4c1.92 0 3.56 1.1 4.4 2.67C16.67 21.12 14.43 22 12 22z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    search: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M23.7 20.88l-4.36-4.37C20.4 14.94 21 13.05 21 11c0-5.5-4.5-10-10-10S1 5.5 1 11s4.5 10 10 10c2.04 0 3.93-.6 5.5-1.66l4.38 4.37c.4.4 1.02.4 1.4 0l1.43-1.4c.4-.4.4-1.03 0-1.42zM3 11c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    tag: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M22.7 12.3l-11-11c-.18-.2-.43-.3-.7-.3H2c-.55 0-1 .45-1 1v9c0 .27.1.52.3.7l11 11c.2.2.44.3.7.3.26 0 .5-.1.7-.3l9-9c.4-.38.4-1.02 0-1.4zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
    time: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {title}
        </title>
        <defs>
          <path
            d="M12 2C6.46 2 2 6.48 2 12s4.47 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
            id={name}
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id={`${name}_b`} fill="#fff">
            <use xlinkHref={`#${name}`} />
          </mask>
          <use fill="#444" fillRule="nonzero" xlinkHref={`#${name}`} />
          <path d="M0 0h24v24H0z" mask={`url(#${name}_b)`} fill={fill} />
        </g>
      </svg>
    ),
  };
  return icons[name];
};

const Svg = ({ classes, fill, height, name, title, width }: ISvg) =>
  <div className={classes}>
    {getIcon(fill, height, name, title, width)}
  </div>;

Svg.defaultProps = {
  width: "24px",
  height: "24px",
  fill: "#1C683E",
};

export default Svg;
