export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://books-graphql-api.vercel.app";
