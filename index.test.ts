import { getGridSystem } from "./index";

const configForGridSystemCustom = {
  width: "100vw",
  maxWidth: "1366px",
  totalColumns: 60,
  defaultColumnsPerArea: [5, 23, 4, 23, 5],
  largeViewportColumnsPerArea: [1, 1, 1, 1, 1],
  viewPorts: [
    {
      minWidth: 786,
      maxWidth: 991,
      columnsPerArea: [2, 2, 2, 2, 2],
    },
    {
      minWidth: 992,
      maxWidth: 1024,
      columnsPerArea: [3, 3, 3, 3, 3],
    },
    {
      minWidth: 992,
      maxWidth: 0,
      columnsPerArea: [3, 2, 3, 3, 3],
    },
  ],
};

// Test for custom grid system
const expectedValue = {
  largeViewportColumnsPerArea: `calc(1366px/60 * 1) calc(1366px/60 * 1) calc(1366px/60 * 1) calc(1366px/60 * 1) calc(1366px/60 * 1) `,
  defaultColumnsPerArea: `calc(100vw/60 * 5) calc(100vw/60 * 23) calc(100vw/60 * 4) calc(100vw/60 * 23) calc(100vw/60 * 5) `,
  ipadColumnsPerArea: `calc(100vw/60 * 2) calc(100vw/60 * 2) calc(100vw/60 * 2) calc(100vw/60 * 2) calc(100vw/60 * 2) `,
  smallDesktopColumnsPerArea: `calc(100vw/60 * 3) calc(100vw/60 * 3) calc(100vw/60 * 3) calc(100vw/60 * 3) calc(100vw/60 * 3) `,
};

describe("getGridSystem", () => {
  test("returns defaultColumnsPerArea when the viewports do not exceed max width or within responsive", () => {
    expect(getGridSystem(1192, configForGridSystemCustom)).toEqual(
      expectedValue.defaultColumnsPerArea
    );
  });

  test("returns largeViewportColumnsPerArea when screenWidth > maxWidth", () => {
    expect(getGridSystem(1367, configForGridSystemCustom)).toEqual(
      expectedValue.largeViewportColumnsPerArea
    );
  });

  test("returns ipadColumnsPerArea when viewport in range 786 and 991", () => {
    expect(getGridSystem(888, configForGridSystemCustom)).toEqual(
      expectedValue.ipadColumnsPerArea
    );
  });

  test("returns smallDesktopColumnsPerArea when viewport in range 992 and 1024", () => {
    expect(getGridSystem(1023, configForGridSystemCustom)).toEqual(
      expectedValue.smallDesktopColumnsPerArea
    );
  });
});
