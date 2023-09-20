import { APIGatewayProxyEvent } from "aws-lambda";
import { ZodSchema } from "zod";
import { promises } from "fs";

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

export const parseApiEvent = <T>(
  event: APIGatewayProxyEvent,
  schema: ZodSchema<T>
): T => {
  if (event.body === null) {
    throw new Error("null api event body");
  }

  const parsed = schema.safeParse(JSON.parse(event.body));

  if (!parsed.success) {
    throw new Error(`Invalid api event body ${JSON.stringify(parsed.error)}`);
  }
  return parsed.data;
};

export const objToCSV = (arr: Record<string, string>[]) => {
  const headers = Object.keys(arr[0]);
  const content = arr.map((item) => {
    return headers.map((key) => item[key]).join(",");
  });
  return [headers.join(","), ...content].map((s) => s).join("\n");
};

export const createCsv = async (path: string, content: string) => {
  try {
    await promises.writeFile(path, content);
  } catch (err) {
    throw new Error(`Failed to create csv ${getErrorMessage(err)}`);
  }
};
