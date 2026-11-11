import { describe, expect, it } from "vitest";

import { shiftIndex, workSlideAxis } from "@/components/WorkCarousel";

describe("Work slide direction", () => {
  it("slides vertically only on mobile", () => {
    expect(workSlideAxis(393)).toBe("vertical");
    expect(workSlideAxis(767)).toBe("vertical");
    expect(workSlideAxis(768)).toBe("horizontal");
    expect(workSlideAxis(1280)).toBe("horizontal");
  });
});

// The Work slider loops: the arrows never open a folder, they keep sliding.
describe("Work slider looping", () => {
  const total = 4;

  it("returns to the first cover after the last one", () => {
    expect(shiftIndex(total - 1, 1, total)).toBe(0);
  });

  it("returns to the last cover before the first one", () => {
    expect(shiftIndex(0, -1, total)).toBe(total - 1);
  });

  it("moves one cover at a time in between", () => {
    expect(shiftIndex(1, 1, total)).toBe(2);
    expect(shiftIndex(2, -1, total)).toBe(1);
  });
});
