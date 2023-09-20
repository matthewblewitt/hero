import { describe, expect, test } from "vitest";
import { objToCSV } from "./utils.js";

describe("objToCSV", () => {
  test("converts object array to a csv and maintains key order", () => {
    const result = objToCSV([
      { key1: "1", key2: "2", key3: "3" },
      { key2: "2", key3: "3", key1: "1" },
    ]);
    expect(result).toBe("key1,key2,key3\n1,2,3\n1,2,3");
  });
});
