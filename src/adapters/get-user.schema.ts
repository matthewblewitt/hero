import { z } from "zod";

export type UserGender = "male" | "female";

export type User = {
  gender: UserGender;
  dob: { age: number };
  login: { uuid: string };
};

export type UserDto = {
  results: User[];
};

export const userDtoSchema = z.object({
  results: z.array(
    z.object({
      gender: z.union([z.literal("male"), z.literal("female")]),
      dob: z.object({ age: z.number() }),
      login: z.object({
        uuid: z.string().uuid(),
      }),
    }),
  ),
}) satisfies z.Schema<UserDto>;
