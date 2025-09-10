import { describe, it, expect } from "vitest";

import { cn } from "./cn";

describe("cn utility", () => {
  it("combines simple class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("skips falsy values", () => {
    expect(
      cn("a", false as unknown as boolean, undefined, "b", null, 0, "c"),
    ).toBe("a b c");
  });

  it("flattens nested arrays", () => {
    expect(cn("base", ["x", ["y", undefined, "z"]])).toBe("base x y z");
  });
});
