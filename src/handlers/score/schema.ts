import { z } from "zod";

export type CalculateScoreDto = {
  superheroScore: number;
};

export const calculateScoreDtoSchema = z.object({
  superheroScore: z.number(),
}) satisfies z.Schema<CalculateScoreDto>;
