import "@/styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <ErrorBoundary>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ErrorBoundary>
    );
}
