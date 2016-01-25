import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

export default function RouteTransition({children, pathname}) {

  const farLeft = -100
  const farRight = 100

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
      return isNum ? spring(farRight) : spring(farLeft)
    }
    else if (action === "leave") {
      return isNum ? spring(farLeft) : spring(farRight)
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
                position: 'absolute',
                width: '100%',
                opacity: interpolated[key].opacity,
                transform: `translate(${interpolated[key].translate}%)`
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
