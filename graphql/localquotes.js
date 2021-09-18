const quotes = [
  {
    text: "You can't build a reputation on what you are going to do.",
    author: "Henry Ford",
  },
  {
    text: "Never complain and never explain.",
    author: "Benjamin Disreali",
  },
  {
    text: "If you're going through hell, keep going.",
    author: "Winston Churchill",
  },
  {
    text: "The key is to keep company only with people who uplift you, whose presence calls forth your best.",
    author: "Epictetus",
  },
  {
    text: "Only the educated are free.",
    author: "Epictetus",
  },
];

export const randomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
