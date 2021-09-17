import Head from "next/head";

const HeadHTML = ({ title, description }) => {
  return (
    <Head>
      <title>{title} | Internal Books</title>
      <meta name="description" content={description} />
    </Head>
  );
};

HeadHTML.defaultProps = {
  title: "Internal Books",
  description:
    "This app is for internal use at the company. Books you find here can be borrowed.",
};

export default HeadHTML;
