import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import knex from "knex";

export const EXPIRATION_DATE = Math.floor(Date.now() / 1000) + 60 * 60;
export const ONE_HOUR = 60 * 60;
const saltRound = process.env.SALT_ROUND;

const connection =
  process.env.NODE_ENV === "development"
    ? {
        host: "127.0.0.1",
        port: 5432,
        user: "kimsong",
        password: "",
        database: "graphql-nextjs",
      }
    : {
        connectionString: process.env.PG_CONNECTION_STRING,
        ssl: {
          rejectUnauthorized: false,
        },
      };

export const posgres = new knex({
  client: "pg",
  version: "8.7.1",
  connection,
  debug: process.env.NODE_ENV === "development",
});

export const encryptPassword = async (password) => {
  const hashed = await bcrypt.hash(password, Number(saltRound));
  return hashed;
};

export const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const getNewInfo = async (input, original) => {
  // things to be update
  const toBeUpdated = {};
  // passwords need hashing
  let match, hashedPassword;
  if (input["password"]) {
    match = await comparePassword(input["password"], original["password"]);
    hashedPassword = await encryptPassword(input["password"]);
  }

  // get all keys from original data from database
  const originalKeys = Object.keys(original);

  // compare keys
  Object.keys(input).map((inp) => {
    if (originalKeys.includes(inp)) {
      // if there's password from input and isn't matching the old password
      if (inp === "password" && !match) {
        toBeUpdated[inp] = hashedPassword;
      }
      // if there's authors from input and it's not the same as the one in the database
      if (
        inp === "authors" &&
        JSON.stringify(input["authors"]) !== JSON.stringify(original["authors"])
      ) {
        toBeUpdated[inp] = input[inp];
      }
      // otherwise,
      if (
        inp !== "password" &&
        inp !== "authors" &&
        input[inp] !== original[inp]
      ) {
        toBeUpdated[inp] = input[inp];
      }
    }
  });
  return toBeUpdated;
};

export const newCookie = (user, res) => {
  // user includes password and profile image which wont be needed
  const signedUp = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  // generate a token
  const token = jwt.sign({ user: signedUp }, process.env.TOKEY, {
    expiresIn: "1h",
  });

  // set header
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: ONE_HOUR,
      secure: process.env.NODE_ENV === "production",
    })
  );
};
