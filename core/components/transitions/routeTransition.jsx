import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';

export default function RouteTransition({children, pathname}) {

  const farLeft = -50
  const farRight = 50

  const lastPart = () => {
    const pathParts = pathname.split("/");
    return pathParts[pathParts.length - 1];
  }

  // const noAnimate = () => {
  //   const noAnimate = ["", "series", "articles", "devotions", "stories", "music", "profile"]
  //   return noAnimate.indexOf(lastPart())
  // }

  const getDirection = (action, pathname) => {

    const isNum = Number(lastPart()) > 0;

    if (action === "enter") {
      return isNum ? spring(farRight, presets.stiff) : spring(farLeft, presets.stiff)
    }
    else if (action === "leave") {
      return isNum ? spring(farLeft, presets.stiff) : spring(farRight, presets.stiff)
    }
  }

  const willEnter = children => ({children, opacity: spring(0), translate: getDirection("enter", pathname)})
  const willLeave = (key, {children}) => ({children, opacity: spring(0), translate: getDirection("leave", pathname)})
  const getStyles = (children, pathname) => ({[pathname]: {children, opacity: spring(1), translate: spring(0)}})

  return (
    <TransitionMotion
      styles={getStyles(children, pathname)}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {interpolated =>
        <div>
          {Object.keys(interpolated).map(key =>
            <div
              key={`${key}-transition`}
              style={{
                "-webkit-backface-visibility": "hidden",
                "-webkit-perspective": 1000,
                position: "absolute",
                width: "100%",
                minHeight: "100%",
                paddingBottom: "60px",
                opacity: interpolated[key].opacity,
                transform: `translate3d(${interpolated[key].translate}%, 0, 0)`
              }}
            >
              {interpolated[key].children}
            </div>
          )}
        </div>
      }
    </TransitionMotion>
  );
}
