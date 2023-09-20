import { expect, test, describe } from "vitest";
import {
  genderWeighting,
  getInvisibilityScore,
  getUserScore,
} from "./score.js";

const { male: maleWeighting, female: femaleWeighting } = genderWeighting;
const minAge = 0;
const maxAge = 100;

describe("getInvisibilityScore", () => {
  test("normalizes the score based on weighting", () => {
    const minMaleScore = getInvisibilityScore({
      genderWeighting: maleWeighting,
      age: maxAge,
      superHeroScore: 0,
    });
    const maxMaleScore = getInvisibilityScore({
      genderWeighting: maleWeighting,
      age: minAge,
      superHeroScore: 100,
    });
    const minFemaleScore = getInvisibilityScore({
      genderWeighting: femaleWeighting,
      age: maxAge,
      superHeroScore: 0,
    });
    const maxFemaleScore = getInvisibilityScore({
      genderWeighting: femaleWeighting,
      age: minAge,
      superHeroScore: 100,
    });
    expect(minMaleScore.toString()).toBe("18.75");
    expect(maxMaleScore.toString()).toBe("81.25");
    expect(minFemaleScore.toString()).toBe("0");
    expect(maxFemaleScore.toString()).toBe("100");
  });
});

describe("getUserScore", () => {
  test("return the invisbility status, score and super hero score ", () => {
    const minMaleScore = getUserScore(0, {
      dob: {
        age: maxAge,
      },
      gender: "male",
      login: {
        uuid: "someId",
      },
    });
    const maxMaleScore = getUserScore(100, {
      dob: {
        age: minAge,
      },
      gender: "male",
      login: {
        uuid: "someId",
      },
    });

    const minFemaleScore = getUserScore(0, {
      dob: {
        age: maxAge,
      },
      gender: "female",
      login: {
        uuid: "someId",
      },
    });
    const maxFemaleScore = getUserScore(100, {
      dob: {
        age: minAge,
      },
      gender: "female",
      login: {
        uuid: "someId",
      },
    });

    expect(minMaleScore).toEqual({
      invisibilityScore: "18.75",
      invisibilityStatus: "Not invisible",
      superHeroScore: "0",
    });
    expect(maxMaleScore).toEqual({
      invisibilityScore: "81.25",
      invisibilityStatus: "Invisible",
      superHeroScore: "100",
    });
    expect(minFemaleScore).toEqual({
      invisibilityScore: "0",
      invisibilityStatus: "Not invisible",
      superHeroScore: "0",
    });
    expect(maxFemaleScore).toEqual({
      invisibilityScore: "100",
      invisibilityStatus: "Invisible",
      superHeroScore: "100",
    });
  });
});
