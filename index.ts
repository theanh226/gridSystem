interface viewPort {
  minWidth: number;
  maxWidth: number;
  columnsPerArea: Array<number>;
}

interface configForGridSystem {
  width: number;
  maxWidth: number;
  totalColumns: number;
  defaultColumnsPerArea: Array<number>;
  largeViewportColumnsPerArea: Array<number>;
  viewPorts: Array<viewPort>;
}

const buildGridSystem = (
  width: number = 100,
  totalColumns: number,
  columnsPerArea: Array<number>
): string => {
  let gridSystem = "";
  // check if total columns and column per area are not exist
  if (!totalColumns || !columnsPerArea) {
    console.error("Please provide total columns or columns per area");
    return "";
  }
  // check if columns per area equal to total columns
  if (columnsPerArea.reduce((acc, curr) => acc + curr, 0) !== totalColumns) {
    console.warn("Columns per area should be equal to total columns");
    return "";
  }
  columnsPerArea.forEach((element) => {
    gridSystem = gridSystem.concat(
      `calc(${width}vw/${totalColumns} * ${element}) `
    );
  });
  return gridSystem;
};

export const getGridSystem = (
  screenWidth: number, // window.innerWidth
  config: configForGridSystem
): any => {
  const {
    width,
    maxWidth,
    largeViewportColumnsPerArea,
    defaultColumnsPerArea,
    totalColumns,
    viewPorts,
  } = config;
  let viewPortInRange;
  // check viewport in range
  viewPorts.forEach((viewPort) => {
    if (screenWidth >= viewPort.minWidth && screenWidth < viewPort.maxWidth) {
      viewPortInRange = true;
    }
  });
  if (screenWidth > maxWidth) {
    console.log("large viewport");
    return buildGridSystem(maxWidth, totalColumns, largeViewportColumnsPerArea);
  } else if (viewPortInRange) {
    console.log("viewPortInRange");
    viewPorts.forEach((viewPort) => {
      if (screenWidth >= viewPort.minWidth && screenWidth < viewPort.maxWidth) {
        return buildGridSystem(width, totalColumns, viewPort.columnsPerArea);
      }
    });
  } else {
    console.log("default");
    return buildGridSystem(width, totalColumns, defaultColumnsPerArea);
  }
};
