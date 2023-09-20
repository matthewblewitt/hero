import fetch from "node-fetch";
import { getErrorMessage } from "../utils.js";
import { User, userDtoSchema } from "./get-user.schema.js";

export type GetUser = () => Promise<User>;

export const getUser: GetUser = async () => {
  try {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    const parsed = userDtoSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(JSON.stringify(parsed.error));
    }
    const {
      results: [user],
    } = parsed.data;
    return user;
  } catch (error) {
    throw new Error(`Error fetching user ${getErrorMessage(error)}`);
  }
};
