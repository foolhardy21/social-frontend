import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import user1 from './assets/user1.jpg'
import user2 from './assets/user2.jpg'
import user3 from './assets/user3.jpg'
import user4 from './assets/user4.jpg'
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
    profileImg: user1,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "ranjan",
    lastName: "chauhan",
    username: "ranjanchauhan",
    password: "b1!",
    profileImg: user2,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "lex",
    lastName: "fridman",
    username: "lexfridman",
    password: "c1!",
    profileImg: user3,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "vijay",
    lastName: "kumar",
    username: "vijaykumar",
    password: "d1!",
    profileImg: user4,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
