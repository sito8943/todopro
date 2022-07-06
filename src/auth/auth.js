import { encode } from "js-base64";

export const user = { name: "docs", pass: "f6581b76058b1336f8089fd71ac" };
export const getAuth = {
  Authorization: `Basic ${encode(`${user.name}:${user.pass}`)}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
