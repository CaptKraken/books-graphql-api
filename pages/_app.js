import "tailwindcss/tailwind.css";
import LayoutWrapper from "@/components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
}

export default MyApp;
