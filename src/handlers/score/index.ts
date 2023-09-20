import { APIGatewayProxyHandler } from "aws-lambda";
import {
  createCsv,
  getErrorMessage,
  objToCSV,
  parseApiEvent,
} from "../../utils.js";
import { calculateScoreDtoSchema } from "./schema.js";
import { getUser as defaultGetUser } from "../../adapters/get-user.js";
import { getUserScore } from "../../services/score.js";

const score =
  (getUser = defaultGetUser): APIGatewayProxyHandler =>
  async (event) => {
    try {
      const user = await getUser();

      const score = parseApiEvent(event, calculateScoreDtoSchema);

      const result = getUserScore(score.superheroScore, user);

      createCsv("./score.csv", objToCSV([result]));

      return {
        statusCode: 200,
        body: JSON.stringify({
          result,
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: getErrorMessage(error),
      };
    }
  };

export const handler: APIGatewayProxyHandler = score();
