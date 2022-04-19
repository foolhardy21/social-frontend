import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "mohit",
    lastName: "kumar",
    username: "coolmohit",
    password: "a1!",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "ranjan",
    lastName: "chauhan",
    username: "ranjanchauhan",
    password: "b1!",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "lex",
    lastName: "fridman",
    username: "lexfridman",
    password: "c1!",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
