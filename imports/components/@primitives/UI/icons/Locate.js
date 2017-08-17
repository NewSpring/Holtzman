type ILocate = {
  width: string,
  height: string,
  fill: string
};

const Locate = ({ width, height, fill }: ILocate) =>
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>icon/new/locate</title>
    <defs>
      <path
        d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
        id="a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <use fill="#444" fillRule="nonzero" xlinkHref="#a" />
      <path d="M0 0h24v24H0z" mask="url(#b)" fill={fill} />
    </g>
  </svg>;

Locate.defaultProps = {
  width: "24px",
  height: "24px",
  fill: "#1C683E",
};

export default Locate;
