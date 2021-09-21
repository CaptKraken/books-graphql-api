import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const initQuote = {
  text: "If you're going through hell, keep going.",
  author: "Winston Churchill",
};

const QuoteSkeleton = () => {
  return (
    <div className="bg-gray-800 text-gray-200 rounded-md py-4  px-4 xs:px-8 sm:px-10 md:px-12">
      <div className="animate-pulse max-w-2xl mx-auto flex flex-col gap-3">
        <div>
          <h3 className="text-base sm:text-xl lg:text-2xl bg-white rounded-md mb-2">
            &nbsp;
          </h3>
          <h3 className="text-base sm:text-xl lg:text-2xl bg-white rounded-md self-start w-3/4 md:w-3/5">
            &nbsp;
          </h3>
        </div>
        <div className="text-xs lg:text-xl font-bold self-end bg-white rounded-md w-24">
          &nbsp;
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [quote, setQuote] = useState(initQuote);
  const GET_QUOTE = gql`
    query Query {
      quote: getRandomQuote {
        text
        author
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_QUOTE);

  useEffect(() => {
    if (data) setQuote(data?.quote);
  }, [data]);
  // if (data) console.log(data);
  if (loading) return <QuoteSkeleton />;
  // if (error) return <p>error</p>;
  return (
    <div className="bg-gray-800 text-gray-200 rounded-md py-4 px-4 xs:px-8 sm:px-10 md:px-12 flex flex-col">
      <div className="max-w-2xl mx-auto flex flex-col">
        <h3 className="text-base sm:text-xl lg:text-2xl">{quote?.text}</h3>
        <span className="text-xs lg:text-base font-bold self-end">
          ~ {quote?.author}
        </span>
      </div>
    </div>
  );
};

export default Hero;
