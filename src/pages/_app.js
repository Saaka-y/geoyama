import "@/styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
