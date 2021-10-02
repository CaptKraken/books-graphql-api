export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
export const plural = (count) => {
  if (!count) return;
  return count > 1 ? "s" : "";
};
export const getInitial = (name) => {
  if (!name) return "";
  return name
    .split(" ", 2)
    .map((str) => str[0].toUpperCase())
    .join("");
};

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://books-graphql-api.vercel.app";

export const MAX_FETCH = 3;
export const MAX_FETCH_SEARCH = 12;

export const fetchFromAPI = async (query, variables) => {
  const res = await fetch(`/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        ...variables,
      },
    }),
  });

  const data = await res.json();
  return data.data;
};
