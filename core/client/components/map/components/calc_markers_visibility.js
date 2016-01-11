

const K_SCALE_SMALL = 0.3;
const K_SCALE_MEDIUM = 0.45;
const K_BEFORE_AFTER_SCALES = [{l: 15, scale: K_SCALE_SMALL}, {l: 10, scale: K_SCALE_MEDIUM}];
const K_SCALES_SUM = K_BEFORE_AFTER_SCALES.reduce((sum, el) => el.l + sum, 0);


export function getScale(rowIndex, rowFrom, rowTo, K_SCALE_NORMAL) {
  if (rowIndex >= rowFrom && rowIndex <= rowTo) {
    return K_SCALE_NORMAL;
  }

  if (K_BEFORE_AFTER_SCALES.length) {
    if (rowIndex < rowFrom) {
      let deltaS = rowFrom;
      for (let index = K_BEFORE_AFTER_SCALES.length - 1; index >= 0; --index) {
        deltaS -= K_BEFORE_AFTER_SCALES[index].l;
        if (rowIndex >= deltaS) {
          return K_BEFORE_AFTER_SCALES[index].scale;
        }
      }

      // yes, the code can be here (dirty calculus)
      return K_BEFORE_AFTER_SCALES[0].scale;
    }

    if (rowIndex > rowTo) {
      let deltaS = rowTo;
      for (let index = K_BEFORE_AFTER_SCALES.length - 1; index >= 0; --index) {
        deltaS += K_BEFORE_AFTER_SCALES[index].l;
        if (rowIndex <= deltaS) {
          return K_BEFORE_AFTER_SCALES[index].scale;
        }
      }

      // yes, the code can be here (dirty calculus)
      return K_BEFORE_AFTER_SCALES[0].scale;
    }
  }
  return K_SCALE_NORMAL;
}

// this calculations is not precise (dirty)
function _getRealFromTo(rowFrom, rowTo, maxVisibleRows, totalSize) {
  let addFrom = ((rowFrom + maxVisibleRows + K_SCALES_SUM) > (totalSize - 1)) ? ((rowFrom + maxVisibleRows + K_SCALES_SUM) - (totalSize - 1)) : 0;

  const dadd = K_SCALES_SUM - rowFrom;
  let addTo = dadd >= 0 ? dadd : 0;

  return {
    rowFrom: Math.max(0, rowFrom - K_SCALES_SUM - addFrom),
    rowTo: Math.min(totalSize - 1, rowFrom + maxVisibleRows + K_SCALES_SUM + addTo)
  };
}

export function getRealFromTo(rowFrom, rowTo, maxVisibleRows, totalSize) {
  const current = _getRealFromTo(rowFrom, rowTo, maxVisibleRows, totalSize);

  const result = {
    rowFrom: current.rowFrom,
    rowTo: current.rowTo
  };

  return result;
}
