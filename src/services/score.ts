import Big from "big.js";
import { User, UserGender } from "../adapters/get-user.schema.js";

type StrNum = string;

type InvisibilityStatus =
  | "Not invisible"
  | "Camouflage"
  | "Translucent"
  | "Transparent"
  | "Invisible";

type UserScore = {
  userId: string;
  invisibilityScore: StrNum;
  invisibilityStatus: InvisibilityStatus;
  superHeroScore: StrNum;
};

export const genderWeighting = {
  male: 5,
  female: 8,
} satisfies Record<UserGender, number>;

const invisibilityStatus = new Map<InvisibilityStatus, number>([
  ["Invisible", 100],
  ["Transparent", 80],
  ["Translucent", 60],
  ["Camouflage", 40],
  ["Not invisible", 20],
]);

const normalizeValue = (value: Big, minRange: Big, maxRange: Big) => {
  return value.minus(minRange).div(maxRange.minus(minRange)).times(100);
};

export const getInvisibilityScore = ({
  superHeroScore,
  age,
  genderWeighting,
}: {
  superHeroScore: number;
  genderWeighting: number;
  age: number;
}) => {
  const minScore = -800;
  const maxScore = 800;
  const score = Big(genderWeighting).times(Big(superHeroScore).minus(age));
  return normalizeValue(score, Big(minScore), Big(maxScore));
};

const getInvisibilityStatus = (invisibilityScore: Big): InvisibilityStatus => {
  return Array.from(invisibilityStatus).reduce<InvisibilityStatus>(
    (acc, [status, maxRange]) => {
      return invisibilityScore.lte(maxRange) ? status : acc;
    },
    "Not invisible",
  );
};

export const getUserScore = (superHeroScore: number, user: User): UserScore => {
  const invisibilityScore = getInvisibilityScore({
    age: user.dob.age,
    genderWeighting: genderWeighting[user.gender],
    superHeroScore,
  });

  const invisibilityStatus = getInvisibilityStatus(invisibilityScore);

  return {
    userId: user.login.uuid,
    invisibilityScore: invisibilityScore.toString(),
    invisibilityStatus,
    superHeroScore: superHeroScore.toString(),
  };
};
