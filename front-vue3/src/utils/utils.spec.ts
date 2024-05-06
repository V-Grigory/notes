import { describe, it, expect } from "vitest";

import Utils from "./utils";

describe(">>> Utils", () => {
  it(">> test 1", () => {
    const params: any[] = [];
    const rand = new Utils().getRandomValueFrom(params);
    expect(rand).toBeNull();
  });

  it(">> test 2", () => {
    const params: any[] = ["aa"];
    const rand = new Utils().getRandomValueFrom(params);
    expect(params).toContain(rand);
  });

  it(">> test 3", () => {
    const params: any[] = ["aa", "bb"];
    const rand = new Utils().getRandomValueFrom(params);
    expect(params).toContain(rand);
  });

  it(">> test 4", () => {
    const params: any[] = ["aa", "bb", 22, "cc", 55];
    const rand = new Utils().getRandomValueFrom(params);
    expect(params).toContain(rand);
  });
});
